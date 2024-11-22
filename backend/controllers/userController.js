const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

// User controllers
exports.createUser = async (req, res) => {
	try {
		// 1.Destructure request
		const { name, email, password } = req.body;
		// 2.Check if user exists
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
		if (user.rows.length !== 0) {
			return res.status(401).send("User already exists");
		}
		// 3.Bcrypt password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(password, salt);
		// 4.Add user to db
		const newUser = await pool.query(
			"INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
			[name, email, bcryptPassword]
		);
		// 5.Generate JWT token
		const token = jwtGenerator(newUser.rows[0].user_id);
		res.status(201).json({ user: newUser.rows[0], token });
	} catch (err) {
		res.status(500).send("Server error");
	}
};
exports.loginUser = async (req, res) => {
	try {
		// 1.Destructure request
		const { email, password } = req.body;
		// 2.Check if user exists
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
		if (user.rows.length === 0) {
			return res.status(401).send("User does not exist");
		}
		// 3.Check if sent password is same to db password
		const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
		if (!validPassword) {
			return res.status(401).json("Password or email is incorrect");
		}
		// 4.Assign jwt token
		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ token });
	} catch (err) {
		res.status(500).send("Server error");
	}
};

exports.isVerified = async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		res.status(500).send("Server error");
	}
};

exports.userDashboard = async (req, res) => {
	try {
		const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
		res.json(user.rows[0]);
	} catch (err) {
		res.status(500).send("Server error");
	}
};
// Transactions controllers
exports.userTransactions = async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT * FROM users AS u LEFT JOIN transactions AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
			[req.user]
		);
		res.json(user.rows);
		console.table(user.rows);
	} catch (err) {
		res.status(500).send("Server error");
	}
};
//Create transaction
exports.createTransaction = async (req, res) => {
	try {
		const { amount, category, transType } = req.body;
		const newTransaction = await pool.query(
			"INSERT INTO transactions (amount, category, transaction_type, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
			[amount, category, transType, req.user]
		);
		res.status(201).json({ message: "New transaction was added", transaction: newTransaction.rows[0] });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
//Update transaction
exports.updateTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const { amount, category, transType } = req.body;
		const updatedTransaction = await pool.query(
			`UPDATE transactions 
             SET amount = $1, category = $2, transaction_type = $3 
             WHERE id = $4 AND user_id = $5 
             RETURNING *`,
			[amount, category, transType, id, req.user]
		);
		res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction.rows[0] });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
//Delete a transaction
exports.deleteTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await pool.query("SELECT * FROM transactions WHERE id = $1 AND user_id = $2", [id, req.user]);
		if (transaction.rows.length === 0) {
			return res.status(404).json({ message: "Transaction not found or unauthorized" });
		}
		await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
		res.status(200).json({ message: "Transaction deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

//Budget Controllers
//Create budget
exports.createBudget = async (req, res) => {
	try {
		const { amount, category, endDate } = req.body;
		const newBudget = await pool.query(
			"INSERT INTO budgets (amount, category, end_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
			[amount, category, endDate, req.user]
		);
		res.status(201).json({ message: "New budget was added", budget: newBudget.rows[0] });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
//Update budget
exports.updateBudget = async (req, res) => {
	try {
		const { id } = req.params;
		const { amount, category, endDate } = req.body;
		const updatedBudget = await pool.query(
			"UPDATE budgets SET amount = $1, category = $2, end_date = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
			[amount, category, endDate, id, req.user]
		);
		res.status(200).json({ message: "Budget updated successfully", budget: updatedBudget.rows[0] });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
//Delete budget
exports.deleteBudget = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedBudget = await pool.query("DELETE FROM budgets WHERE id = $1 AND user_id = $2", [id, req.user]);
		res.status(200).json({ message: "Budget deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
// Get budgets
exports.userBudgets = async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT * FROM users AS u LEFT JOIN budgets AS b ON u.user_id = b.user_id WHERE u.user_id = $1",
			[req.user]
		);
		res.json(user.rows);
		console.table(user.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

//
