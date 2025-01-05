const express = require("express");
const { addVet, getNearbyVets } = require("../Controller/vetController");

const router = express.Router();

router.post("/add", addVet);
router.get("/nearby", getNearbyVets);

module.exports = router;
