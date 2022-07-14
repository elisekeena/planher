import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const inputStyles = {
  padding: "6px",
  border: "2px solid #309397",
  boxShadow: "0px 0px 0px",
  color: "#309397",
  font_size: "10px",
  background_color: "#309397",
  outline: "10px",
  borderRadius: "5px",
  width: "85%",
  margin: "0px auto",
};

export default function LoginPage() {
  let navigate = useNavigate();
  
  const [user, setUser] = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      // console.log("navigating to homepage")
      navigate("/");
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          
        });
      } else {
        res.json().then((json) => {
          // setUser(null);
          setError(json.error);
          console.log("error: ", json.error)
        });
      }
    });

    // .then((r) => r.json())
    // .then((user) => {
    //   // onLogin(user)
    //   user ? console.log("user truthy") : console.log("user falsy");
    //   console.log("user:", user);
    //   setUser(user);
    // });
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      {/* <header className="headerLoginStyle"> planher
          </header> */}
    

      
      <div className="loginPage">
      <form id="form-login" onSubmit={handleSubmit}>
        {/* <h2>Planher</h2> */}
      <h3>Welcome to Planher!</h3>

    

    <label htmlFor="username">Username:</label>
        <input 
          style ={inputStyles}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
  
        <label htmlFor="password">Password:</label>
        <input
          style ={inputStyles}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className= "loginbutton">Log In</button>
        {error ? <p>Error: {error}</p> : null }
        <button className= "loginbutton"  onClick={() => {
          navigate("/signup");
        }}>Sign Up</button>
      </form>
    </div>
    </main>
  );
}
