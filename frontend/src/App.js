import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [exhibitions, setExhibitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1);
  const exhibitionsPerPage = 5; // Number of exhibitions per page

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/exhibitions?page=${currentPage}&limit=${exhibitionsPerPage}&search=${searchTerm}`
        );
        const data = await response.json();
        setExhibitions(Array.isArray(data.exhibitions) ? data.exhibitions : []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
        setExhibitions([]);
      }
    };

    fetchExhibitions();
  }, [currentPage, searchTerm]); // Fetch data when page OR search term changes

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary">Art Exhibition Finder</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control w-50 mx-auto mt-3 mb-4"
        placeholder="Search by name or city..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page when searching
        }}
      />

      <h2 className="text-secondary">Upcoming Exhibitions</h2>
      <ul className="list-group w-50 mx-auto">
        {exhibitions.length > 0 ? (
          exhibitions.map((exhibition) => (
            <li key={exhibition.id} className="list-group-item">
              <strong>{exhibition.name}</strong> <br />
              📍 {exhibition.location} <br />
              📅 {exhibition.date}
            </li>
          ))
        ) : (
          <p className="text-danger">No exhibitions found</p>
        )}
      </ul>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="mt-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>

          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
