import { List } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ListOfRecipeCards from "../components/ListOfRecipeCards";
import FilterOptions from "./FilterOptions";
import PropTypes from "prop-types";

function RecipePage(props) {
  const [recipes, setRecipes] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <div>
        <h1
          style={{
            width: "100%",
            borderBottom: "1px solid grey",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "4rem",
          }}
        >
          {"Recipes"}
        </h1>
        <FilterOptions
          style={{
            marginBottom: "4rem",
          }}
          setRecipes={setRecipes}
          myrecipe={props.myrecipe}
          favorite={props.favorite}
        ></FilterOptions>
      </div>
      <ListOfRecipeCards recipes={recipes}></ListOfRecipeCards>
    </div>
  );
}

RecipePage.propTypes = {
  myrecipe: PropTypes.bool.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default RecipePage;
