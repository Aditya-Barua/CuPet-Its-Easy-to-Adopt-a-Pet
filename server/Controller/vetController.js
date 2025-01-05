const Vet = require("../Model/vetModel");

exports.addVet = async (req, res) => {
	try {
		const { name, phone, location } = req.body;

		if (!name || !phone || !location) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const vet = await Vet.create({ name, phone, location });

		res.status(201).json({ message: "Vet added successfully", vet });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

exports.getNearbyVets = async (req, res) => {
	const { lat, lng, radius } = req.query;

	try {
		if (!lat || !lng || !radius) {
			return res.status(400).json({
				message: "Latitude, longitude, and radius are required",
			});
		}

		const parsedLat = parseFloat(lat);
		const parsedLng = parseFloat(lng);
		const parsedRadius = parseFloat(radius);

		if (isNaN(parsedLat) || isNaN(parsedLng) || isNaN(parsedRadius)) {
			return res.status(400).json({
				message: "Invalid latitude, longitude, or radius values",
			});
		}

		const vets = await Vet.find({
			location: {
				$geoWithin: {
					$centerSphere: [
						[parsedLng, parsedLat],
						parsedRadius / 3963.2,
					], 
				},
			},
		});

		res.status(200).json(vets);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
