import * as React from "react";
import { useState, useEffect } from "react";
import ListOfRecipeCards from "../components/ListOfRecipeCards";
import RecipePage from "../components/RecipePage";

function MyRecipe() {
  return <RecipePage myrecipe={"true"} favorite={null}></RecipePage>;
}

export default MyRecipe;
