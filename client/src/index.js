import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
// import UserProfile from "./components/userProfile";
// import About from "./components/about";
import SignupPage from "./components/signupPage";
import LoginPage from "./components/loginPage";
import HomePage from "./components/home";
import ToDoListPage from "./components/toDoListPage"
import MyEventPage from "./components/myEventPage"
import MyExpensePage from "./components/myExpensePage"
import QuoteOfTheDayPage from "./components/quoteOfTheDayPage"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="user-profile" element={<UserProfile />} /> */}
          {/* <Route path="about" element={<About />} /> */}
          <Route path="toDoList" element={<ToDoListPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="myEvents/:id" element={<MyEventPage />} />
          <Route path="myExpenses" element={<MyExpensePage />} />
          <Route path="quoteOfTheDay" element={<QuoteOfTheDayPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();