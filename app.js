require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user");
const propertyRoutes = require("./routes/property");
const agentRoutes = require("./routes/agent");
const transactionRoutes = require("./routes/transaction"); 
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", propertyRoutes);
app.use("/api/v1", agentRoutes);
app.use("/api/v1", transactionRoutes);


const connectDB = require("./database/connect");
connectDB();

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		msg: "API WORKING",
	});
});

app.listen(port, () => {
	console.log(`Application is up and listening on port ${port}`);
});
