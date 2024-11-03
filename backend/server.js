const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use the user routes for /api/users endpoints
app.use("/api/users", userRouter);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
