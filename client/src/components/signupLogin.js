import { useNavigate } from "react-router-dom";

export default function SignupLogin() {
  let navigate = useNavigate();

  return (
    <main style={{ padding: "1rem 0" }}>
      {/* <h2>Signup/Login</h2> */}
      <h3>New to Dinder? Make an account!</h3>

      <div className='buttons'>
      <button style={{ backgroundColor: '#c3c4d3' }} onClick={() => {
          navigate("/signup");
        }}>Sign Up</button>
      </div>



      <h3>Already signed up?</h3>

      <div className='buttons'>
      <button style={{ backgroundColor: '#c3c4d3' }} onClick={() => {
          navigate("/login");
        }}>Log In</button>
      </div>


      {/* <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button> */}
    </main>
  );
}
