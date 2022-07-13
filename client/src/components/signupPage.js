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

export default function SignupPage() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (user) {
      // console.log("navigating to homepage")
      navigate("/");
    }
  }, [user]);

  function handleFormInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      }),
    }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setUser(user);
          });
        } else {
          res.json().then((json) => {
            // setUser(null);
            // console.log("json: ", json)
            setErrors(json.errors);
            console.log("errors: ", json.errors)
          });
        }
      }
      );
  }

  return (
    <main className="loginPage" style={{ padding: "1rem 0" }}>
      <form onSubmit={handleSubmit}>
      <h2> Get Productive, Sign Up!</h2>
        <label className ="signupform" htmlFor="firstName"></label>
        <input  style ={inputStyles}
          type="text"
          id="firstName"
          name="firstName"
          placeholder=" First Name"
          value={formData.firstName}
          onChange={(e) => handleFormInput(e)}
        />
        <label htmlFor="lastName"></label>
        <input  style ={inputStyles}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleFormInput(e)}
        />
        <label htmlFor="username"></label>
        <input  style ={inputStyles}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleFormInput(e)}
        />
        <label htmlFor="password"></label>
        <input  style ={inputStyles}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={(e) => handleFormInput(e)}
        />
        {/* <label htmlFor="passwordConfirmation"></label>
        <input  style ={inputStyles}
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={formData.passwordConfirmation}
          onChange={(e) => handleFormInput(e)}
        /> */}
        <button  type="submit" className= "loginbutton" >Submit</button>
        {errors ? <p>Error: {errors}</p> : null }
        <button className= "loginbutton"  onClick={() => {
          navigate("/login");
        }}>Log In</button>
      </form>
    </main>
  );
}

