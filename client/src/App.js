import React from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";

function App() {
  return (
    <div>
      <div id="menu-outer">
        <div>
          <ul>
            <RecipeCard></RecipeCard>
            <RecipeCard></RecipeCard>
            <RecipeCard></RecipeCard>
            <RecipeCard></RecipeCard>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
