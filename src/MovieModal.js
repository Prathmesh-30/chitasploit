import React from "react";
import "./MovieModal.css";

// Reusable icons for better UI
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const MovieModal = ({ movie, onClose }) => {
  // Return null if no movie is selected to render nothing
  if (!movie) {
    return null;
  }

  // Fallback for missing poster
  const posterUrl = movie.image || "https://i.imgur.com/3Z3gS6b.png";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="modal-header">
          <h1 className="modal-title">{movie.title}</h1>
          <div className="modal-meta">
            <span>{movie.year}</span>
            <span className="separator">●</span>
            <span>{movie.runtime} min</span>
            <span className="separator">●</span>
            <div className="modal-rating">
              <StarIcon />
              <span>
                <strong>
                  {movie.rating ? movie.rating.toFixed(1) : "N/A"}
                </strong>
                /10
              </span>
            </div>
          </div>
          <div className="modal-genre-badge">{movie.genre}</div>
        </div>

        <div className="modal-body">
          <img
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            className="modal-poster"
            onError={(e) => {
              e.currentTarget.src = "https://i.imgur.com/3Z3gS6b.png";
            }}
          />
          <div className="modal-details">
            <p className="modal-description">{movie.description}</p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </p>

            <div className="watch-section">
              <h3>Where to Watch</h3>
              <div className="platform-links">
                {movie.platforms.map((platform) => (
                  <a
                    href={platform.url}
                    key={platform.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-link"
                  >
                    {platform.name}
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
