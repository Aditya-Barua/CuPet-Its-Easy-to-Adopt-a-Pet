const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Blog", BlogSchema);
