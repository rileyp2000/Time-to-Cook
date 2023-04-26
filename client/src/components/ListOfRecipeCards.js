import * as React from "react";
import PropTypes from "prop-types";
import RecipeCard from "../components/RecipeCard";
import "./ListOfRecipeCards.css";

function ListOfRecipeCards(props) {
  return (
    <div>
      <div className="cards-container">
        <section>
          <div className="cards">
            {props.recipes.length > 0 ? (
              props.recipes.map((recipe, index) => (
                <div key={index} className="card">
                  <RecipeCard key={recipe._id} rec={recipe} />
                </div>
              ))
            ) : (
              <h1>No Results</h1>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

ListOfRecipeCards.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // add more properties here as needed
    })
  ).isRequired,
};

export default ListOfRecipeCards;
