import { IMG_CDN_URL } from "../config.js";

const RestaurantCard = ({name,cuisines,cloudinaryImageId,avgRatingString}) => {
    return(
        <div className="w-56 p-2 m-2 shadow-md bg-pink-50 hover:scale-105 hover:shadow-xl transition-transform duration-200">
            <img src={ IMG_CDN_URL + cloudinaryImageId }></img>
            <h3 className="font-bold text-xl"> {name} </h3>
            <h5>{cuisines ? cuisines.join(', ') : ''}</h5>
            <h4> {avgRatingString} star</h4>
        </div>
    )
  }

  //Higher Order Component

  // input - Restaurant card, output - Promoted Res card 

  export const withVegLable = (RestaurantCard)=>{
    return (props) =>{
        return (
            <div className="relative w-56">
                <label className="absolute z-10 bg-slate-200 text-green-700 m-2 p-2 rounded-lg w-20 text-center hover:shadow-xl transition-transform duration-200">Veg</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
  };

export default RestaurantCard;