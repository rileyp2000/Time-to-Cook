import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import ListOfRecipeCards from "../components/ListOfRecipeCards";

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

  return (
    <ListOfRecipeCards
      recipes={recipes}
      title={"Favorites"}
    ></ListOfRecipeCards>
  );
}

export default Favorite;
