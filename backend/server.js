const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h1>We are live</h1>");
});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
