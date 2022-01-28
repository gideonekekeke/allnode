const express = require("express");
const mongoose = require("mongoose");
const port = 9090;
const url = "mongodb://localhost/shopDB";
const cors = require("cors");
const path = require("path");

const app = express();

mongoose.connect(url).then(() => {
	console.log("database is connected");
});
app.use(express.json());
app.use(cors());

app.use("/", require("./router"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
