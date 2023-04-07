import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function MyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/getrecipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  console.log(recipes);

  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe._id} rec={recipe} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyRecipe;
