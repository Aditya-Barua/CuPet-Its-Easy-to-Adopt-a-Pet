const Blog = require("../Model/Blog");

const blogPost = async (req, res) => {
	try {
		const { title, content } = req.body;

		const blog = await Blog.create({
			title,
			content,
		});

		res.status(200).json(blog);
	} catch (error) {

		res.status(500).json({ error: error.message });
	}
};

const getAllBlogs = async (req, res) => {
	try {
		const data = await Blog.find().sort({ createdAt: -1 });
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { blogPost, getAllBlogs };
