import { Outlet } from "react-router-dom";
import ProfileFunctionalComponent from "./Profile"
import Profile from "./ProfileClass";

const About = () =>{
    return(
        <div className="about-us">
            <h1>About Us Page</h1>
            <h4></h4>
            <h3>This is the foodistan App</h3>
            <h4></h4>
            <ProfileFunctionalComponent Work={"Team-Functional"}/>
            <h4></h4>
            <Profile Work={"Team-Class"} xyz="hey"/>
        </div>
    )
}
export default About;