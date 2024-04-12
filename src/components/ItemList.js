import React from 'react';
import { IMG_CDN_URL } from '../constant';

const ItemList = ({ items }) => {
  
  return(
    <div className='mt-6 pt-3'>
      {items.map((item, index) => (
        <div key={index} className="flex mb-2 border-b-2 w-auto items-center justify-between">
         
          <div className='mt-8 mb-8 w-80 justify-items-start'>
            <h3 className="text-md font-semibold  text-left">{item.name}</h3>
            <h4 className='text-left mb-3'>₹ {item.price /100}</h4>
            <p className="text-sm text-slate-600 text-left">{item.description}</p>
          </div>

          <div className='relative pl-3 mb-6 justify-end items-center'>
          <img src={`${IMG_CDN_URL}/${item.imageId}`} alt={item.name} className="w-60 h-40" />
          <button className='absolute rounded-md bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-orange-700 text-white font-bold shadow-lg hover:bg-orange-500 text-sm'>
            Add+
          </button>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;










// import { IMG_CDN_URL } from '../constant';

// const ItemList = ({ items, uniqueCategory }) => {
//   console.log(items,uniqueCategory) 
//   // console.log(items.map(item => item.category===uniqueCategory))
 
//   // To organize items by their categories as per uniqueCategory
//   const categorizedItems = uniqueCategory.map(category => ({
//     category,
//     items: items.filter(item => item.category === category),
//   }));

//   console.log(categorizedItems)
//   return(
//     <div>
//       hello
//       {/* {categorizedItems?.map(item => item?.items)} */}
//     </div>
//   )
  
// };

// export default ItemList;



{/* {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button className="p-2 ml-6 mt-[70px] rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]">
                Add +
              </button>
            </div>
            <img
              src={IMG_CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-full rounded-md"
            />
          </div>
        </div>
      ))} */}