import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard.js";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from "../constant.js";
import { Link } from "react-router-dom";

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

  // not rendered component (Early return)
  if(!allRestaurants) return null;

  // if(filteredRestaurants?.length === 0) return <h1>No Restaurant match your Filter!</h1>

    return (
      <>
         <div className="search-container">
            <input type="text" className="search-input" placeholder="Search"
             value={searchText}
              onChange={(e) => setSearchText(e.target.value) }
            />
            <button 
              className="search-btn"
              onClick={() => {
                // const data = filterData(searchText, allRestaurants);
                // setFilteredRestaurants(data)
                 // user click on button searchData function is called
                  searchData(searchText, allRestaurants);
              }}      
            >Search</button> 
        </div>

        {errorMessage && <div className="error-container">{errorMessage}</div>}

      {allRestaurants?.length === 0 ? (
        <Shimmer />
        ) : (
        <div className="restaurant-list">
            {        
              filteredRestaurants.map((restaurant) =>{
                 return(
                  <Link to={"/restaurant/"+restaurant?.info?.id} key={restaurant?.info?.id} >
                    <RestaurantCard {...restaurant?.info}  />
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