// src/components/SuggestionForm.js

import React, { useState } from "react";
import axios from "axios"; // Using axios for a cleaner POST request
import "./SuggestionForm.css";

const SuggestionForm = ({ onClose, onSubmissionSuccess }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [reason, setReason] = useState(""); // Changed state name for clarity
  const [suggestedBy, setSuggestedBy] = useState(""); // Changed state name for clarity
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_CHARS = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movieTitle || !reason) {
      setError("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    // ✅ 1. The object keys now match your backend schema
    const newSuggestion = {
      movieTitle: movieTitle,
      reason: reason,
      suggestedBy: suggestedBy || "Anonymous",
    };

    try {
      // ✅ 2. Replaced simulation with a real API call to your backend
      // Make sure the URL matches your backend server's address and port
      await axios.post("http://localhost:5001/api/suggestions", newSuggestion);

      // ✅ 3. Call the success function passed from SuggestionsPage.js
      onSubmissionSuccess();
    } catch (err) {
      setError("Failed to submit suggestion. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="form-header">
          <h2>Suggest a Movie</h2>
          <p>Share your favorite movie with the community!</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Movie Title Input (No changes needed here) */}
          <div className="form-group">
            <label htmlFor="movieTitle">
              Movie Title <span className="required">*</span>
            </label>
            <input
              id="movieTitle"
              type="text"
              placeholder="Enter movie title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              required
            />
          </div>

          {/* Reason Textarea (updated value and onChange to match new state name) */}
          <div className="form-group">
            <label htmlFor="reason">
              Why should people watch this? <span className="required">*</span>
            </label>
            <textarea
              id="reason"
              placeholder="Share your thoughts..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={MAX_CHARS}
              required
            />
            <div className="char-counter">
              {reason.length}/{MAX_CHARS}
            </div>
          </div>

          {/* Suggested By Input (updated value and onChange to match new state name) */}
          <div className="form-group">
            <label htmlFor="suggestedBy">Your Name (Optional)</label>
            <input
              id="suggestedBy"
              type="text"
              placeholder="Anonymous"
              value={suggestedBy}
              onChange={(e) => setSuggestedBy(e.target.Juste)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Suggestion"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SuggestionForm;
