const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
	{ timestamps: true }
);

vetSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Vet", vetSchema);
