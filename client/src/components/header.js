import { NavLink, Link } from "react-router-dom";
import { bubble as Menu } from 'react-burger-menu'
import { FaHome } from 'react-icons/fa';
import { BiHomeHeart } from 'react-icons/bi';
import { VscChecklist } from 'react-icons/vsc';
import { BiCalendarHeart } from 'react-icons/bi';

export default function Header({ onLogout, user }) {

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }
  function showSettings(event) {
    event.preventDefault();

  }
  return (
    <div>
      
      <header
        // style={{
        //   borderBottom: "solid 1px",
        //   paddingBottom: "1rem",
        // }}
      >
        {/* <Link style={{textDecoration: 'none'}} to="/">
          <h1 className="testheader"> planher
          </h1>
        </Link>
        <h3 className="tagline"> Get productive!
        </h3> */}
        
        <Menu style={{textDecoration: 'none'}} >
        <a  style={{textDecoration: 'none'}}  id="home" className="bm-item-list" href="/">
            <h1>< BiHomeHeart />    <span>Home</span></h1>
        </a>

        <a id="about" className="menu-item" href="/about">About</a>
        
        {/* <a onClick={ showSettings } className="menu-item--small" href="">Settings</a> */}
        {user ?<>
        <a style={{textDecoration: 'none'}}  id="todolist" className="bm-item-list" href="/toDoList">
          <h1>< VscChecklist />    <span>To Do List</span></h1>
        </a>
        <br></br>
        <a style={{textDecoration: 'none'}} id="myevents" className="bm-item-list" href={`/MyEvents?userId=${user.id}`}>
        <h1>< BiCalendarHeart />   <span>My Events</span></h1>
        </a>
        <br></br>
        <a style={{textDecoration: 'none'}} id="myExpenses" className="bm-item-list" href={`/myExpenses`}>
        <h1>< BiCalendarHeart />   <span>My Expense</span></h1>
        </a>
        <br></br>

        <a id="logout" className="menu-item" href="/login" onClick={handleLogout}>Logout</a>
        {" "}</> :
         <a id="login" className="menu-item" href="/login">Login</a>}
      </Menu>

      </header>
    </div>
  );
}
