import React from 'react';
// import MealCard from './mealCard.jsx';
// import GridLayout from 'react-grid-layout';
// import ReactDom from 'react-dom';
import NavBar from './NavBar.jsx';
import Aside from './Aside.jsx';
import MealDisplay from './MealDisplay.jsx';
import GridLayout from 'react-grid-layout';
import MealCard from './MealCard.jsx';
import Filter from './Filter.jsx';
import FavsDisplay from './FavsDisplay.jsx';
import UserLogin from './UserLogin.jsx';
import axios from 'axios';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [masterRendererArray, setMasterRendererArray] = React.useState([
    true,
    true,
    false,
    false,
  ]);
  const [rendererArray, setRendererArray] = React.useState([true, true, true]);
  const [layout, setLayout] = React.useState([
    { i: '0', x: 0, y: 0, w: 4, h: 12 },
    { i: '1', x: 4, y: 0, w: 4, h: 12 },
    { i: '2', x: 8, y: 0, w: 4, h: 12 },
  ]);
  const [favMeals, setFavMeals] = React.useState([
    {
      name: 'Krabby Patty',
      ingredients: [
        'buns',
        'pickles',
        'patty',
        'ketchup',
        'mustard',
        'tomato',
        'lettuce',
        'and most importantly love :)',
      ],
      directions: ['Do this', 'and this'],
    },
  ]);
  const [pantryItems, setPantryItems] = React.useState(['veg', 'grains']);
  const [cartItems, setCartItems] = React.useState(['fruit', 'sauce']);

  const dummyList = [
    'onions',
    'bread',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
  ];
  const dummyDirections = [
    'Make some food',
    'I love writing fake recipes',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
  ];
  const [meals, setMeals] = React.useState([
    {
      name: "Mama's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
    },
    {
      name: "Papa's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
    },
    {
      name: 'Krabby Patty',
      ingredients: [
        'buns',
        'pickles',
        'patty',
        'ketchup',
        'mustard',
        'tomato',
        'lettuce',
        'and most importantly love :)',
      ],
      directions: ['Do this', 'and this'],
    },
  ]);
  function loginUser(event) {
    axios({
      method: 'POST',
      url: '/users/login',
      data: {
        username: event.target.parentNode.children[2].value,
        password: event.target.parentNode.children[3].value,
      },
    }).then((response) => {
      if (response.data === 'Send to their page') {
        setIsLoggedIn(true);
      }
    });
    console.log(event.target.parentNode.children[2].value); //username
    console.log(event.target.parentNode.children[3].value); //password
  }
  function createUser(event) {
    axios({
      method: 'POST',
      url: '/users/create',
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: event.target.parentNode.children[2].value,
        password: event.target.parentNode.children[3].value,
      },
    });
    console.log(event.target.parentNode.children[2].value); //username
    console.log(event.target.parentNode.children[3].value); //password
  }
  function setFav(event) {
    const name = event.target.parentNode.textContent.slice(
      2,
      event.target.parentNode.textContent.length - 1
    );
    console.log(event);
    const { directions, ingredients } = meals.filter(
      (el) => el.name === name
    )[0];
    const newFavMeals = [...favMeals];
    newFavMeals.push({ name, directions, ingredients });

    setFavMeals(newFavMeals);
  }
  function removeFav(event) {
    const name = event.target.parentNode.textContent.slice(
      2,
      event.target.parentNode.textContent.length - 1
    );
    console.log(name);
    const newFavMeals = [...favMeals];

    setFavMeals(newFavMeals.filter((el) => el.name !== name));
  }
  const mealArray = [];
  meals.forEach((el, idx) => {
    if (rendererArray[idx]) {
      const isFaved =
        favMeals.filter((filterEl) => filterEl.name === el.name).length > 0;
      mealArray.push(
        <div id={idx.toString()} key={idx.toString()} className='no-drag'>
          <MealCard
            isFaved={isFaved}
            setFav={setFav}
            removeFav={removeFav}
            cartItems={cartItems}
            setCartItems={setCartItems}
            unmount={unmount}
            name={el.name}
            directions={el.directions}
            ingredients={el.ingredients}
          />
        </div>
      );
    }
  });

  function unmount(event) {
    const idx = event.target.parentNode.parentNode.parentNode.id;
    const newRendererArray = [...rendererArray];
    newRendererArray[idx] = false;
    // const newLayout = [...this.state.layout];
    // for (let i = idx; i < newLayout.length; i++) {
    //   newLayout[i].x -= 2;
    // }
    //above does not work, trying to shift every card over upon unmounting left card... oh well :)
    //i think its because gridlayout is not rerendering because it is not diffing so the diff algo doesnt pick it up
    // console.log(newLayout);
    setRendererArray(newRendererArray);
  }
  function addMeal(num) {
    //get request to backend
    const dummyObj = {
      name: 'cereal... with no milk',
      ingredients: dummyList,
      directions: dummyDirections,
    };
    const newMeals = [...meals];
    const newLayout = [...layout];
    const newRendererArray = [...rendererArray];
    for (let i = 0; i < num; i++) {
      newMeals.push(dummyObj);
      if (newLayout[newLayout.length - 1].x < 9) {
        newLayout.push({
          i: newLayout.length.toString(),
          x: newLayout[newLayout.length - 1].x + 4,
          y: newLayout[newLayout.length - 1].y,
          w: 4,
          h: 11,
        });
      } else {
        newLayout.push({
          i: newLayout.length.toString(),
          x: 0,
          y: newLayout[newLayout.length - 1].y + 11,
          w: 4,
          h: 11,
        });
      }
      newRendererArray.push(true);
    }
    setMeals(newMeals);
    setLayout(newLayout);
    setRendererArray(newRendererArray);
  }
  if (isLoggedIn) {
    return (
      <div id='app'>
        <NavBar
          setMasterRendererArray={setMasterRendererArray}
          masterRendererArray={masterRendererArray}
        />
        <div id='asideAndDisplayHolder'>
          <Aside pantryItems={pantryItems} cartItems={cartItems} />
          <GridLayout
            className='layout'
            layout={[
              { i: 'a', x: 0, y: 0, w: 20, h: 13 },
              { i: 'b', x: 0, y: 13, w: 20, h: 13 },
              { i: 'c', x: 0, y: 26, w: 20, h: 13 },
              { i: 'd', x: 0, y: 39, w: 20, h: 13 },
            ]}
            cols={20}
            rowHeight={30}
            width={1200}
            draggableCancel='.no-drag'
          >
            {masterRendererArray[0] && (
              <div id='mealDisplay' key='a'>
                <Filter addMeal={addMeal} />
                <MealDisplay
                  mealArray={mealArray}
                  rendererArray={rendererArray}
                  layout={layout}
                  addMeal={addMeal.bind(this)}
                />
              </div>
            )}
            {masterRendererArray[1] && (
              <div key='b' id='favDisplay'>
                <FavsDisplay
                  setFav={setFav}
                  removeFav={removeFav}
                  favMeals={favMeals}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  layout={layout}
                />
              </div>
            )}
          </GridLayout>
        </div>
      </div>
    );
  } else {
    return <UserLogin loginUser={loginUser} createUser={createUser} />;
  }
};

export default App;
