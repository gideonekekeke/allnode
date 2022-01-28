const userModel = require("./UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
		);
	},
});

const upload = multer({ storage: storage }).single("image");

// getting all users
router.get("/users", async (req, res) => {
	try {
		const getUsers = await userModel.find();

		res.status(200).json({
			message: "user found",
			totalUser: getUsers.length,
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

//getting user by id

router.get("/user/;id", async (req, res) => {
	try {
		const getUsers = await userModel.findById(req.params.id, req.body);

		res.status(200).json({
			message: "user found",
			totalUser: getUsers.length,
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

//register a user

router.post("/register", upload, async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const saltPassword = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, saltPassword);

		const saveUser = await userModel.create({
			userName,
			email,
			password: passwordHash,
			avatar: req.file.path,
		});
		res.status(200).json({
			message: "uploaded successfully",
			data: saveUser,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

// verify user token

const verification = (req, res, next) => {
	try {
		const authToken = req.headers.authorization;

		if (authToken) {
			const token = authToken.split(" ")[2];

			jwt.verify(token, "ThiSiSthEsEcREtEkEyee", (error, payload) => {
				if (error) {
					res.status(400).json({ message: "please check your token" });
				} else {
					req.user = payload;

					next();
				}
			});
		} else {
			res.status(400).json({ message: "something is wrong with this token" });
		}
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
};

// signin a user

router.post("/signin", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			const checkPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);

			if (checkPassword) {
				const { password, ...info } = user._doc;

				const token = jwt.sign(
					{
						id: user._id,
						email: user.email,
						userName: user.userName,
						isAdmin: user.isAdmin,
					},
					"ThiSiSthEsEcREtEkEyee",
					{ expiresIn: "1d" },
				);

				res.status(200).json({
					message: `welcome back ${user.userName}`,
					data: { ...info, token },
				});
			} else {
				res.status(404).json({ message: "password incorrect" });
			}
		} else {
			res.status(404).json({ message: "user not found" });
		}
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.patch("/user/:id", verification, async (req, res) => {
	try {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			const user = await userModel.findByIdAndUpdate(
				req.params.id,
				{
					userName: req.body.userName,
				},
				{ new: true },
			);
			res.status(200).json({
				message: "updated successfully",

				data: user,
			});
		} else {
			res.status(400).json("error in token");
		}
	} catch (err) {
		res.status(404).json({ message: "an error occurred" });
	}
});

module.exports = router;
