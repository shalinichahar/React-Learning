import {useState} from "react";
import Logo from "../assests/img/foodistan_logo.jpg";
import {Link} from "react-router-dom";  // imported Link for client side routing
import { useNavigate } from "react-router-dom";

const loggedInUser = () => {
    // API call to check authentication
    return true; 
};

const Title = () =>( 
    // <h1 id="title" key="h2">
    //     Food Villa
    // </h1>
    <a href="/"> 
        <img
        className="logo"
        alt="logo" 
        src={Logo} />
    </a>
);

/*
const Header = () =>{
    const [isloggedIn, setIsLoggedIn] = useState(true);
     
    return (
        <div className="header">
            {Title()}
            <div className="nav-items">
                <ul>    
                    <li><Link to="/">Home</Link></li>                          
                    <li><Link to="/about">About</Link></li>              
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </div>
            {
                 isloggedIn ? <button className="login-btn" onClick={()=>setIsLoggedIn(false)}>Logout</button> : <button onClick={() => setIsLoggedIn(true)}>Login</button>
            }
            
        </div>
    );
};


export default Header; */

// Header component for header section: Logo, Nav Items
const Header = () => {
    // use useState for user logged in or logged out
    const [isLoggedin, setIsLoggedin] = useState(true);
    const navigate = useNavigate();
    return (
      <div className="header">
        <Title />
        <div className="nav-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
  
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li>
              {/* use conditional rendering for login and logout */}
              {isLoggedin ? (
                <button
                  className="logout-btn"
                  onClick={() => setIsLoggedin(false)}
                >
                  Logout
                </button>
              ) : (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Header;
