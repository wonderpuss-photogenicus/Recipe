const path = require("path");
const express = require("express");
const session = require("express-session");
const usersRouter = require("./routers/users");
const recipeRouter = require("./routers/recipes.js");
const googleController = require('./controllers/googleController');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('286216419697-fiuupsg66161d7aqejg16h3qv088mn5j.apps.googleusercontent.com')
const { User } = require("./models/Models");
// const Model = require('./models/userModel.js');
const app = express();
const PORT = 3000;

//--m handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// app.get('/:code', googleController.accessQueryString, (req, res, err) => {
//   console.log('inside get code router');
// });

//serves base index.html file that react app hangs off of
app.get("/", (req, res) =>{
  res.sendFile(path.resolve(__dirname, "../index.html"))});

app.get("/session",googleController.session,  (req, res) =>{
  console.log('inside googleSession', res.locals.user);
  if(res.locals.user){ res.send("Send to their page")};
});



//handles styles for our produced stylesheets and for the ReactGridLayout which has its own style sheets
app.use(
  "/client/stylesheets",
  express.static(path.resolve(__dirname, "../client", "stylesheets"))
);

app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "../node_modules"))
);

app.post("/api/v1/auth/google", async (req, res) => {
  console.log("Oauth is hereeeeeeeeee")
  console.log('req.body',req.body)
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  // console.log(ticket.getPaylaod());
  const { name, email, picture } = ticket.getPayload();    
  const user = await User.findOneAndUpdate({ username: email, password: "test"}, {upsert: true})
  req.session.userId = user.username;
  res.status(200).send("Send to their page")
});



app.use("/users", usersRouter);
app.use('/recipes', recipeRouter);

//used to save all data from API into the database
// app.get(
//   '/test',
//   recipeController.getAllRecipesToDB,
//   (req,res)=>{
//     console.log('succesfully got the data')
//     res.send('yay')
//   }
// )

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the recipe you're looking for...")
);

app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT} :)`);
});

module.exports = app;
