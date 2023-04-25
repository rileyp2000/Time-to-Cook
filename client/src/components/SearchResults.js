import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
import ListOfRecipeCards from "./ListOfRecipeCards";

function SearchResults() {
  const { query } = useParams(); // Retrieve the search query parameter
  const [recipe, setRecipe] = useState(null); // Initialize recipe state to null

  useEffect(() => {
    fetch(`/getRecipes?title=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // If there are any search results
          setRecipe(data); // Set recipe state to the first result
        } else {
          setRecipe(null); // Otherwise, set recipe state to null
        }
      })
      .catch((error) => console.error(error));
  }, [query]);

  // Render the search results based on the recipe state
  return (
    <div>
      {recipe ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <h1
            style={{
              width: "30%",
              borderBottom: "1px solid grey",
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "4rem",
            }}
          >
            Search Result for `{query}`
          </h1>
          <ListOfRecipeCards recipes={recipe}></ListOfRecipeCards>
        </div>
      ) : (
        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
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
