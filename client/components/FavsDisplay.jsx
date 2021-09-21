import React from 'react';
import MealCard from './MealCard.jsx';
import GridLayout from 'react-grid-layout';
const FavsDisplay = (props) => {
  // didn't use this, used removeFav function in App.jsx instead
  // function unmount(event) {
  //   const newFavMeals = [...props.favMeals];
  //   newFavMeals.filter((el) => el.name !== event.target.parentNode.textValue);
  //   props.setFavMeals(newFavMeals);
  // }
  //similar to in app.jsx for MealDisplay, we create a new MealCard element for each object in the favMeals state
  const mealsArr = [];
  props.favMeals.forEach((el, idx) => {
    mealsArr.push(
      //must be a div due to ReactGridLayout
      <div id={idx.toString()} key={idx.toString()} className='no-drag'>
        <MealCard
          img={el.img}
          setFav={props.setFav}
          removeFav={props.removeFav}
          isFaved={true}
          cartItems={props.cartItems}
          setCartItems={props.setCartItems}
          name={el.name}
          directions={el.directions || 'no instructions found :('} //catches no instructions being found from api
          ingredients={el.ingredients}
          //note: unmount not given here, so X button in favsDisplay panel does not actually work..., but the lil <3 button works and gets rid of the mealcard in favsdisplay
        />
      </div>
    );
  });
  return (
    <div>
      <h3>My Favorite Meals</h3>
      <GridLayout
        className='layout'
        layout={props.layout} //rendering mealsArr here using same layout, which must by definition be at least as long as the mealsDisplay length, so not really an issue idt
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
