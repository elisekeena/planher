import React, { useState, useEffect} from 'react';
import { useOutletContext } from "react-router-dom";



export default function QuoteOfTheDayPage () {
    const [quotes, setMyQuotes] = useState([]);
    const [user, setUser] = useOutletContext();

    useEffect(() => {
        fetch("/get_quote/")
        .then(res => res.json())
        .then(data => {
            setMyQuotes(data[0]);
        })
      }, []);
    

      return (
        <div>
        <div> Hello this is quote of the day page</div>
    <h1>{quotes.q}</h1>
    <h2>{quotes.a}</h2>
        </div>
    
    
      )
    



}