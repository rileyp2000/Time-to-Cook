import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function MyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/getAll")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(typeof recipes);
  console.log(recipes);

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
      {typeof recipes.rec !== "undefined" ? (
        recipes.rec.map((recipe) => <RecipeCard key={2} rec={recipe} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyRecipe;
