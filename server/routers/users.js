const express = require("express");
const routerUsers = express.Router();
const databaseController = require("../controllers/databaseController");
const googleController = require("../controllers/googleController");

const { OAuth2Client } = require('google-auth-library');
const { User } = require("../models/Models");
const client = new OAuth2Client(process.env.CLIENT_ID)

// // Getting one user
// router.get("/:id", findUserById, databaseController.getUser, (req, res) =>
//   res.status(200).json(res.user)
// );

// Get user middleware
//not used in production version
// async function findUserById(req, res, next) {
//   let user;
//   try {
//     user = await User.findById(req.params.id);
//     if (user === null) {
//       return res.status(404).json({ message: "This user does not exist" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "This user does not exist" });
//   }
//   res.user = user;
//   next();
// }

// // Creating user


routerUsers.post("/create", databaseController.createUser, (req, res) =>{
  console.log('inside of create router')
  // res.status(200).json(res.newUser)
  return res.status(200).send("Send to their page")
});

//authenticates user on local db
routerUsers.post("/login", databaseController.authenticateUser);

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




// googleController.accessQueryString,

module.exports = routerUsers;
