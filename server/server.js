require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const petRouter = require("./Routes/PetRoute");
const AdoptFormRoute = require("./Routes/AdoptFormRoute");
const AdminRoute = require("./Routes/AdminRoute");
const BlogRoute = require("./Routes/BlogRoute");
const vetRoutes = require("./Routes/vetRoutes");
const Donation = require("./Model/Donation");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pet, Adoption, and Admin Routes
app.use(petRouter);
app.use("/form", AdoptFormRoute);
app.use("/admin", AdminRoute);

app.use("/blog", BlogRoute);
app.use("/vets", vetRoutes);

// Donation Endpoint
app.post("/donate", async (req, res) => {
	const { name, email, amount, paymentMethod } = req.body;

	if (!name || !email || !amount || !paymentMethod) {
		return res
			.status(400)
			.json({ message: "Please fill in all required fields." });
	}

	try {
		const newDonation = new Donation({
			name,
			email,
			amount,
			paymentMethod,
		});
		await newDonation.save();
		res.status(200).json({
			message:
				"Donation successfully received. Thank you for your contribution!",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Something went wrong. Please try again later.",
		});
	}
});

const events = [
	{
		id: 1,
		title: "Pet Adoption Drive",
		description: "Adoption event happening at the park.",
		date: "2025-02-10",
	},
	{
		id: 2,
		title: "Volunteer Meet-up",
		description:
			"Come join us to discuss upcoming events and volunteer opportunities.",
		date: "2025-02-20",
	},
];

let blogs = [
	{
		id: 1,
		title: "How to adopt a pet",
		summary: "An informative guide on how to adopt pets",
		content: "Content for the first blog post",
	},
	{
		id: 2,
		title: "The benefits of adopting pets",
		summary: "Why adopting pets is great",
		content: "Content for the second blog post",
	},
];

// Routes for Events Calendar
app.get("/api/events", (req, res) => {
	res.json(events);
});

// Routes for Blogs
app.get("/api/blogs", (req, res) => {
	res.json(blogs);
});

// Endpoint to Post a New Blog
app.post("/api/blogs", (req, res) => {
	const { title, content, summary } = req.body;
	if (!title || !content || !summary) {
		return res.status(400).json({ message: "Please fill in all fields." });
	}

	const newBlog = {
		id: blogs.length + 1,
		title,
		content,
		summary,
	};

	blogs.push(newBlog);
	res.json(newBlog);
});

// Connect to MongoDB
mongoose
	.connect(process.env.mongooseURL)
	.then(() => {
		console.log("Connected to DB");
		const PORT = 4000;
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
