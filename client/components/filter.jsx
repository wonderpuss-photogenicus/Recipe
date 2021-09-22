import React from 'react';
import axios from 'axios';
const Filter = (props) => {
  //a poorly written function to grab user input data and send it to the backend to then call api
  function getRecipe() {
    //just grabbing some of the userinput here!
    const cuisineSelection = document.querySelector('#cuisineSelect').value;
    let ingredientSelection = document.querySelector('#ingredientSelect').value;
    const isPantryOnly = document.querySelector('#pantrySelect').checked;
    const countSelection = document.querySelector('#countSelect').value;
    //here we are resetting the ingredient selection to be just the pantryItems in state as a comma-separated string, if the 'pantry-only items' button is selected
    let ingredientString = '';
    if (isPantryOnly) {
      props.pantryItems.forEach((el) => {
        ingredientString += `${el},`;
      });
      ingredientSelection = ingredientString;
    }
    axios({
      url: '/recipes/find',
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      data: {
        cuisine: cuisineSelection,
        ingredients: ingredientSelection,
        numberOfResults: countSelection,
      },
      
    }).then((data) => {
      console.log(data);
      //this will hold all of the objects in the correct format so that the front-end can add them to the state to be rendered
      const newObjArr = []; 
      //this is what the data from the backend looks like
      //{titleArr, ingredientResults, directionResults, imgArr}
      //directionResults -> {id, summary, title}
      //ingredientResults -> {ingredients: [{name,image,amount:{metric:{value, unit}, us:{value, unit},}}]}
      //titleArr, imgArr -> [string1, string2, string3...],
      //an example response down below at bottom of page
      data.data.titleArr.forEach((el, idx) => {
        //here we create a new object for each title
        let directions;
        if (data.data.newDirectionResults[idx]) {
          //checking if directions for that title exist, cause accessing undefined.summary throws typeError
          directions = data.data.newDirectionResults[idx].summary;
        } else directions = '';
        const newObj = {
          name: el,
          ingredients: data.data.newIngredientResults[idx].map((el) => el.name),
          img: data.data.imageArr[idx],
          directions,
        };
        newObjArr.push(newObj);
      });
      props.addMeal(newObjArr);
    });
  }
  //there are lots and lots of cuisines the api can recognize! docs here: https://spoonacular.com/food-api/docs#Cuisines
  return (
    <div id='filter'>
      <h2>Find New Meals!</h2>
      <label htmlFor=''>
        Cuisine
        <select type='select' id='cuisineSelect'>
          <option value='italian'>italian</option>
          <option value='african'>african</option>
          <option value='japanese'>japanese</option>
          <option value='thai'>thai</option>
          <option value='cajun'>cajun</option>
        </select>
      </label>
      <label htmlFor=''>
        Ingredients
        <select type='select' id='ingredientSelect'>
          <option value='potatoes'>potatoes</option>
          <option value='bread'>bread</option>
          <option value='eggs'>eggs</option>
        </select>
      </label>
      <label htmlFor='pantryOnly'>
        Items in Pantry Only!<input type='checkbox' id='pantrySelect'></input>
      </label>
      <label htmlFor='countSelect'>
        Number of results:
        <select id='countSelect'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </label>
      <button onClick={getRecipe}>Submit</button>
    </div>
  );
  ``;
};

export default Filter;

// {"titleArr":["Homemade Thin Crust Pizza + Pesto + Potato"],"imageArr":["https://spoonacular.com/recipeImages/647124-312x231.jpg"],"newIngredientResults":[[{"name":"almonds","image":"almonds.jpg","amount":{"metric":{"value":35.75,"unit":"g"},"us":{"value":0.25,"unit":"cup"}}},{"name":"basil","image":"fresh-basil.jpg","amount":{"metric":{"value":48,"unit":"g"},"us":{"value":2,"unit":"cups"}}},{"name":"extra virgin olive oil","image":"olive-oil.jpg","amount":{"metric":{"value":162,"unit":"ml"},"us":{"value":0.75,"unit":"cup"}}},{"name":"flour","image":"flour.png","amount":{"metric":{"value":437.5,"unit":"g"},"us":{"value":3.5,"unit":"cup"}}},{"name":"kosher salt","image":"salt.jpg","amount":{"metric":{"value":2,"unit":"tsps"},"us":{"value":2,"unit":"tsps"}}},{"name":"manchego cheese","image":"manchego.jpg","amount":{"metric":{"value":84.75,"unit":"g"},"us":{"value":0.75,"unit":"cup"}}},{"name":"olive oil","image":"olive-oil.jpg","amount":{"metric":{"value":2,"unit":"Tbsps"},"us":{"value":2,"unit":"Tbsps"}}},{"name":"bell pepper","image":"yellow-bell-pepper.jpg","amount":{"metric":{"value":6,"unit":"servings"},"us":{"value":6,"unit":"servings"}}},{"name":"potato","image":"potatoes-yukon-gold.png","amount":{"metric":{"value":1,"unit":"medium"},"us":{"value":1,"unit":"medium"}}},{"name":"salt","image":"salt.jpg","amount":{"metric":{"value":6,"unit":"servings"},"us":{"value":6,"unit":"servings"}}},{"name":"sugar","image":"sugar-in-bowl.png","amount":{"metric":{"value":1,"unit":"tsp"},"us":{"value":1,"unit":"tsp"}}},{"name":"water","image":"water.png","amount":{"metric":{"value":354.882,"unit":"ml"},"us":{"value":1.5,"unit":"cup"}}},{"name":"yeast","image":"yeast-granules.jpg","amount":{"metric":{"value":2.25,"unit":"tsps"},"us":{"value":2.25,"unit":"tsps"}}}]],"newDirectionResults":[]}
