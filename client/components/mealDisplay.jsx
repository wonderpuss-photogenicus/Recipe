import React from 'react';
import GridLayout from 'react-grid-layout';
import Filter from './Filter.jsx';
const MealDisplay = (props) => {
  return (
    <div key='a'>
      {/* <button id='addMealButton' onClick={props.addMeal}>
        Find new Meal!
      </button> */}
      <GridLayout
        className='layout'
        layout={props.layout}
        cols={20}
        rowHeight={30}
        width={1200}
      >
        {props.mealArray}
      </GridLayout>
    </div>
  );
};

export default MealDisplay;
