import Logo from "../assests/img/foodistan_logo-removebg-preview.png";
const Footer = () =>{
    return(
       <div className="bg-gray-800 justify-center flex text-white p-7 mt-20">
                <div className="p-2 m-3">
                    <div>
                    <a href="/">  <img className="w-55 h-55" alt="logo"  src={Logo} /> <span className="logo-title">FoodIstan</span></a>
                    </div>
                    <div className="secondRow">
                        <p>© 2023 Bundl Technologies Pvt. Ltd</p>
                    </div>
                </div>
                <div className="font-bold justify-center p-2 m-3 font-serif text-white">
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
                <div className="justify-center p-2 m-3 text-white">
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
                <div className="justify-center p-2 m-3 text-white">
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
    )

}

export default Footer;