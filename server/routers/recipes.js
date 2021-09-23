const express = require("express");
const recipeController = require("../controllers/recipeController.js");
const axios = require("axios");
const recipeRouter = express.Router();

recipeRouter.get("/find", recipeController.getRecipe, (req, res) => {
  console.log("filtered recipes");
  res.json(res.locals.recipes);
});

module.exports = recipeRouter;
// previous stuff

// recipeRouter.get('/:recipe', recipeController.getRecipe, (req, res) => {
//     if (res.params.recipe) {
//         fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a&cuisine=${req.body.cuisine}&includeIngredients=${req.body.ingredients}`)
//         .then(data => {
//         return data.json();
//         })
//         .then(post => {
//             //create obj here that will return the data we need
//         console.log(/*serve recipe data to the front end*/); //parse JSON object here
//         });
//         res.status(200).json({...res.params.recipe});}
//     else {return res.status(400).send('Could not find recipe.');}
//   });

// recipeRouter.post('/find', (req, res) => {
//   const titleArr = [];
//   const idArr = [];
//   const imageArr = [];

//   if (req.body.cuisine && req.body.ingredients) {
//     //apikey limited to 150 calls per day (3 calls per fetch request (1 for title/image, 1 for directions, 1 for ingredients))
//     axios(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=895013782e374d7485078d4c5875ca51&cuisine=${req.body.cuisine}&includeIngredients=${req.body.ingredients}&addRecipeInformation=true`
//     )
//       .then(async (post) => {
//         for (let i = 0; i < req.body.numberOfResults; i++) {
//           const { title, id, image } = post.data.results[i]; //destructuring data from api returned data (need to grab directions/ingredients from further api calls)
//           titleArr.push(title); //all must be in array because we are gonna do a promise.all to fetch all at the same time, and front end is expecting arrays
//           idArr.push(id);
//           imageArr.push(image);
//         }
//         const ingredientResults = await Promise.all(
//           idArr.map((el) =>
//             axios(
//               `https://api.spoonacular.com/recipes/${el}/ingredientWidget.json?apiKey=895013782e374d7485078d4c5875ca51`
//             )
//           )
//         );
//         const directionResults = await Promise.all(
//           idArr.map((el) => {
//             axios(
//               `https://api.spoonacular.com/recipes/${el}/summary?apiKey=895013782e374d7485078d4c5875ca51`
//             );
//           })
//         );
//         //below we are checking that ingredient/direction results exist before mapping (if they don't it will replace with an empty type of the appropriate data type )
//         newIngredientResults = ingredientResults.map((el) => {
//           if (el) {
//             return el.data.ingredients;
//           } else return [];
//         });
//         newDirectionResults = directionResults.map((el) => {
//           if (el) {
//             return el.data.summary;
//           } else {
//             return '';
//           }
//         });
//         return { newIngredientResults, newDirectionResults };
//       })
//       .then((data) => {
//         const { newIngredientResults, newDirectionResults } = data;
//         res.status(200).send({
//           titleArr,
//           imageArr,
//           newIngredientResults,
//           newDirectionResults,
//         });
//       });
//   } else {
//     return res.status(400).send('Could not find recipe.');
//   }
// });

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
