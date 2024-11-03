const bcrypt = require("bcrypt");
const pool = require("../db");

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
		res.status(201).json(newUser.rows[0]);
		// 5.Generate JWT token
	} catch (err) {
		console.error(err.message);
	}
};
