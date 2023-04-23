import * as React from "react";
import PropTypes from "prop-types";
import RecipeCard from "../components/RecipeCard";
import "./ListOfRecipeCards.css";

function ListOfRecipeCards(props) {
  return (
    <div className="cards-container">
      <section>
        <h1 style={{ borderBottom: "1px solid grey" }}>{props.title}</h1>
        <div className="cards">
          {props.recipes.length > 0 ? (
            props.recipes.map((recipe, index) => (
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

ListOfRecipeCards.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // add more properties here as needed
    })
  ).isRequired,
};

export default ListOfRecipeCards;
