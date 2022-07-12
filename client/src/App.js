import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";

import { useState, useEffect } from "react";
import LandingPage from "./components/landingPage";

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionCheckComplete, setSessionCheckComplete] = useState(false);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          setSessionCheckComplete(true);
        });
      } else {
        setSessionCheckComplete(true);
      }
    });
  }, []);

  function onLogout() {
    setUser(null);
    navigate("/");
  }

  if (sessionCheckComplete) {
    return (
      <div className="App">
        <Header onLogout={onLogout} user={user} />
        <Outlet context={[user, setUser]} />
      </div>
    );
  } else {
    return <p>hello</p>; //maybe want to change this so header and background will at least load in the meantime
  }
}
export default App;

