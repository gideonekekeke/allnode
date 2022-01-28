const mongoose = require("mongoose");

const mySchema = mongoose.Schema(
	{
		userName: String,

		email: {
			type: String,
			unique: true,
		},

		password: String,
		avatar: String,
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamp: true },
);

module.exports = mongoose.model("userModel", mySchema);
