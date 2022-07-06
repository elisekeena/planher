// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";

import { useState, useEffect } from "react";
// import MealCards from './components/mealCards';

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
        <Home />
      </div>
    );
  } else {
    return <p>hello</p>; //maybe want to change this so header and background will at least load in the meantime
  }
}
export default App;

