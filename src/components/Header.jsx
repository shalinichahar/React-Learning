import {useState , useContext} from "react";
import Logo from "../assests/img/foodistan_logo.jpg";
import {Link} from "react-router-dom";  // imported Link for client side routing
import { useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
// import UserContext from "../utils/UserContext";
import { useAuth } from "../utils/AuthContext";

const loggedInUser = () => {
    // API call to check authentication
    return true; 
};

const Title = () =>(  
    <a href="/"> 
        <img
        className="h-28 px-2"
        alt="logo" 
        src={Logo} />
    </a>
);

// Header component for header section: Logo, Nav Items
const Header = () => {
    // use useState for user logged in or logged out
    const [isLoggedin, setIsLoggedin] = useState(true);

    const isOnline = useOnline(true);

    const navigate = useNavigate();

    const {userName} = useAuth();
    console.log({userName});

    // const {loggedInUser} = useContext(UserContext);
    // console.log(loggedInUser) 
    return (
      <div className="flex justify-between bg-pink-50 shadow-lg">
        <Title />
        <div className="nav-items">
          <ul className="flex py-10 font-semibold font-serif text-slate-600">
            <li className="px-2">
              <Link to="/">Home</Link>
            </li>
            <li className="px-2">
              <Link to="/about">About</Link>
            </li>
  
            <li className="px-2">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-2">
              <Link to="/instamart">Instamart</Link>
            </li>
            <li className="px-2">     
              <i className="fa-solid fa-cart-shopping"></i>          
            </li>    
          </ul>
        </div>
      <ul className="flex py-10">
      <li className="px-2">
              {isOnline ? '🟢': '🔴'}
              {/* use conditional rendering for login and logout */}
              {isLoggedin ? (
                <button
                  className="logout-btn"
                  onClick={() => setIsLoggedin(false)}
                >
                  Logout User:
                </button>
              ) : (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
            </li>
            <li className="font-thin  pr-3"> {userName || 'Guest'} </li>
      </ul>
      </div>
    );
  };
  
  export default Header;
