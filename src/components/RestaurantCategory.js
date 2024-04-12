import React, { useState } from 'react';
import ItemList from './ItemList';
   
const RestaurantCategory = ({ data, categoryItems, menuItems, isOpen, setShowIndex }) => {
  // 'data' is each unique category name, 'categoryItems' is an array of objects which contains menuItems per category name, 'menuItems' is the array of objs contains all the menu data.

  // const [isOpen, setIsOpen] = useState(true); // State to toggle accordion

  // on handleClick modify the state variable of the parent
  const handleClick = () => {  
     // setIsOpen(!isOpen); // Toggle the isOpen state
     setShowIndex(); 
  };

  // Filter items that belong to the current category
  const filteredMenuItems = menuItems.filter(item => item.category === data);

  return (
    <div className="w-8/12 mx-auto pt-7 pb-7 my-4 mb-6 bg-gray-50 shadow-lg p-4">
      {/* Accordion Header */}
      <div className="flex justify-between cursor-pointer" onClick={handleClick}>
        <h1 className="font-bold text-xl">
          {data} ({filteredMenuItems.length})
        </h1>
        <span>{isOpen ? '🔼' : '🔽'}</span>
      </div>
      {/* Accordion Body */}
      <div className='bg-white '>
        {isOpen && <ItemList items={filteredMenuItems} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
