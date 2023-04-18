import * as React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import "./MyRecipe.css";

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
    <div className="cards-container">
      <section>
        <h1 style={{ borderBottom: "1px solid grey" }}>My Recipes</h1>
        <div className="cards">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="card">
                <RecipeCard key={recipe._id} rec={recipe} />
              </div>
            ))
          ) : (
            <p>No Results</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyRecipe;
