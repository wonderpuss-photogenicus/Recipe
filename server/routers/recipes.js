const express = require("express");
const recipeController = require("../controllers/recipeController.js");

const recipeRouter = express.Router();

//
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

module.exports = recipeRouter;
