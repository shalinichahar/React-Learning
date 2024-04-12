import { useParams } from "react-router-dom"; // import useParams for read `resId`
import useRestaurantMenu from "../utils/useRestaurant";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import {MenuShimmer} from "./Shimmer";
import { MENU_API, IMG_CDN_URL} from "../constant";
// import {
//   IMG_CDN_URL,
//   ITEM_IMG_CDN_URL,
// } from "../constant";
 
const RestaurantMenu = () => {
  const {resId} = useParams();

  //to render the menu data
  const [restaurantInfo, menuItems] = useRestaurantMenu(resId);

  //by default first accordian is open
  const [showIndex, setShowIndex] = useState(null);

  const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));

  const itemsByCategory = uniqueCategories.map(category => ({
    category,
    items: menuItems.filter(item => item.category === category),
  }));

  return (!restaurantInfo) ? (
    <MenuShimmer/>
  ) : (
    <div className="text-center  bg-gray-100">
      <div className="text-center m-2">
        <div className="px-5 mx-5">
          <h1 className="font-bold font-sans text-4xl m-6">{restaurantInfo?.name}</h1>
          <img className="mx-auto m-3" src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId} /> 
          <h3 className="text-lg font-semibold">{restaurantInfo?.costForTwoMessage}</h3>
          <h3 className="text-2xl font-semibold font-serif text-gray-900">{restaurantInfo?.cuisines.join(", ")}</h3>
        </div>
    </div>

      {/* categories accordian */}
      {uniqueCategories.map((item, index)=><RestaurantCategory key={index} data={item} categoryItems={itemsByCategory} menuItems={menuItems} isOpen={index===showIndex ? true : false} setShowIndex={()=> setShowIndex(index)}/>)}
    </div>
  )
}




// const RestaurantMenu = () => {
//   const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  
//   const [restaurant, menuItems] = useRestaurant(resId);
//    console.log(restaurant, menuItems)
//   return !restaurant ? (
//     <MenuShimmer />
//   ) : (
//     <div className="mt-20 min-h-screen w-auto">
//       <div className="flex h-50 justify-center items-center bg-[var(--light-black)] text-[var(--light-white-text)] overflow-y-hidden">
//         <img
//           className="w-62 h-42 rounded"
//           src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
//           alt={restaurant?.name}
//         />
//         <div className="flex flex-col basis-[520px] m-5">
//           <h2 className="text-5xl max-w-[540px] font-bold">{restaurant?.name}</h2>
//           <p className="whitespace-nowrap text-inherit opacity-70 text-base max-w-[540px]">{restaurant?.cuisines?.join(", ")}</p>
//           <div className="flex mt-[18px] justify-between items-center text-xs font-semibold pb-[10px] text-inherit max-w-[340px]">
//             <div className="flex items-center px-[8px] py-[5px] gap-[5px] bg-[var(--dark-green)] rounded-md" style={
//             (restaurant?.avgRating) < 4
//               ? { backgroundColor: "var(--light-red)" }
//               : (restaurant?.avgRating) === "--"
//               ? { backgroundColor: "white", color: "black" }
//               : { color: "white" }
//           }>
//             <i className="fa-solid fa-star"></i>
//               <span>{restaurant?.avgRating}</span>
//             </div>
//             <div className="rpx-5">|</div>
//             <div>{restaurant?.sla?.slaString}</div>
//             <div className="px-5">|</div>
//             <div>{restaurant?.costForTwoMessage}</div>
//           </div>
//         </div>
//       </div>

//       {/* categories accordian */}

//       <div className="flex justify-center">
//         <div className="mt-7.5 w-[850px]">
//           <div className="p-5">
//             <h3 className="menu-title">Recommended</h3>
//             <p className="mt-2.5 leading-normal text-[rgba(40,44,63,0.45)] text-base">
//               {menuItems.length} ITEMS
//             </p>
//           </div>
//           <div className="flex justify-center flex-col">
//             {menuItems.map((item) => (
//               <div className="flex justify-between p-5 border-b border-[rgba(40,44,63,0.45)]" style={{borderWidth: '0.5px'}} key={item?.id}>
//                 <div className="lex flex-col self-start overflow-hidden">
//                   <h3 className="w-auto text-slate-950">{item?.name}</h3>
//                   <p className="mt-1 text-base font-normal text-slate-600 w-inherit">
//                     {item?.price > 0
//                       ? new Intl.NumberFormat("en-IN", {
//                           style: "currency",
//                           currency: "INR",
//                         }).format(item?.price / 100)
//                       : " "}
//                   </p>
//                   <p className="mt-3 leading-snug text-slate-900 text-opacity-45 text-base">{item?.description}</p>
//                 </div>
//                 <div className="flex flex-col justify-center items-end w-[300px] overflow-hidden">
//                   {item?.imageId && (
//                     <img
//                       className="h-24 w-24 rounded-md"
//                       src={ITEM_IMG_CDN_URL + item?.imageId}
//                       alt={item?.name}
//                     />
//                   )}
//                   <button className="bg-orange-600 px-6 py-2 cursor-pointer outline-none border hover:bg-orange-400 mt-2.5 rounded-md "> ADD +</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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