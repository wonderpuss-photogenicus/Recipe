import React from 'react';

function MealCard() {
  const starArr = [];
  const [addedToCart, setAddedToCart] = React.useState(false);
  const [side, setSide] = React.useState('ingredients');
  const [isFaved, setIsFaved] = React.useState(false);
  const [rating, setRating] = React.useState(-4);
  const ratingArr = [];

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
      <button className='addToCartButtonTrue'>
        Add Missing Ingredients to Shopping List
      </button>
    );
  } else {
    missIngredientButton = (
      <button
        onClick={() => setAddedToCart(true)}
        className='addToCartButtonFalse'
      >
        Add Missing Ingredients to Shopping List
      </button>
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
    list = (
      <ul>
        <li>onions</li>
        <li>bread</li>
        <li>ramen</li>
      </ul>
    );
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
    list = (
      <ol>
        <li>Make some food</li>
        <li>I love writing fake recipes</li>
        <li>Call me Ina Garten</li>
      </ol>
    );
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
    <div className='mealCard'>
      {favButton}
      {buttonArr}
      <div className='mealCardContainer'>
        {list}
        {missIngredientButton}
        <div class='starArr'>{starArr}</div>
      </div>
    </div>
  );
}

export default MealCard;
