import { IMG_CDN_URL } from "../config.js";

const RestaurantCard = ({name,cuisines,cloudinaryImageId,avgRatingString}) => {
    return(
        <div className="card">
            <img src={ IMG_CDN_URL + cloudinaryImageId }></img>
            <h3> {name} </h3>
            <h5> {cuisines.join(', ')}</h5>
            <h4> {avgRatingString} star</h4>
        </div>
    )
  }

export default RestaurantCard;