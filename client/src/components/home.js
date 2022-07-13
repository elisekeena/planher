import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { useOutletContext } from "react-router-dom";
import { formatDate } from '@fullcalendar/react'

export default function HomePage() {
  const [quotes, setMyQuotes] = useState([]);
  const [user, setUser] = useOutletContext();
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetch("/get_quote/")
      .then(res => res.json())
      .then(data => {
         setMyQuotes(data[0]);
      })
      if (user !== null){
        fetch("my_events/"+user.id)
          .then(res => res.json())
          .then(data => {
            setEvents(data)      
          })
      }
  }, []);

  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }


  return (<div className="wrapper">
  <div className="box sidebar">
    {user !== null ? <div style={{ fontSize: "60%"}}>
      <h2>
      <a href={`/MyEvents/${user.id}`}> All Events ({events.length}) </a> </h2>
      <ul>
        {events.map(renderSidebarEvent)}
      </ul>
    </div> : 
    <div>No event </div> }
    
    </div>
  <div className="box content"> Hello, {user !== null ? user.first_name : "There"}
    <main style={{ padding: "1rem 0" }}>
      
       <div id="home" className='bodybackground'>
         <h1> {new Date().toLocaleString() + ""}</h1>
         <br/>
         <h2>{quotes.q}</h2>
           <h5>{quotes.a}</h5>
           {/* <img src={"https://i.pinimg.com/originals/cb/83/ea/cb83ea01181d031162d777be8d8f780f.gif"} /> */}
           </div>
     </main>
    {/* <br /> The four arrows are inline images inside the content area.
    <img src="http://gridbyexample.com/examples/code/arrow-top-left.png" alt="top left" class="topleft" />
    <img src="http://gridbyexample.com/examples/code/arrow-top-right.png" alt="top right" class="topright" />
    <img src="http://gridbyexample.com/examples/code/arrow-bottom-left.png" alt="bottom left" class="bottomleft" />
    <img src="http://gridbyexample.com/examples/code/arrow-bottom-right.png" alt="bottom right" class="bottomright" /></div> */}
  
</div>
<div className="box footer">© 2022 planher</div>
</div>
  )
}
