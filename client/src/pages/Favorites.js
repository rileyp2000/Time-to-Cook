import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorite() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/getRecipes?favorite=true")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(typeof recipes);
  console.log(recipes);

  return (
    <div>
      <h1>MyRecipe</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe._id} rec={recipe} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Favorite;
