const userRouter = require("express").Router();
const userController = require("../controllers/userController");

//Route to create a new user
userRouter.post("/", userController.createUser);

module.exports = userRouter;
