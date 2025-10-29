require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connect.js");
const cors = require("cors");
const port = process.env.PORT || 5000;
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
