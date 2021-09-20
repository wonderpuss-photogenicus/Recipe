const path = require('path');
const express = require('express');
const recipeController= require('./controllers/recipeController');

const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

//define route handlers
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the recipe you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server

//api link to spoonacular: https://api.spoonacular.com/recipes/{id}/information
//api docs for spoonaculat: https://spoonacular.com/food-api/docs

mongoose.connect('mongodb+srv://odonnelm1:<3mongooses>@cluster0.ywbh1.mongodb.net/recipeDB?retryWrites=true&w=majority'); //not 100% sure if this should be connected to database or API link
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const recipeRouter = express.Router(); 
app.use('/recipe', recipeRouter); //connects to overall recipe app - named Recipe-Dev here for now

recipeRouter.get('/:recipe', recipeController.getRecipe, (req, res) => {
    if (res.locals.recipe) {return res.status(200).json({...res.locals.recipe});} 
    else {return res.status(400).send('Could not find recipe.');}
  });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
