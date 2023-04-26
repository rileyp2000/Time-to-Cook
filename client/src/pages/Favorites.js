import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import ListOfRecipeCards from "../components/ListOfRecipeCards";
import RecipePage from "../components/RecipePage";

function Favorite() {
  return <RecipePage favorite={true} myrecipe={false}></RecipePage>;
}

export default Favorite;
