import { List } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ListOfRecipeCards from "../components/ListOfRecipeCards";
import FilterOptions from "./FilterOptions";
import PropTypes from "prop-types";

function RecipePage(props) {
  const [recipes, setRecipes] = useState([]);
  console.log("we are in recipepage for favorite:", props.favorite);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
      <ListOfRecipeCards
        recipes={recipes}
        style={
          {
            // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            // borderRadius: "10px",// or any other value that fits your needs
          }
        }
      ></ListOfRecipeCards>
    </div>
  );
}

RecipePage.propTypes = {
  myrecipe: PropTypes.string.isRequired,
  favorite: PropTypes.string.isRequired,
};

export default RecipePage;