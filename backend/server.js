const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample exhibition data (15+ entries for pagination & search)
const exhibitions = [
  { id: 1, name: "Modern Art Wonders", location: "Bangalore Art Gallery", date: "2025-03-15" },
  { id: 2, name: "Renaissance Revival", location: "Delhi Museum of Art", date: "2025-04-10" },
  { id: 3, name: "Abstract Expressions", location: "Mumbai Art House", date: "2025-05-05" },
  { id: 4, name: "Surrealist Showcase", location: "Chennai Fine Arts", date: "2025-06-20" },
  { id: 5, name: "Street Art Fest", location: "Hyderabad Art District", date: "2025-07-15" },
  { id: 6, name: "Digital Art Expo", location: "Pune Tech Park", date: "2025-08-10" },
  { id: 7, name: "Impressionist Icons", location: "Kolkata Art House", date: "2025-09-05" },
  { id: 8, name: "Futuristic Visions", location: "Goa Art Space", date: "2025-10-18" },
  { id: 9, name: "Classic Sculptures", location: "Jaipur Heritage Museum", date: "2025-11-22" },
  { id: 10, name: "Nature & Art Fusion", location: "Shimla Open Gallery", date: "2025-12-05" },
  { id: 11, name: "AI-Generated Art", location: "Bangalore AI Hub", date: "2026-01-10" },
  { id: 12, name: "Minimalist Showcase", location: "Ahmedabad Art Square", date: "2026-02-18" },
  { id: 13, name: "Tribal & Folk Art", location: "Ranchi Tribal Museum", date: "2026-03-22" },
  { id: 14, name: "Modern Sculptures", location: "Indore Art Arena", date: "2026-04-15" },
  { id: 15, name: "Fantasy & Mythology", location: "Bhubaneswar Culture Center", date: "2026-05-05" },
];

// API route to get exhibitions with **search + pagination**
app.get("/exhibitions", (req, res) => {
  let { page, limit, search } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  search = search ? search.toLowerCase() : "";

  // Filter exhibitions based on search term
  let filteredExhibitions = exhibitions.filter(
    (exhibition) =>
      exhibition.name.toLowerCase().includes(search) ||
      exhibition.location.toLowerCase().includes(search)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredExhibitions.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedExhibitions = filteredExhibitions.slice(startIndex, startIndex + limit);

  res.json({
    totalExhibitions: filteredExhibitions.length,
    currentPage: page,
    totalPages,
    exhibitions: paginatedExhibitions,
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
