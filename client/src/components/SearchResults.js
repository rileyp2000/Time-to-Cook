import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";

function SearchResults() {
  const { query } = useParams(); // Retrieve the search query parameter
  const [recipe, setRecipe] = useState(null); // Initialize recipe state to null

  useEffect(() => {
    fetch(`/getRecipes?title=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // If there are any search results
          setRecipe(data[0]); // Set recipe state to the first result
        } else {
          setRecipe(null); // Otherwise, set recipe state to null
        }
      })
      .catch((error) => console.error(error));
  }, [query]);

  // Render the search results based on the recipe state
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      {recipe ? (
        <div
          style={{
            maxWidth: "400px",
            marginTop: "20px",
            alignContent: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              borderBottom: "1px solid grey",
            }}
          >
            Search Result for {query}
          </h2>
          <RecipeCard rec={recipe} />
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          No results found for `{query}`
        </h2>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  query: PropTypes.string,
};

export default SearchResults;
