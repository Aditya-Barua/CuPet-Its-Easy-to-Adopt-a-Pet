// server.js or app.js (Backend Example)
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // For handling CORS issues (if needed)
app.use(express.json());

// Sample events data
const events = [
  { id: 1, title: "Adopt a Pet Day", date: "2025-01-10", description: "Join us for a fun-filled day of adopting pets." },
  { id: 2, title: "Pet Health Workshop", date: "2025-01-15", description: "Learn about keeping your pet healthy." },
];

// API route to get events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
