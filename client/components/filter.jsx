import React from 'react';

const Filter = (props) => {
  function sendQueryParams() {
    //logic to post request to given route
    const cuisineSelection = document.querySelector('#cuisineSelect').value;
    const ingredientSelection =
      document.querySelector('#ingredientSelect').value;
    const isPantryOnly = document.querySelector('#pantrySelect').checked;
    const countSelection = document.querySelector('#countSelect').value;

    props.addMeal(countSelection);

    console.log(cuisineSelection);
    console.log(ingredientSelection);
    console.log(isPantryOnly);
    console.log(countSelection);
  }
  return (
    <div id='filter'>
      <label htmlFor=''>
        Cuisine
        <select type='select' id='cuisineSelect'>
          <option value='italian'>italian</option>
          <option value='italian but different'>italian but different</option>
          <option value='italian but even more different'>
            sitalian but even more different
          </option>
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
      <button onClick={sendQueryParams}>Submit</button>
    </div>
  );
  ``;
};

export default Filter;
