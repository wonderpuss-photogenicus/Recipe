const path = require("path");
const express = require("express");
const usersRouter = require("./routers/users");
const recipeRouter = require("./routers/recipes.js");

// const Model = require('./models/userModel.js');
const app = express();

// const mongoose = require('mongoose'); dont need because we are using cloud database and setting it up inside the userModel
const PORT = 3000;

//--m handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serves base index.html file that react app hangs off of
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../index.html"))
);

//handles styles for our produced stylesheets and for the ReactGridLayout which has its own style sheets
app.use(
  "/client/stylesheets",
  express.static(path.resolve(__dirname, "../client", "stylesheets"))
);
app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "../node_modules"))
);

app.use("/users", usersRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).  send("This is not the recipe you're looking for...")
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
