import React from "react";
import "./SuggestionCard.css";

// A simple function to format the time since the suggestion was made
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

const SuggestionCard = ({ suggestion }) => {
  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <h3 className="suggestion-title">{suggestion.title}</h3>
        <span className="suggestion-time">
          {timeAgo(suggestion.createdAt)}
        </span>
      </div>
      <p className="suggestion-body">{suggestion.description}</p>
      <div className="suggestion-footer">
        <span className="suggested-by-icon">👤</span>
        <span>Suggested by <strong>{suggestion.suggestedBy}</strong></span>
      </div>
    </div>
  );
};

export default SuggestionCard;
