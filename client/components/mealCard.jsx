import React from "react";
import Popup from "reactjs-popup";
function MealCard(props) {
  const [addedToCart, setAddedToCart] = React.useState(false); //state that maintains functionality and appearance of addMissingIngredients button
  const [side, setSide] = React.useState("ingredients"); //state that maintains which side of text-box is shown
  const [isFaved, setIsFaved] = React.useState(props.isFaved); //state that maintains functionality and appearance of <3 button in top-left corner
  const [rating, setRating] = React.useState(-4); //state that maintains the rating stars that appear at bottom of card (hardcoded to be -4 bc spoonacular api does not give ratings... but we thought it did, still the stars are functional and do change!)
  const starArr = []; //holds star images
  const ratingArr = []; //maintains which stars are yellow in the rating -> array of 5 bools -> [true, true, true, false, false] means a 3 star rating...etc...
  const dummyListListed = []; //dummy data container
  const dummyListModal = []; //dummy data for modal window that pops up when pressing miss ingredient button
  //custom function to grab the checked items in popup window and turn that into an array
  const addModalItems = (event, array) => {
    const form = event.target.previousElementSibling; //this is where the checkboxes live
    for (let i = 0; i < form.length; i++) {
      if (form[i].checked) {
        array.push(form[i].value);
      }
    }
    return array;
  };
  props.ingredients.forEach((el) => {
    //creates a series of list elements for the dummydata for the textbox
    dummyListListed.push(<li>{el}</li>);
  });
  //same as above but for the  popup window
  props.ingredients.forEach((el) => {
    dummyListModal.push(
      <>
        <label for={el} key={el}>
          <input type="checkbox" id={el} name={el} value={el} defaultChecked />
          {el}
        </label>
      </>
    );
  });
  const closeButton = (
    <button className="closeButton" onClick={props.unmount}>
      X
    </button>
  );
  //controls how stars are rendered based on rating state
  for (let i = 0; i < 5; i++) {
    if (i < Math.abs(rating)) {
      ratingArr.push(true);
    } else {
      ratingArr.push(false);
    }
  }
  //this statement determines whether the missingIngredientbutton should be green/red and clickable/unclickable
  let missIngredientButton;
  if (addedToCart) {
    missIngredientButton = ( //className below controls color of button
      <button className="button addToCartButtonTrue">
        Added to your list!
      </button>
    );
    // addToCartButtonFalse
  } else {
    missIngredientButton = (
      <Popup
        trigger={
          //button that causes popup to appear
          //className below controls color of button
          <button className="button addToCartButtonFalse">
            Add Missing Ingredients to Shopping List
          </button>
        }
        modal //syntax for popup describing type
        nested
      >
        {(
          close //functionality to close popup window
        ) => (
          <div className="modalPopupWindow">
            <button className="close" onClick={close}>
              &times;
            </button>

            <div className="actions">
              <form>{dummyListModal}</form>
              <button
                className="button"
                onClick={(event) => {
                  setAddedToCart(true); //sets state of button to be 'clicked'
                  const newCartItems = [...props.cartItems]; //clones state, grabs checked items, then sets states
                  addModalItems(event, newCartItems);
                  props.setCartItems(newCartItems);
                  close();
                }}
              >
                Add to Shopping List
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
  for (let i = 1; i < 6; i++) {
    starArr.push(
      <input
        type="image"
        onClick={
          (event) => setRating(Number(event.target.className.slice(10, 11))) //grabs the number of the star and sets that to be the new star
        }
        className={"ratingStar" + i.toString() + ratingArr[i - 1].toString()} //how css properties are applied to be either yellow or transparent background -> ratingStar1true, ratingStar2false, ratingStar3false... would be a 1 star rating
        key={"ratingStar" + i.toString()}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1200px-Five-pointed_star.svg.png"
      />
    );
  }
  let list;
  let buttonArr = [];

  if (side === "ingredients") {
    //controls which side is rendered and what the buttons are colored
    list = <ul>{dummyListListed}</ul>;
    buttonArr.push(
      <div>
        <button
          className="ingredientButton isActive" //isActive makes the button turn green
          onClick={() => setSide("ingredients")}
        >
          Ingredients
        </button>
        <button
          className="directionButton"
          onClick={() => setSide("directions")}
        >
          Directions
        </button>
      </div>
    );
  } else if (side === "directions") {
    list = <p>{props.directions}</p>;
    buttonArr.push(
      <div>
        <button
          className="ingredientButton"
          onClick={() => setSide("ingredients")}
        >
          Ingredients
        </button>
        <button
          className="directionButton isActive"
          onClick={() => setSide("directions")}
        >
          Directions
        </button>
      </div>
    );
  }
  let favButton;
  if (isFaved) {
    //controls what faveButton looks like
    favButton = (
      <button
        className="trueFavoriteButton" //this will make the favbutton be yellow
        onClick={(event) => {
          props.removeFav(event);
          setIsFaved(!isFaved);
        }}
      >
        &lt;3
      </button>
    );
  } else if (!isFaved) {
    favButton = (
      <button
        className="falseFavoriteButton" //this will make the favbutton be off-light-green
        onClick={(event) => {
          props.setFav(event);
          setIsFaved(!isFaved);
        }}
      >
        &lt;3
      </button>
    );
  }

  return (
    <div>
      <div className="favAndCloseHolder">
        {favButton}
        {props.name}
        {closeButton}
      </div>
      <div className="imgHolder">
        <img src={props.img} />
      </div>

      <div className="buttonHolder">{buttonArr}</div>
      <div className="mealCardContainer">
        <div className="mealCardList">{list}</div>

        <div className="missIngredientHolder">{missIngredientButton}</div>
        <div className="mealCardLink">
          <a href="#">Original Recipe</a>
        </div>
        <div className="starArr">{starArr}</div>
      </div>
    </div>
  );
}

export default MealCard;
