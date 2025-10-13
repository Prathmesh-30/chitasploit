import React from "react";
import "./MovieCard.css";

// ⭐ Reusable star icon for the rating display
const StarIcon = () => (
  <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const MovieCard = ({ movie, onCardClick }) => {
  // Use the image URL directly from the movie object (works with Cloudinary)
  const poster = movie.image || "https://i.imgur.com/3Z3gS6b.png"; // fallback

  return (
    <div className="movie-card" onClick={() => onCardClick(movie)}>
      <img
        src={poster}
        alt={`Poster for ${movie.title}`}
        className="movie-poster"
        // Add a fallback in case the Cloudinary link ever breaks
        onError={(e) => {
          e.currentTarget.src = "https://i.imgur.com/3Z3gS6b.png";
        }}
      />
      {/* This overlay contains the info that shows on hover */}
      <div className="movie-info-overlay">
        {/* Default state: only the title is visible at the bottom */}
        <div className="movie-title-default">
          <h4>{movie.title}</h4>
        </div>
        {/* Hover state: more details appear */}
        <div className="movie-info-hover">
          <h3 className="movie-title-hover">{movie.title}</h3>
          <div className="movie-details">
            <span className="movie-genre">{movie.genre}</span>
            <div className="movie-rating">
              <StarIcon />
              <span>{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

