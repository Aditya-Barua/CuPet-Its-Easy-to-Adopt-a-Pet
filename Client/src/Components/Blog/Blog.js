import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const fetchBlogs = async () => {
		setLoading(true);
		try {
			const response = await axios.get("http://localhost:4000/blog/all");
			if (response.status === 200) {
				setBlogs(response.data);
			}
			setLoading(false);
		} catch (err) {
			console.log(err);
			setError("Failed to fetch blogs.");
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setMessage("");
		try {
			const response = await axios.post(
				"http://localhost:4000/blog/post",
				{
					title,
					content,
				}
			);
			setMessage("Blog added successfully!");
			setBlogs([response.data, ...blogs]); // Add new blog to the top
			setTitle("");
			setContent("");
			setLoading(false);
		} catch (err) {
			setError("Failed to add the blog. Please try again.");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className="blog-page">
			<h2 className="custom-form-heading">Blog Management</h2>

			{/* Blog Form */}
			<form onSubmit={handleSubmit} className="blog-form">
				<div className="blog-form-group">
					<label className="blog-form-label" htmlFor="title">
						Blog Title
					</label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="blog-form-input"
						placeholder="Enter blog title"
						required
					/>
				</div>
				<div className="blog-form-group">
					<label className="blog-form-label" htmlFor="content">
						Blog Content
					</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="blog-form-textarea"
						placeholder="Enter blog content"
						rows="4"
						required
					/>
				</div>
				<button
					type="submit"
					className="blog-form-button"
					disabled={loading}
				>
					{loading ? "Posting..." : "Post Blog"}
				</button>
			</form>

			{/* Messages */}
			{message && (
				<p style={{ color: "green", marginTop: "10px" }}>{message}</p>
			)}
			{error && (
				<p style={{ color: "red", marginTop: "10px" }}>{error}</p>
			)}

			{/* Blog List */}
			<div className="blog-list">
				{loading && <p>Loading blogs...</p>}
				{!loading && blogs.length === 0 && (
					<p>No blogs available yet.</p>
				)}
				{!loading &&
					blogs.map((blog) => (
						<div key={blog._id} className="blog-row">
							<div className="blog-content">
								<h3 className="blog-title">{blog.title}</h3>
								<p className="blog-body">{blog.content}</p>
								<p className="blog-date">
									Posted on:{" "}
									{new Date(
										blog.createdAt
									).toLocaleDateString()}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Blog;
