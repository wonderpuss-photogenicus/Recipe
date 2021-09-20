const express = require('express');
const recipeController = require('../controllers/recipeController.js');
const axios = require('axios');
const recipeRouter = express.Router();
recipeRouter.post('/find', (req, res) => {
  const titleArr = [];
  const idArr = [];
  const imageArr = [];

  if (req.body.cuisine && req.body.ingredients) {
    axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=895013782e374d7485078d4c5875ca51&cuisine=${req.body.cuisine}&includeIngredients=${req.body.ingredients}`
    )
      //   .then((data) => {
      //     console.log('something');
      //     return data.json();
      //   })
      .then(async (post) => {
        // console.log(post.data);

        for (let i = 0; i < req.body.numberOfResults; i++) {
          const { title, id, image } = post.data.results[i];
          titleArr.push(title);
          idArr.push(id);
          imageArr.push(image);
        }
        const ingredientResults = await Promise.all(
          idArr.map((el) =>
            axios(
              `https://api.spoonacular.com/recipes/${el}/ingredientWidget.json?apiKey=895013782e374d7485078d4c5875ca51`
            )
          )
        );
        const directionResults = await Promise.all(
          idArr.map((el) => {
            axios(
              `https://api.spoonacular.com/recipes/${el}/summary?apiKey=895013782e374d7485078d4c5875ca51`
            );
          })
        );
        if (ingredientResults[0]) {
          newIngredientResults = ingredientResults.map(
            (el) => el.data.ingredients
          );
        } else newIngredientResults = [];
        if (directionResults[0]) {
          newDirectionResults = directionResults.map((el) => el.data.summary);
        } else newDirectionResults = [];
        return { newIngredientResults, newDirectionResults };
        //for loop to iterate thru first 2 results and limit responses to directions. from those first 5 ID titles
        // console.log(ingredientResults, directionResults); //parse JSON object here
      })
      .then((data) => {
        const { newIngredientResults, newDirectionResults } = data;
        res.status(200).send({
          titleArr,
          imageArr,
          newIngredientResults,
          newDirectionResults,
        });
      });
  } else {
    return res.status(400).send('Could not find recipe.');
  }
});

module.exports = recipeRouter;
//example fetch request that returns JSON string with valid API key:
//https://api.spoonacular.com/recipes/716429/information?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a&includeNutrition=true
//https://api.spoonacular.com/recipes/findByIngredients?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a&ingredients='pasta'
//this last url returns a huuuuuge JSON object with plenty of relevant info inside the object!
//front end is sending req.body -> [cuisine, ingredient];
//api sends back -> {results: [{title, id, image}]}
//make another get request using id to get ingredients/directions
//front end response needs this -> [{√name, √ingredients, √directions, √imageURL}]
//GET https://api.spoonacular.com/recipes/{id}/ingredientWidget.json?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a
//{ingredients: [{name,image,amount:{metric:{value, unit}, us:{value, unit},}}]}
//GET https://api.spoonacular.com/recipes/{id}/summary?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a
// {id, summary, title}
// {ingredients: [{name,image,amount:{metric:{value, unit}, us:{value, unit},}}]}
