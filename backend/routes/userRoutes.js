const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validInfo");

//Route to create a new user
userRouter.post("/register", validInfo, userController.createUser);
// Login
userRouter.post("/login", validInfo, userController.loginUser);
//Verification
userRouter.get("/isVerified", authorization, userController.isVerified);
//Dashboard
userRouter.get("/dashboard", authorization, userController.userDashboard);
//Get User transactions
userRouter.get("/transactions", authorization, userController.userTransactions);
//Get User budgets
userRouter.get("/budgets", authorization, userController.userBudgets);
module.exports = userRouter;
