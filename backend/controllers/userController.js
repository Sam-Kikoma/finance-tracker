const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

// Create user
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
	}
};
