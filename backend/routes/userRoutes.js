const userRouter = require("express").Router();
const userController = require("../controllers/userController");

//Route to create a new user
userRouter.post("/register", userController.createUser);
// Login
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
