import React, { useState } from "react";
import RadioButtons from "./RadioButtons";
import CheckBoxes from "./CheckBoxes";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect } from "react";

function FilterOptions() {
  const [query, setQuery] = useState("");
  const [openCard, setOpenCard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    protein: [],
    mealType: [],
    energy: [],
    favorite: false, // initialize as false
  });

  const proteinOptions = ["Chicken", "Beef", "Fish"];
  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const energyOptions = ["Easy", "Moderate", "Difficult"];
  const favoriteOptions = ["Favorite"];
  const [proteinQuery, setProteinQuery] = useState("");
  const [mealQuery, setMealQuery] = useState("");
  const [energyQuery, setEnergyQuery] = useState("");
  const [favoriteQuery, setFavoriteQuery] = useState("");

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleApplyFilters = () => {
    const newSelectedOptions = {
      protein: proteinQuery.split("|"),
      mealType: mealQuery.split("|"),
      energy: energyQuery.split("|"),
      favorite: favoriteQuery.split("|"),
    };
    setSelectedOptions(newSelectedOptions);
    setOpenCard(false);
  };

  const changeProtein = (newQuery, newSelectedOptions) => {
    setProteinQuery(newQuery);
    setSelectedOptions({ ...selectedOptions, protein: newSelectedOptions });
    buildQuery(newQuery, mealQuery, energyQuery, favoriteQuery);
  };

  const changeMeal = (newQuery, newSelectedOptions) => {
    setMealQuery(newQuery);
    setSelectedOptions({ ...selectedOptions, mealType: newSelectedOptions });
    buildQuery(proteinQuery, newQuery, energyQuery, favoriteQuery);
  };

  const changeEnergy = (newQuery, newSelectedOptions) => {
    setEnergyQuery(newQuery);
    setSelectedOptions({ ...selectedOptions, energy: newSelectedOptions });
    buildQuery(proteinQuery, mealQuery, newQuery, favoriteQuery);
  };

  const changeFavorite = (newQuery, newSelectedOptions) => {
    setFavoriteQuery(newQuery);
    setSelectedOptions({ ...selectedOptions, favorite: newSelectedOptions });
    buildQuery(proteinQuery, mealQuery, energyQuery, newQuery);
  };

  const buildQuery = (query1, query2, query3, query4) => {
    let res = "/getRecipes";
    if (query1 == null && query2 == null && query3 == null && query4 == null) {
      setQuery(res);
    } else {
      res += "?";
      if (query1) {
        res += "&protein=" + query1;
      }
      if (query2) {
        res += "&mealType=" + query2;
      }
      if (query3) {
        res += "&energy=" + query3;
      }
      if (query4) {
        res += "&favorite=" + "true";
      }
    }
    setQuery(res);
  };

  return (
    <div className="Filtering Options">
      <Button onClick={() => setOpenCard(true)} variant="outlined">
        Filter Options
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openCard}
        onClose={handleApplyFilters}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            height: "60vh",
            width: "20%",
            overflowY: "auto",
          }}
        >
          <h1 style={{ borderBottom: "1px solid grey" }}>Filter Options</h1>
          <CheckBoxes
            title={"Protein"}
            options={proteinOptions}
            onQueryChange={changeProtein}
            selectedOptions={selectedOptions.protein || []}
          />
          <CheckBoxes
            title={"Meal Type"}
            options={mealOptions}
            onQueryChange={changeMeal}
            selectedOptions={selectedOptions.mealType || []}
          />
          <CheckBoxes
            title={"Energy Level"}
            options={energyOptions}
            onQueryChange={changeEnergy}
            selectedOptions={selectedOptions.energy || []}
          />
          <CheckBoxes
            title={"Recipes"}
            options={["Favorite"]}
            onQueryChange={changeFavorite}
            selectedOptions={selectedOptions.favorite}
          />
          <p>query string: {query}</p>
        </div>
      </Modal>
    </div>
  );
}

export default FilterOptions;
