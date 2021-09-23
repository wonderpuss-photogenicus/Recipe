import React, { useState } from "react";
// import MealCard from './mealCard.jsx';
// import GridLayout from 'react-grid-layout';
// import ReactDom from 'react-dom';
import NavBar from "./NavBar.jsx";
import Aside from "./Aside.jsx";
import MealDisplay from "./MealDisplay.jsx";
import GridLayout from "react-grid-layout";
import MealCard from "./MealCard.jsx";
import Filter from "./Filter.jsx";
import FavsDisplay from "./FavsDisplay.jsx";
import UserLogin from "./UserLogin.jsx";
import axios from "axios";

const initialState = {
  _id: { $oid: "614b4942654d068d307f5226" },
  username: " ",
  pantry: [],
  shoppingList: [],
  favoriteList: [],
};

const App = () => {
  axios.get('/session').then((response) => {
    if (response.data === 'Send to their page') {
      //this is the expected response from backend upon successful login
      setIsLoggedIn(true);
    }});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //state determines whether or not each parent component is rendered (fav/mealDisplay)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [masterRendererArray, setMasterRendererArray] = useState([true, true]);
  const [rendererArray, setRendererArray] = useState([true, true, true]); //state determines whether each mealcard is displayed for each child component (3 dummy values because api quota is low)
  //similar to above, determines layout of child mealcard components
  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 4, h: 12 },
    { i: "1", x: 4, y: 0, w: 4, h: 12 },
    { i: "2", x: 8, y: 0, w: 4, h: 12 },
  ]);
  //state that keeps track of meals that are faved, dummydata of 1
  const [favMeals, setFavMeals] = useState([
    {
      id: "52768",
      name: "Apple Frangipan Tart",
      cuisine: "British",
      imgURL:
        "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
      ingredients: [
        "onions",
        "bread",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
        "ramen",
      ],
    },
  ]);
  //state for below 2 are for aside panel that monitor pantry and shopping cart, initialized with 2 dummy items in array
  const [pantryItems, setPantryItems] = useState(initialState["pantry"]);
  const [cartItems, setCartItems] = useState(initialState["shoppingList"]);
  //test data
  const dummyList = [
    "onions",
    "bread",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
    "ramen",
  ];
  const dummyDirections = "do stuff";
  //state that hold meals to be rendered in the mealdisplay parent component
  const [meals, setMeals] = useState([
    {
      name: "Mama's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
      img: "https://i.imgur.com/mSVtgYm.jpg",
    },
    {
      name: "Papa's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
      img: "https://i.imgur.com/mSVtgYm.jpg",
    },
    {
      name: "Krabby Patty",
      ingredients: [
        "buns",
        "pickles",
        "patty",
        "ketchup",
        "mustard",
        "tomato",
        "lettuce",
        "and most importantly love :)",
      ],
      directions: "make a krabby patty :)",
      img: "https://i.imgur.com/mSVtgYm.jpg",
    },
  ]);
  //custom function to login user
  function loginUser(event) {
    axios({
      method: "POST",
      url: "/login/login",
      data: {
        username: event.target.parentNode.children[2].value, //username from input
        password: event.target.parentNode.children[3].value, //password from input
      },
    }).then((response) => {
      if (response.data === "Send to their page") {
        //this is the expected response from backend upon successful login
        setIsLoggedIn(true);
      }
    });
  }
  //custom function to create a new user and then log in the user, almost same as above but different url and alerts chrome with success message
  function createUser(event) {
    axios({
      method: "POST",
      url: "/users/create",
      headers: { "Content-Type": "application/json" },
      data: {
        username: event.target.parentNode.children[2].value,
        password: event.target.parentNode.children[3].value,
      },
    }).then((data) => {
      if (data.data === "Send to their page") {
        alert("New User Created");
        setIsLoggedIn(true);
      }
    });
  }

  function loginGoogle(event) {
    console.log("SignIn with google");
  }
  //custom function to add an item to the favMeals state when <3 button pressed on top left corner of a meal card
  function setFav(event) {
    const name = event.target.parentNode.textContent.slice(
      2,
      event.target.parentNode.textContent.length - 1
    ); //kinda stupid way to get this, but the name of the mealcard is kept at the top of the parentNode mealcard as "<3`name`X", so here we just remove the first two characters and last characters to get the name

    const { directions, ingredients, img } = meals.filter(
      (el) => el.name === name
    )[0]; //destructuring and grabbing all the necessary properties of the requested mealcard using the meals state
    const newFavMeals = [...favMeals]; //cloning favMeals state then adding new one and setting new state
    newFavMeals.push({ name, directions, ingredients, img });
    setFavMeals(newFavMeals);
  }
  //custom function to remove a favorite when <3 button is clicked again
  function removeFav(event) {
    const name = event.target.parentNode.textContent.slice(
      //once again grabbing name... kinda stupid way to do it
      2,
      event.target.parentNode.textContent.length - 1
    );
    const newFavMeals = [...favMeals]; //cloning and then filtering out the name and setting state to new array
    setFavMeals(newFavMeals.filter((el) => el.name !== name));
  }
  //initiating mealArray which will be rendered in the mealDisplay component
  const mealArray = [];
  meals.forEach((el, idx) => {
    //iterating through state
    if (rendererArray[idx]) {
      //this is how we control whether an element pops up => rendererArray = [true, false, true] => means only 1st and 3rd elements pop up... etc
      const isFaved =
        favMeals.filter((filterEl) => filterEl.name === el.name).length > 0; //checking on if the meal is saved in fav or not
      mealArray.push(
        //key is important, it is related to the layout state and determines how the ReactGridLayout displays items
        <div id={idx.toString()} key={idx.toString()} className="no-drag">
          <MealCard //passing down state and functions
            img={el.imgURL}
            isFaved={isFaved}
            setFav={setFav}
            removeFav={removeFav}
            cartItems={cartItems}
            setCartItems={setCartItems}
            unmount={unmount}
            name={el.name}
            directions={el.directions || "No directions found :("} //lots of time the api returns no instructions so this is a catch for that
            ingredients={el.ingredients}
          />
        </div>
      );
    }
  });
  //custom function that is used to unmount a mealCard when clicking X
  function unmount(event) {
    const idx = event.target.parentNode.parentNode.parentNode.id; //grabs id which is designed to correspond to rendererArr idx
    const newRendererArray = [...rendererArray]; //clone rendererArray and change the rendererArray to be false at idx to force the corresponding mealcard not to be rendered
    newRendererArray[idx] = false;
    // const newLayout = [...this.state.layout];
    // for (let i = idx; i < newLayout.length; i++) {
    //   newLayout[i].x -= 2;
    // }
    //above does not work, trying to shift every card over upon unmounting left card... oh well :)
    //i think its because gridlayout is not rerendering because it is not diffing so the diff algo doesnt pick it up
    // console.log(newLayout);
    setRendererArray(newRendererArray);
    v;
  }
  //custom function that takes in array of objects, which is obtained from axios request from backend and sets state to make these objects render in the mealDisplay component
  function addMeal(array) {
    // const dummyObj = {
    //   name: 'cereal... with no milk',
    //   ingredients: dummyList,
    //   directions: dummyDirections,
    // };
    const newMeals = [...meals]; //copying states...
    const newLayout = [...layout];
    const newRendererArray = [...rendererArray];
    for (let i = 0; i < array.length; i++) {
      newMeals.push(array[i]); //pushing each object into the meals state
      if (newLayout[newLayout.length - 1].x < 9) {
        //checks if this will be the 5th card in a row, if it is -> make a layout attribute for one card to the right
        newLayout.push({
          //just some math on adding a new layout attribute for the ReactGridLayout
          i: newLayout.length.toString(), //n + 1
          x: newLayout[newLayout.length - 1].x + 4,
          y: newLayout[newLayout.length - 1].y,
          w: 4,
          h: 11,
        });
      } else {
        //otherwise make a first card for the next row
        newLayout.push({
          i: newLayout.length.toString(),
          x: 0, //x-coord is 0 -> move back far left
          y: newLayout[newLayout.length - 1].y + 11, //y increases -> move down a row
          w: 4,
          h: 11,
        });
      }
      newRendererArray.push(true); //makes sure the next element will be rendered
    }
    setMeals(newMeals); //setting states
    setLayout(newLayout);
    setRendererArray(newRendererArray);
  }
  //final return statement!
  if (isLoggedIn) {
    //checking if user is logged in or not
    return (
      <div id="app">
        <NavBar //navbar contains functionality to render top level components (mealDisplay, favDisplay)
          setMasterRendererArray={setMasterRendererArray}
          masterRendererArray={masterRendererArray}
        />
        <div id="asideAndDisplayHolder">
          <Aside
            pantryItems={pantryItems}
            cartItems={cartItems}
            setPantryItems={setPantryItems}
            setCartItems={setCartItems}
          />
          <GridLayout //gridLayout is from react-grid-layout https://github.com/react-grid-layout/react-grid-layout, component that allows clickability and draggability
            measureBeforeMount={true} //this was me trying to get stuff to work so the top-level components wouldnt appear teeny tiny when first mounted... didn't work :( -Adam
            autoSize={true} //same as above
            className="layout" //needed syntax
            layout={[
              //layout is i -> key of component, x-> initial x-coordinate, y-> initial y-coordinate, w-> initial width, h->initial height
              { i: "a", x: 0, y: 0, w: 20, h: 13 },
              { i: "b", x: 0, y: 13, w: 20, h: 13 },
              { i: "c", x: 0, y: 26, w: 20, h: 13 },
              { i: "d", x: 0, y: 39, w: 20, h: 13 },
            ]}
            cols={20} //these determine how granular you want scaling/resizing, also controls initial size/placing of component
            rowHeight={30}
            width={1200}
            draggableCancel=".no-drag" //this controls inner nesting of react-grid-layout components, so we can drag inner components (which must have this specified className) without dragging parent components
          >
            {masterRendererArray[0] && ( //controlling if parent level should render or not
              /*GRIDLAYOUT CAN ONLY DIRECTLY RENDER divs, IT CANNOT RENDER CUSTOM COMPONENTS*/
              <div id="mealDisplay" key="a">
                <Filter addMeal={addMeal} pantryItems={pantryItems} />
                <MealDisplay
                  mealArray={mealArray}
                  rendererArray={rendererArray}
                  layout={layout}
                  addMeal={addMeal.bind(this)}
                />
              </div>
            )}
            {masterRendererArray[1] && (
              <div key="b" id="favDisplay">
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
    //if user is not logged in, show the userlogin page :)
    return (
      <UserLogin
        loginUser={loginUser}
        createUser={createUser}
        loginGoogle={loginGoogle}
      />
    );
  }
};

export default App;
