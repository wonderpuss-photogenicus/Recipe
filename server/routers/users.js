const express = require("express");
const routerUsers = express.Router();
const databaseController = require("../controllers/databaseController");
const googleController = require("../controllers/googleController");

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
routerUsers.post("/create", databaseController.createUser, (req, res) =>
  res.status(200).json(res.newUser)
);

//authenticates user on local db
routerUsers.post("/login", databaseController.authenticateUser);

routerUsers.get(
  "/Oauth",
  googleController.login,
  googleController.getCode,
  googleController.retrieveToken,
  googleController.verifyUser,
  (req, res, err) => {
    // console.log('req body: ', req);
    console.log("inside googleOauth .get/");
    console.log("res.locals.user is ", res.locals.user);
    return res.status(200).json({ body: "hello" });
  }
);

module.exports = routerUsers;
