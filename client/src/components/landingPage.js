import HomePage from "./home";
import SignupLogin from "./signupLogin";
// import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


export default function LandingPage(user) {
  // const [user, setUser] = useOutletContext();

  return (
    // <main style={{ padding: "1rem 0" }}>
      <main className="headerStyle">
        <div style={{ 
      // backgroundImage: `url("https://www.designerblogs.com/wp-content/uploads/2020/09/planner-page-header-background.jpg")`,
      bacgroundImage: 'url("https://i.pinimg.com/736x/bc/3e/e0/bc3ee0873d8a0eefda0c0135adf51004.jpg")',
      textAlign: "center",
      backgroundSize: "cover",
      // backgroundSize:"800px auto",
      backgroundRepeat: "repeat",
      animation: "animatedBackground 15s linear infinite alternate"
      }}>
          <Link style={{textDecoration: 'none'}} to="/">
          <header className="headerStyle"> planher
            <h3 className="tagline"> Get productive!</h3>
          </header>
        </Link>
        </div>
        
      
      {user ? <HomePage /> : <SignupLogin />}
      
    </main>
  );
}