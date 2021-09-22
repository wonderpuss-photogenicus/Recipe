const mongoose = require('mongoose');
const MONG_URI = "mongodb+srv://recipe:xEdjACEJRAqf9f8L@cluster0.vd3fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MONG_URI, {
  useUnifiedTopology: true,
  dbName:'user'
})
.then(()=> console.log('Connected to Mongo DB'))
.catch((err)=> console.log(err))

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pantry: Array,
  shoppingList:Array,
  favoriteList: Array
})

const recipeSchema = new mongoose.Schema({
  id: String,
  name: String,
  cuisine: String,
  instructions: String,
  imgURL: String,
  ingredients: Array,
  measures: Array
})

const ingredientsSchema = new mongoose.Schema({
  name: String,
})

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = {User, Recipe, Ingredients}

