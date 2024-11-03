require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
	user: process.env.DEV_USERNAME,
	password: process.env.DEV_PASSWORD,
	host: process.env.DEV_HOST,
	port: process.env.DEV_PORT,
	database: process.env.DEV_DATABASE,
});

module.exports = pool;
