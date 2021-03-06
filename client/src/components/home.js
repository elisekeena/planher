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


  return (<div className="wrapper" >
  <div className="box sidebar">
    {user !== null ? <div style={{ fontSize: "60%"}}>
      <h2>
      <a className="bm-item-list" style={{textDecoration: 'none'}} href={`/MyEvents/${user.id}`}> All Events ({events.length}) </a> </h2>
      <ul>
        {events.map(renderSidebarEvent)}
      </ul>
    </div> : 
    <div>No event </div> }
    
    </div>
  <div className="box header"> Hello, {user !== null ? user.first_name : "There"}
  <br></br>
  <h2>Let's get planning</h2>
    <main style={{ padding: "1rem 0" }}>
       <div style={{display:"flex",justifyContent:"center"}} id="home" className='bodybackground'>
         <h1> {new Date().toLocaleString() + ""}</h1>
         <br/>
         <div style={{ paddingLeft: "80px"}}>
         <h2>{quotes.q}</h2>
         <div style={{flexDirection:"column",justifyContent:"center"}}> <h5>{quotes.a}</h5> </div>
         </div>
           {/* <img src={"https://i.pinimg.com/originals/cb/83/ea/cb83ea01181d031162d777be8d8f780f.gif"} /> */}
      </div>
      
     </main>
  
</div>
<div className="box footer">© 2022 planher</div>
</div>

  )
}
