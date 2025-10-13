import React from "react";
import "./Header.css";

// An inline SVG for the search icon
const SearchIcon = () => (
  <svg
    className="search-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// A placeholder for your main logo icon, styled with the red color
const LogoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="#e50914"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6.48L4 17.52C4 18.33 4.67 19 5.48 19H9.5V5H5.48C4.67 5 4 5.67 4 6.48ZM14.5 5V19H18.52C19.33 19 20 18.33 20 17.52V6.48C20 5.67 19.33 5 18.52 5H14.5ZM11.5 5V19H12.5V5H11.5Z" />
  </svg>
);

const Header = ({ onGenreClick, onSearch, setCurrentPage, searchTerm }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <LogoIcon />
        <h1 className="app-title">ChitraSploit</h1>
      </div>

      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <nav className="header-actions">
        <button
          className="btn-browse"
          // I've assumed that "Browse" should function like the "Latest" category.
          // You can change "Latest" to any default genre you prefer.
          onClick={() => onGenreClick("Latest")}
        >
          Browse
        </button>
        <button
          className="btn-suggestions"
          onClick={() => setCurrentPage("suggestions")}
        >
          Suggestions
        </button>
      </nav>
    </header>
  );
};

export default Header;
