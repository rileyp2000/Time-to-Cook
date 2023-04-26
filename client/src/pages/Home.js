import React from "react";
import "./Home.css";
import SearchResults from "../components/SearchResults";
import { Link, useNavigate } from "react-router-dom";
import FilterOptions from "../components/FilterOptions";

function Home() {
  const [searchQuery, setSearchQuery] = React.useState(""); // Initialize search query state to an empty string
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  const handleSearch = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const query = event.target.value;
      event.target.value = "";
      setSearchQuery(query); // Set search query state to the entered query when a search is performed
      navigate(`/searchresults/${query}`); // Navigate to the SearchResults page with the search query as a parameter
    }
  };

  return (
    <div className="container">
      <img src={require("../assets/logo.jpg")} className="logo" />
      {!searchQuery ? (
        <input
          type="text"
          placeholder="Search Recipe"
          className="search-bar"
          onKeyPress={handleSearch}
        />
      ) : (
        <SearchResults query={searchQuery} />
      )}
    </div>
  );
}

export default Home;
