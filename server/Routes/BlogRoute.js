const express = require("express");
const router = express.Router();
const { blogPost, getAllBlogs } = require("../Controller/BlogController");

router.post("/post", blogPost); 
router.get("/all", getAllBlogs); 
module.exports = router;
