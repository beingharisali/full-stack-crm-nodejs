require("dotenv").config();
const connectDB = require("./database/connect.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = requrie ("cors");
connectDB();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		msg: "API WORKING",
	});
});

app.listen(port, () => {
	console.log(`Application is up and listening on port ${port}`);
});
