import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function MyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/getRecipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    // <div>
    //   {typeof recipes.users === "undefined" ? (
    //     <p>Loading...</p>
    //   ) : (
    //     recipes.users.map((user, i) => <p key={i}>{user}</p>)
    //   )}
    // </div>
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

export default MyRecipe;
