import React from 'react';

const NavBar = (props) => {
  function changeMasterRendererArray(num) {
    const newArray = [...props.masterRendererArray];
    newArray[num] = !newArray[num];
    props.setMasterRendererArray(newArray);
  }
  return (
    <nav className='navBar'>
      <ul className='addMeal'>
        <button
          onClick={() => {
            changeMasterRendererArray(0);
          }}
        >
          Add Meal +{' '}
        </button>
      </ul>
      <ul className='favMeal'>
        <button
          onClick={() => {
            changeMasterRendererArray(1);
          }}
        >
          Fav Meals
        </button>
      </ul>
      <ul className='recentMeal'>
        <button
          onClick={() => {
            changeMasterRendererArray(2);
          }}
        >
          Recent Meals
        </button>
      </ul>
      <ul className='weeklyPlanner'>
        <button
          onClick={() => {
            changeMasterRendererArray(3);
          }}
        >
          Weekly Planner
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
