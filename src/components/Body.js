import { useState, useEffect } from "react";
import RestaurantCard, { withVegLable } from "./RestaurantCard.js";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from "../constant.js";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline.js";
import { useAuth } from "../utils/AuthContext.js";

function filterData(searchText, restaurants){
  
    const filterData = restaurants.filter((restaurant) => 
    restaurant.info.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
    return filterData; 
}

const Body = () => {
  const [allRestaurants , setAllRestaurants] = useState([]); 
  const [filteredRestaurants,setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // A restaurant card component which has a label  on it 
  const RestaurantCardVeg = withVegLable(RestaurantCard)

  // Whenever state variables update, react triggers a reconciliation cycle
    const {userName, setUserName} = useAuth();
  
  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    // API Call
    getRestaurants();
  },[]);

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants(){
    // handle the error using try... catch
    try {
      const response = await fetch(swiggy_api_URL);
      
      const json = await response.json();
      
      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
        // update the state variable restaurants with Swiggy API data
        setAllRestaurants(resData);
        setFilteredRestaurants(resData);
      } catch (error) {
        console.log(error);
      }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {  
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`);
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };
 
  const online = useOnline();
  if(!online){
    return <h1 className="offline">You are offline, please check your internet connection!</h1>
  }

  // not rendered component (Early return)
  if(!allRestaurants) return null;
    return (
      <>
         <div className="search-container h-auto bg-purple-50 my-5 shadow-sm">
            <input type="text" className="m-3 p-2 shadow-md rounded-md focus:outline-none focus:ring focus:ring-violet-300" placeholder="Search"
             value={searchText}
              onChange={(e) => setSearchText(e.target.value) }
            />
            <button 
              className="p-2 m-2 text-white rounded-md bg-slate-600 hover:bg-violet-600"
              onClick={() => {
                  searchData(searchText, allRestaurants);
              }}      
            >Search</button> 

            <label className="ml-32 font-serif">UserInfo: </label>
            <input className=" p-2 shadow-md rounded-sm focus:outline-none focus:ring focus:ring-violet-300" placeholder="Change login info" 
              onChange={(e)=>setUserName(e.target.value)} value={userName}
            />
        </div>

        <div className="m-4 p-4 items-cent">
          <input />
        </div>

        {errorMessage && <div className="error-container">{errorMessage}</div>}

        

      {allRestaurants?.length === 0 ? (
        <Shimmer />
        ) : (
        <div className="flex flex-wrap justify-center">
            {        
              filteredRestaurants.map((restaurant) =>{
                 return(
                  <Link to={"/restaurant/"+restaurant?.info?.id} key={restaurant?.info?.id} >                    
                    {/** if the reatuarant is veg then add a veg lable to it */
                     restaurant.info.veg  ? (<RestaurantCardVeg {...restaurant?.info}/>) : (<RestaurantCard {...restaurant?.info}/>)
                    }
                    
                  </Link>
                );
              })       
            }
        </div>
        )}
      </>
    );
};

export default Body;