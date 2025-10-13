import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import MovieGrid from "./MovieGrid";
import SuggestionForm from "./SuggestionForm";
import "./SuggestionForm.css";
import LandingPage from "./LandingPage";
import MovieModal from "./MovieModal";
import SuggestionCard from "./SuggestionCard";
import "./App.css";

import { initialMovies } from "./data";
import NoSuggestions from "./NoSuggestions";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("landing");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const mainContentRef = useRef(null);

  const fetchSuggestions = () => {
    // This assumes your backend is running on port 5001
    axios
      .get("http://localhost:5001/api/suggestions")
      .then((response) => {
        // ✅ 2. Update the mapping to include all necessary data for SuggestionCard
        const formattedSuggestions = response.data.map((s) => ({
          id: s._id,
          title: s.movieTitle,
          description: s.reason,
          suggestedBy: s.suggestedBy,
          createdAt: s.createdAt, // Pass the original timestamp
          // These fields are kept for potential use in the modal
          year: new Date(s.createdAt).getFullYear(),
          genre: "Suggestions",
          image: s.imageUrl || "https://i.imgur.com/3Z3gS6b.png",
        }));
        setSuggestions(formattedSuggestions);
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  };

  useEffect(() => {
    if (currentPage === "suggestions") {
      fetchSuggestions();
    }
  }, [currentPage]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage("home");
    setSearchTerm("");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre("");
    setCurrentPage("home");
  };

  const handleExploreClick = () => {
    setCurrentPage("home");
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSuggestMovieClick = () => {
    setCurrentPage("suggestions");
  };

  const handleSuggestionSubmitSuccess = () => {
    setShowSuggestionForm(false);
    fetchSuggestions(); // Refresh suggestions
  };

  const handleMovieCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const filteredMovies = initialMovies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const genres = [
    "Latest",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

  return (
    <div className="app-container">
      {currentPage === "landing" && (
        <LandingPage
          onExploreClick={handleExploreClick}
          onSuggestMovieClick={handleSuggestMovieClick}
        />
      )}

      {(currentPage === "home" || currentPage === "suggestions") && (
        <>
          <Header
            onGenreClick={handleGenreClick}
            onSearch={handleSearch}
            selectedGenre={selectedGenre}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
          />
          <main className="main-content" ref={mainContentRef}>
            {currentPage === "home" && (
              <>
                <nav className="category-nav">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className={selectedGenre === genre ? "active" : ""}
                      onClick={() => handleGenreClick(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </nav>
                <MovieGrid
                  movies={filteredMovies}
                  onMovieClick={handleMovieCardClick}
                />
              </>
            )}

            {currentPage === "suggestions" && (
              <div className="suggestion-page">
                <div className="suggestion-page-header">
                  <div>
                    <h2>Movie Suggestions</h2>
                    <p>Community recommendations and hidden gems</p>
                  </div>
                  <button
                    className="add-suggestion-btn"
                    onClick={() => setShowSuggestionForm(true)}
                  >
                    + Add Movie Suggestion
                  </button>
                </div>

                {showSuggestionForm && (
                  <SuggestionForm
                    onClose={() => setShowSuggestionForm(false)}
                    onSubmissionSuccess={handleSuggestionSubmitSuccess}
                  />
                )}

                {/* ✅ 3. Replace MovieGrid with the new SuggestionCard layout */}
                {suggestions.length > 0 ? (
                  <div className="suggestion-grid">
                    {suggestions.map((suggestion) => (
                      <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                      />
                    ))}
                  </div>
                ) : (
                  !showSuggestionForm && <NoSuggestions />
                )}
              </div>
            )}
          </main>
          <footer className="app-footer">
            © 2025 ChitraSploit.com | All Rights Reserved
          </footer>
        </>
      )}

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
