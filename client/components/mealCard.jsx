import React from 'react';
import Popup from 'reactjs-popup';
function MealCard(props) {
  const [addedToCart, setAddedToCart] = React.useState(false);
  const [side, setSide] = React.useState('ingredients');
  const [isFaved, setIsFaved] = React.useState(false);
  const [rating, setRating] = React.useState(-4);
  const starArr = [];
  const ratingArr = [];
  const dummyListListed = [];
  const dummyDirectionsListed = [];
  const dummyListModal = [];
  props.ingredients.forEach((el) => {
    dummyListListed.push(<li>{el}</li>);
  });
  props.directions.forEach((el) => {
    dummyDirectionsListed.push(<li>{el}</li>);
  });

  props.ingredients.forEach((el) => {
    dummyListModal.push(
      <>
        <label for={el} key={el}>
          <input type='checkbox' id={el} name={el} value={el} defaultChecked />
          {el}
        </label>
      </>
    );
  });
  const closeButton = (
    <button className='closeButton' onClick={props.unmount}>
      X
    </button>
  );
  for (let i = 0; i < 5; i++) {
    if (i < Math.abs(rating)) {
      ratingArr.push(true);
    } else {
      ratingArr.push(false);
    }
  }
  let missIngredientButton;
  if (addedToCart) {
    missIngredientButton = (
      <Popup
        trigger={
          <button className='button addToCardButtonTrue'>
            Add Missing Ingredients to Shopping List
          </button>
        }
        modal
      >
        <div className='modalPopupWindow'>
          <form class='missIngredientForm'>{dummyListModal}</form>
        </div>
      </Popup>
    );
    // addToCartButtonFalse
  } else {
    missIngredientButton = (
      <Popup
        trigger={
          <button className='button addToCartButtonFalse'>
            Add Missing Ingredients to Shopping List
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className='modalPopupWindow'>
            <button className='close' onClick={close}>
              &times;
            </button>
            {dummyListModal}{' '}
            <div className='actions'>
              <button
                className='button'
                onClick={() => {
                  console.log('modal closed ');
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
        type='image'
        onClick={(event) =>
          setRating(Number(event.target.className.slice(10, 11)))
        }
        className={'ratingStar' + i.toString() + ratingArr[i - 1].toString()}
        key={'ratingStar' + i.toString()}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1200px-Five-pointed_star.svg.png'
      />
    );
  }
  let list;
  let buttonArr = [];

  if (side === 'ingredients') {
    list = <ul>{dummyListListed}</ul>;
    buttonArr.push(
      <div>
        <button
          className='ingredientButton isActive'
          onClick={() => setSide('ingredients')}
        >
          Ingredients
        </button>
        <button
          className='directionButton'
          onClick={() => setSide('directions')}
        >
          Directions
        </button>
      </div>
    );
  } else if (side === 'directions') {
    list = <ol>{dummyDirectionsListed}</ol>;
    buttonArr.push(
      <div>
        <button
          className='ingredientButton'
          onClick={() => setSide('ingredients')}
        >
          Ingredients
        </button>
        <button
          className='directionButton isActive'
          onClick={() => setSide('directions')}
        >
          Directions
        </button>
      </div>
    );
  }
  let favButton;
  if (isFaved) {
    favButton = (
      <button
        className='falseFavoriteButton'
        onClick={() => setIsFaved(!isFaved)}
      >
        &lt;3
      </button>
    );
  } else if (!isFaved) {
    favButton = (
      <button
        className='trueFavoriteButton'
        onClick={() => setIsFaved(!isFaved)}
      >
        &lt;3
      </button>
    );
  }

  return (
    <div>
      <div className='favAndCloseHolder'>
        {favButton}
        {props.name}
        {closeButton}
      </div>
      <div className='imgHolder'>
        <img src='https://i.imgur.com/mSVtgYm.jpg' />
      </div>

      <div className='buttonHolder'>{buttonArr}</div>
      <div className='mealCardContainer'>
        <div class='mealCardList'>{list}</div>

        <div className='missIngredientHolder'>{missIngredientButton}</div>
        <div className='mealCardLink'>
          <a href='#'>Original Recipe</a>
        </div>
        <div className='starArr'>{starArr}</div>
      </div>
    </div>
  );
}

export default MealCard;
