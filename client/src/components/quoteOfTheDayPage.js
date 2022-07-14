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

}