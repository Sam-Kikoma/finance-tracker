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
//User transactions
userRouter.get("/transactions", authorization, userController.userTransactions);
userRouter.post("/newTransaction", authorization, userController.createTransaction);
userRouter.put("/updateTransaction/:id", authorization, userController.updateTransaction);
userRouter.delete("/deleteTransaction/:id", authorization, userController.deleteTransaction);
//Get User budgets
userRouter.get("/budgets", authorization, userController.userBudgets);
userRouter.post("/newBudget", authorization, userController.createBudget);
userRouter.put("/updateBudget/:id", authorization, userController.updateBudget);
userRouter.delete("/deleteBudget/:id", authorization, userController.deleteBudget);
module.exports = userRouter;
