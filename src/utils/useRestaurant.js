// import { useEffect, useState } from 'react';
// import { MENU_API } from '../constant';

// const useRestaurantMenu = (resId) => {
//   const [restaurantInfo, setRestaurantInfo] = useState(null);

//   // fetchdata
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await fetch(MENU_API + resId);
//     const json = await data.json();
//     setRestaurantInfo(json.data);
//   };

//   return restaurantInfo;
// };

// export default useRestaurantMenu;


import { useState, useEffect } from "react";
import {
    swiggy_menu_api_URL,
    MENU_ITEM_TYPE_KEY,
    RESTAURANT_TYPE_KEY,
    MENU_API
 } from "../constant"
 
const useRestaurantMenu = (resId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      console.log('resdata',restaurantData)
      setRestaurantInfo(restaurantData);

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
      // console.log(menuItems)
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }
  return [restaurantInfo,menuItems];
};

export default useRestaurantMenu;