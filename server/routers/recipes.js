
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

//example fetch request that returns JSON string with valid API key: 
//https://api.spoonacular.com/recipes/716429/information?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a&includeNutrition=true
//https://api.spoonacular.com/recipes/findByIngredients?apiKey=6e3f2dca30e44d3fbd48a3fee49ed05a&ingredients='pasta'
//this last url returns a huuuuuge JSON object with plenty of relevant info inside the object!