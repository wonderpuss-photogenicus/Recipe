import React from 'react';
import MealCard from './MealCard.jsx';
import GridLayout from 'react-grid-layout';
const FavsDisplay = (props) => {
  const mealsArr = [];
  function unmount(event) {
    const newFavMeals = [...props.favMeals];
    newFavMeals.filter((el) => el.name !== event.target.parentNode.textValue);
    props.setFavMeals(newFavMeals);
  }
  props.favMeals.forEach((el, idx) => {
    mealsArr.push(
      <div id={idx.toString()} key={idx.toString()} className='no-drag'>
        <MealCard
          setFav={props.setFav}
          removeFav={props.removeFav}
          isFaved={true}
          cartItems={props.cartItems}
          setCartItems={props.setCartItems}
          name={el.name}
          directions={el.directions}
          ingredients={el.ingredients}
        />
      </div>
    );
  });
  return (
    <div>
      <h3>My Favorite Meals</h3>
      <GridLayout
        className='layout'
        layout={props.layout}
        cols={20}
        rowHeight={30}
        width={1200}
      >
        {mealsArr}
      </GridLayout>
    </div>
  );
};

export default FavsDisplay;
