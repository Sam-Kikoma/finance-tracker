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
		console.error(err.message);
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
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

exports.isVerified = async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

exports.userDashboard = async (req, res) => {
	try {
		// res.json(req.user);
		const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
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
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
//Create transaction
//Update transaction
//Delete a transaction

//Budget Controllers
//Create budget
//Update budget
//Delete budget
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
