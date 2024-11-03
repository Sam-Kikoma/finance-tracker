const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
