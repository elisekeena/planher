import React, { useState, useEffect} from 'react';
import { useOutletContext,  useSearchParams } from "react-router-dom";

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from 'react-router-dom';


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// "YYYY-MM-DDT14:00:00" of time    
// "YYYY-MM-DDT14:30:00" of time


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]
export function createEventId() {
  return String(eventGuid++)
}


export default class MyEventPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      popUp: false, 
      deletePopUp: false,
      deleteInfo: null,
      popUpAnswer: "",
      weekendsVisible: true,
      currentEvents: [],
      events: [],
      selectedInfo: null
    };
  }

  // componentDidMount() {
  //       fetch("my_events/"+1)
  //           .then(res => res.json())
  //           .then(data => {
  //               this.setState({ events: data })      
  //           })
  //   }

    render() {
      // console.log(this.props.match.params)
      return (
        <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main'>
          {this.state.popUp === true ? this.renderPopUp() : null}
          {this.state.deletePopUp === true ? this.renderDeletePopUp() : null}
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              themeSystem= 'bootstrap5'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={this.state.weekendsVisible}
              events= {'/my_events/'}
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire: *
              eventAdd={addEventAPI()}
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
          </div>
        </div>
      )
    }
  
    renderSidebar() {
      return (
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <br></br>
            <br></br>
            <br></br>
            <h2>Instructions</h2>
            <h1>{this.state.events.map(({ ad,end,id,start,title,uid }) => (
                <p key={id}> {title}</p>
                ))}
              </h1>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
              ></input>
              toggle weekends
            </label>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>All Events ({this.state.currentEvents.length})</h2>
            <ul>
              {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        </div>
      )
    }
  
    handleWeekendsToggle = () => {
      this.setState({
        weekendsVisible: !this.state.weekendsVisible
      })
    }

    renderPopUp() {
      return (
        <div className="review-modal" >Please enter a new title for your event
        <br></br>
          <input
            onChange={event => this.setState({ popUpAnswer: event.target.value })}
          />
          <br></br>
          <button className="popUpButtonYes" onClick={this.handleAddEvent} >
            Submit
          </button>
          <br></br>
          <button className="popUpButtonNo" onClick={event => this.setState({ popUp: false })} >
            Cancel
          </button>
        </div>
      )
    }

    handleDelete = (clickInfo) => {
      this.handleDeleteEvents(clickInfo.id)
      clickInfo.remove()
      this.setState({ deletePopUp: false })
    }

    renderDeletePopUp() {
      let deleteInfo = this.state.deleteInfo
      return (
        <div className="review-modal" >Are you sure you want to delete the event {deleteInfo.title} ?
        <br></br>
          <button className="popUpButtonYes" onClick={event => this.handleDelete(deleteInfo)} >
            YES
          </button>
          <br></br>
          <button className="popUpButtonNo" onClick={event => this.setState({ deletePopUp: false })} >
            NO
          </button>
        </div>
      )
    }

    handleAddEvent = () => {
      let title = this.state.popUpAnswer

      let selectInfo = this.state.selectedInfo
      let calendarApi = selectInfo.view.calendar
      let newId= createEventId()
      calendarApi.unselect() // clear date selection
      calendarApi.addEvent({
        id: newId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
      this.addEventAPI(newId, title,selectInfo.startStr,selectInfo.endStr, selectInfo.allDay )
      this.setState({ popUp: false })
    }

    handleDateSelect = (selectInfo) => {
      this.setState({ popUp: true })
      this.setState({ selectedInfo: selectInfo })
    }
  
    handleEventClick = (clickInfo) => {
      this.setState({ deleteInfo: clickInfo.event })
      this.setState({ deletePopUp: true })
    }
    
    handleDeleteEvents = (eventId) => {
      fetch("/delete_event", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: 1,
            my_event_id: eventId
        }),
      })
  }

    handleEvents = (events) => {
      this.setState({
        currentEvents: events
      })
    }

    addEventAPI = (newId, title,startStr,endStr, allDay) => {
      fetch("/user_my_events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              user_id: 1,
              title: title,
              start: startStr,
              end: endStr,
              all_day: allDay
          }),
        }).then((res) => {
            if (res.ok) {
              res.json().then((task) => {
                console.log(task)
              });
            } else {
              res.json().then((json) => {
                console.log("errors: ", json.errors)
              });
            }
          }
          );
    }
  }
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  
  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }
