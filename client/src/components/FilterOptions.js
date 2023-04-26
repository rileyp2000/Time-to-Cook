import React, { useState } from "react";
import CheckBoxes from "./CheckBoxes";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import PropTypes from "prop-types";
import TuneIcon from "@mui/icons-material/Tune";
import IconButton from "@mui/joy/IconButton";

function FilterOptions(props) {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState(props.myrecipe ? "/getRecipes" : "");
  const [openCard, setOpenCard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    protein: [],
    mealType: [],
    energy: [],
    favorite: [], // initialize as an empty array
  });

  const [isFavoritePage, setIsFavoritePage] = useState(
    props.favorite ? true : false
  );

  const [proteinOptions, setProteinOptions] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);
  const [energyOptions, setEnergyOptions] = useState([]);
  useEffect(() => {
    async function fetchFilters() {
      const res = await fetch("/getFilters");
      const filters = await res.json();
      setProteinOptions(filters.protein);
      setMealOptions(filters.mealType);
      setEnergyOptions(filters.energy);
    }
    fetchFilters();
  }, []);
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
    buildQuery(proteinQuery, mealQuery, energyQuery, favoriteQuery);
    fetchRecipes(query);
  };

  useEffect(() => {
    if (props.myrecipe) {
      fetchRecipes("/getRecipes");
    }
  }, [props.myrecipe]);

  useEffect(() => {
    if (isFavoritePage) {
      fetchRecipes("/getRecipes?favorite=true");
    }
  }, [isFavoritePage]);

  const fetchRecipes = async (query) => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      props.setRecipes(data);
    } catch (error) {
      console.error(error);
    }
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
    if (isFavoritePage) {
      setIsFavoritePage(false);
    }

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
      <Button
        onClick={() => setOpenCard(true)}
        variant="outlined"
        style={{ marginBottom: "3rem" }}
        endIcon={<TuneIcon />}
      >
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
            width: "30%",
            overflowY: "auto",
          }}
        >
          <h1 style={{ borderBottom: "1px solid grey" }}>Filter Options</h1>
          <CheckBoxes
            title={"Protein"}
            options={proteinOptions}
            onQueryChange={changeProtein}
            selectedOptions={selectedOptions.protein || []}
            style={{ marginTop: "20px" }} // add margin to the top
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
            options={favoriteOptions}
            onQueryChange={changeFavorite}
            selectedOptions={
              isFavoritePage ? ["Favorite"] : selectedOptions.favorite
            }
          />
        </div>
      </Modal>
    </div>
  );
}

FilterOptions.propTypes = {
  setRecipes: PropTypes.func.isRequired,
  myrecipe: PropTypes.bool.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default FilterOptions;
