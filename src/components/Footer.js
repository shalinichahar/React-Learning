import Logo from "../assests/img/foodistan_logo-removebg-preview.png";
const Footer = () =>{
    return(
       <div className="container-footer">
        <div className="container-inside">
            <div className="row">
                <div className="firstCol">
                    <div className="firstRow">
                    <a href="/">  <img className="logo-footer" alt="logo"  src={Logo} /> <span className="logo-title">FoodIstan</span></a>
                    </div>
                    <div className="secondRow">
                        <p>© 2023 Bundl Technologies Pvt. Ltd</p>
                    </div>
                </div>
                <div className="second-col">
                    <h4>Company</h4>
                    <ul>
                        <li>
                            About Us
                        </li>
                        <li>
                            Grocery
                        </li>
                        <li>
                            Career
                        </li>
                    </ul>
                </div>
                <div className="third-col">
                    <h4>Legal</h4>
                    <ul>
                        <li>
                            Terms & Conditions
                        </li>
                        <li>
                            Privacy Policy
                        </li>
                        <li>
                        Cookie Policy
                        </li>
                    </ul>
                </div>
                <div className="fourth-col">
                    <h4>Contact Us</h4>
                    <ul>
                        <li>
                        Help & Support
                        </li>
                        <li>
                        Partner with us
                        </li>
                        <li>
                        Ride with us
                        </li>
                    </ul>
                </div>
            </div>
        </div>


       </div>
    )

}

export default Footer;