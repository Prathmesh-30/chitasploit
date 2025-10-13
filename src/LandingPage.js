import React from "react";
import "./LandingPage.css"; // You'll need this CSS file for landing page specific styles

const LandingPage = ({ onExploreClick, onSuggestMovieClick }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">ChitraSploit</h1>
        <p className="landing-tagline">
          Discover, rate, and suggest. Your next favorite movie awaits.
        </p>
        <div className="landing-buttons">
          <button className="btn-explore" onClick={onExploreClick}>
            Explore Movies <span className="arrow">→</span>
          </button>
          <button className="btn-suggest" onClick={onSuggestMovieClick}>
            <span className="star">★</span> Suggest a Movie
          </button>
        </div>
      </div>
      {/* Background image is handled by CSS on .landing-page */}
    </div>
  );
};

export default LandingPage;
