import React from "react";
// ✅ FIXED: Changed './MovieCard' to './Moviecard' to match the actual filename
import MovieCard from "./Moviecard";
import "./MovieGrid.css";

const MovieGrid = ({ movies, onMovieClick }) => {
  // Show a message if there are no movies to display
  if (!movies || movies.length === 0) {
    return (
      <div className="no-movies-found">
        <h2>No movies found.</h2>
        <p>Try adjusting your search or selecting a different genre.</p>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onCardClick={onMovieClick} />
      ))}
    </section>
  );
};

export default MovieGrid;