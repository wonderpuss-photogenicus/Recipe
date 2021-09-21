const models = require('../models/userModel.js');
//none of this is really used in the production version...
const recipeController = {};
recipeController.getRecipe = (req, res, next) => {
  next();
};
recipeController.findMeals = (req, res, next) => {
  //fetch api data and have a way to filter out data
  //take in pantry ingredients in request body and prioritize results based on pantry ingredients
  //filter based on cuisines and input ingredients from filter pop-up
};

/* Spoonacular Docs: https://spoonacular.com/food-api/docs */
//example of fetch request from frontend to API:
// componentDidMount() {
//     //additional params and api key needed at end of fetch req
//     fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=<ingredientStringInput>") //ingredientStringInput
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result.items
//           });
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }

module.exports = recipeController;
