import * as React from "react";
import { useState, useEffect } from "react";
import ListOfRecipeCards from "../components/ListOfRecipeCards";

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
    <ListOfRecipeCards
      recipes={recipes}
      title={"My Recipe"}
    ></ListOfRecipeCards>
  );
}

export default MyRecipe;
