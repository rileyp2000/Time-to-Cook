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
  });
  const proteinOptions = ["Beef"];
  const mealOptions = ["Breakfast"];
  const energyOptions = ["Easy", "Moderate", "Difficult"];
  const [proteinQuery, setProteinQuery] = useState("");
  const [mealQuery, setMealQuery] = useState("");
  const [energyQuery, setEnergyQuery] = useState("");

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const changeProtein = (newQuery) => {
    setProteinQuery(newQuery);
    buildQuery(newQuery, mealQuery, energyQuery);
  };

  const changeMeal = (newQuery) => {
    setMealQuery(newQuery);
    buildQuery(proteinQuery, newQuery, energyQuery);
  };

  const changeEnergy = (newQuery) => {
    setEnergyQuery(newQuery);
    buildQuery(proteinQuery, mealQuery, newQuery);
  };

  const buildQuery = (query1, query2, query3) => {
    setQuery(
      "getRecipes?protein=" +
        query1 +
        "&mealType=" +
        query2 +
        "&energy=" +
        query3
    );
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
        onClose={() => setOpenCard(false)}
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
            parentButton={"Protein"}
            options={proteinOptions}
            onQueryChange={changeProtein}
          />
          <CheckBoxes
            parentButton={"Meal Type"}
            options={mealOptions}
            onQueryChange={changeMeal}
          />

          <CheckBoxes
            parentButton={"Energy Level"}
            options={energyOptions}
            onQueryChange={changeEnergy}
          />
          <p>query string: {query}</p>
        </div>
      </Modal>
    </div>
  );
}

export default FilterOptions;
