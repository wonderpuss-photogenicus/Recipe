const express = require("express");
const routerUsers = express.Router();
const databaseController = require("../controllers/databaseController");

// // Getting one user
// router.get("/:id", databaseController.findUserById, databaseController.getUser, (req, res) =>
//   res.status(200).json(res.user)
// );


routerUsers.post("/create", databaseController.createUser, (req, res) =>{
  console.log('inside of create router')
  return res.status(200).send("Send to their page")
});

//authenticates user on local db
routerUsers.post("/login", databaseController.authenticateUser);


module.exports = routerUsers;


// routerUsers.get('/', googleController.login); 

// routerUsers.get(
//   "/Oauth",
//   googleController.login,
//   googleController.getCode,
//   googleController.retrieveToken,
//   googleController.verifyUser,
//   (req, res, err) => {
//     // console.log('req body: ', req);
//     console.log("inside googleOauth router");
//     // console.log("res.locals.user is ", res.locals.user);
//     return res.status(200).send('Send to their page');
//   }
// );