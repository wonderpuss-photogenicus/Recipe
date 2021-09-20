const express = require('express');
const app = express();
const mongoose = require('mongoose');

const recipeController= require('./controllers/recipeController');

const PORT = 3000;

//api link to spoonacular: https://api.spoonacular.com/recipes/{id}/information
//api docs for spoonaculat: https://spoonacular.com/food-api/docs

mongoose.connect('mongodb+srv://odonnelm1:<3mongooses>@cluster0.ywbh1.mongodb.net/recipeDB?retryWrites=true&w=majority'); //not 100% sure if this should be connected to database or API link
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const recipeRouter = express.Router(); 
app.use('/recipe', recipeRouter); //connects to overall recipe app - named Recipe-Dev here for now

recipeRouter.get('/:recipe', recipeController.getRecipe, (req, res) => {
    if (res.locals.recipe) {return res.status(200).json({...res.locals.recipe});} 
    else {return res.status(400).send('Could not find recipe.');}
  });