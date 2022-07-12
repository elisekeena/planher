import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import Footer from './footer';

export default function HomePage() {
  const [quotes, setMyQuotes] = useState([]);

  useEffect(() => {
    fetch("/get_quote/")
      .then(res => res.json())
      .then(data => {
         setMyQuotes(data[0]);
      })
  }, []);
  
  return (<>
    <main style={{ padding: "1rem 0" }}>
      <div id="home" className='bodylanding'>
        <h1> Hello this is quote of the day:</h1>
        <br/>
        <h2>{quotes.q}</h2>
          <h5>{quotes.a}</h5>
          <img src={"https://i.pinimg.com/originals/fb/bf/bf/fbbfbfc3742a689333b79428a954aad3.gif"} />
          </div>
    </main>
    </>
    
  );

  return (<>
    <div className="grow"> </div>
      <div>
      <Footer/> 
    </div>
    </>
  )
}
