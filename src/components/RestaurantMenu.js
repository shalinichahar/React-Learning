import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constant";
import {MenuShimmer} from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: ("Access-Control-Allow-Origin", "*"),
      }
    };
    try {
      const response = await fetch(swiggy_menu_api_URL + resId,options);
      const json = await response.json();

      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setRestaurant(restaurantData);

      // Set menu item data
      const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                            groupedCard?.cardGroupMap?.REGULAR?.
                            cards?.map(x => x.card?.card)?.
                            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating" style={
            (restaurant?.avgRating) < 4
              ? { backgroundColor: "var(--light-red)" }
              : (restaurant?.avgRating) === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white" }
          }>
            <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;




















// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {IMG_CDN_URL} from "../config.js";
// import  Shimmer from "./Shimmer.js";

// const RestaurantMenu = () => {
//     // How to read a dynamic URL params
//     const { resId }  = useParams(); 
//     // const restaurantInfo = useRestaurantMenu(resId);
//     const[ restaurant, setRestaurant ] = useState(null);
//     const [menuItems, setMenuItems] = useState([]);

//     useEffect(()=>{
//         getRestaurantInfo();
//     },[])

//     async function getRestaurantInfo(){
//         const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId="+resId);
//         const json = await data.json();
//         console.log(json.data);
//         // console.log( json.data.groupedCard.cardGroupMap.REGULAR.cards)
//         // console.log(Object.values(restaurant.groupedCard.cardGroupMap.REGULAR.cards[5].card.card.categories[0].itemCards[0].card.info.name));
//         // console.log(json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards);
//         // console.log(json.data.cards[0].card.card.info);
//         setRestaurant(json.data);
//     }

//     return (
//         <div>

//             <h1>Restaurant id: {resId}</h1>
//             <h2>{restaurant?.name}</h2>
//             {/* <h2>{restaurant?.cards[0]?.card?.card?.info?.name}</h2> */}
//             {/* <div>
//         <h1>Restaurant id: {resId}</h1>
//         <h2>{restaurant?.cards[0]?.card?.card?.info?.name}</h2>
//         <img src={IMG_CDN_URL +restaurant.cards[0].card.card.info.cloudinaryImageId}></img>  
//         <h2>{restaurant?.cards[0]?.card?.card?.info?.id}</h2> 
//         <h2>{restaurant?.cards[0]?.card?.card?.info?.city}</h2> 
//         <h2>{restaurant?.cards[0]?.card?.card?.info?.areaName}</h2>   
//         <h2>{restaurant.cards[0].card.card.info.avgRating} star </h2> 
//         {/* <h2>{restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.categories[0]?.itemCards[0]?.card?.info?.name}</h2> 
//         </div>  
            
           
//             <div>
//                 <h1> Items</h1>
//                 <ul>
//                     <h2>{restaurant.cards[2].groupedCard.cardGroupMap.REGULAR.cards[5].card.card.categories[0].itemCards[0].card.info.name} price- { restaurant.cards[2].groupedCard.cardGroupMap.REGULAR.cards[5].card.card.categories[0].itemCards[0].card.info.price}</h2>
//                     <h4>{restaurant.cards[2].groupedCard.cardGroupMap.REGULAR.cards[5].card.card.categories[0].itemCards[0].card.info.description}</h4>
//                 </ul>
//                  <ul>
//                     {Object.values(restaurant.groupedCard.cardGroupMap.REGULAR.cards).map((item) => ( 
//                     <li key={item.card}></li>
//                     ))}   
//                 </ul> 
//             </div>    */}
//         </div>
//     );
// };

// export default RestaurantMenu;