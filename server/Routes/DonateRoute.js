const express = require('express');
const router = express.Router();
const Donation = require('../Model/Donation'); 

// POST route to handle donations
router.post('/donate', async (req, res) => {
  const { name, email, amount, paymentMethod } = req.body;

  // Validate inputs
  if (!name || !email || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    // Create a new donation record in MongoDB
    const donation = new Donation({
      name,
      email,
      amount,
      paymentMethod,
    });

    // Save the donation to the database
    await donation.save();

    // Respond with a success message
    res.status(201).json({ message: 'Thank you for your donation!' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
