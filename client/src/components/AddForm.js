import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UploadImage from "./UploadImage";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FormControl,
  FormGroup,
  InputLabel,
  FormHelperText,
  Input,
  makeStyles,
  autocompleteClasses,
} from "@mui/material";

function AddForm() {
  const { state } = useLocation();
  const editingRecipe = state?.editingRecipe;
  console.log(editingRecipe);

  const [unit, setUnit] = React.useState(editingRecipe?.time[1] || "");

  const handleUnit = (event) => {
    setUnit(event.target.value);
  };

  const [title, setTitle] = React.useState(editingRecipe?.title || "");

  const handleTitle = (event) => {
    setTitle(event.target.value);
    setFormErrors({ ...formErrors, title: false });
  };

  //time has to be a number?
  const [time, setTime] = React.useState(editingRecipe?.time[0] || "");

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const [energy, setEnergy] = React.useState(editingRecipe?.energy || "");

  const handleEnergy = (event) => {
    setEnergy(event.target.value);
  };

  useEffect(() => {
    if (
      editingRecipe?.protein &&
      !["Chicken", "Beef", "Pork", "Turkey", "Fish", "No Protein"].includes(
        editingRecipe.protein
      )
    ) {
      setProtein(editingRecipe.protein);
      setShowOtherProtein(true);
    }
  }, [editingRecipe]);

  const [protein, setProtein] = React.useState(editingRecipe?.protein || "");
  const [showOtherProtein, setShowOtherProtein] = React.useState(false);
  const [prevProtein, setPrevProtein] = React.useState("");

  const handleProtein = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setShowOtherProtein(true);
    } else {
      setProtein(value);
      setShowOtherProtein(false);
    }
  };

  const handleOtherProtein = (event) => {
    setProtein(event.target.value);
  };

  const handleBackProtein = () => {
    setShowOtherProtein(false);
    setProtein(prevMeal);
  };

  useEffect(() => {
    if (
      editingRecipe?.mealType &&
      ![
        "Entree",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Side Dish",
        "Sweets",
      ].includes(editingRecipe.mealType)
    ) {
      setMeal(editingRecipe.mealType);
      setShowOtherMeal(true);
    }
  }, [editingRecipe]);

  const [meal, setMeal] = React.useState(editingRecipe?.mealType || "");

  const [showOtherMeal, setShowOtherMeal] = React.useState(false);
  const [prevMeal, setPrevMeal] = React.useState("");

  const handleMeal = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setShowOtherMeal(true);
    } else {
      setMeal(value);
      setShowOtherMeal(false);
    }
  };

  const handleOtherMeal = (event) => {
    setMeal(event.target.value);
  };

  const handleBackMeal = () => {
    setShowOtherMeal(false);
    setMeal(prevMeal);
  };

  const [numUtensils, setnumUtensils] = React.useState(1);
  const [utensils, setUtensils] = React.useState(
    editingRecipe?.utensils || [""]
  );

  const handleAddUtensil = () => {
    setnumUtensils(numUtensils + 1);
    setUtensils([...utensils, ""]);
  };

  const handleDeleteUtensil = (index) => {
    setnumUtensils(numUtensils - 1);
    setUtensils([...utensils.slice(0, index), ...utensils.slice(index + 1)]);
  };

  const handleUtensilChange = (event, index) => {
    const newUtensils = [...utensils];
    newUtensils[index] = event.target.value;
    setUtensils(newUtensils);
  };

  let ingredientsArray = [];
  if (editingRecipe) {
    ingredientsArray = Object.entries(editingRecipe?.ingredients).map(
      ([title, items]) => ({
        title: title,
        items: items,
      })
    );
  }

  const [numIngredient, setNumIngredient] = React.useState(1);
  const [ingredients, setIngredients] = React.useState(
    editingRecipe ? ingredientsArray : [{ title: "", items: [""] }]
  );

  const handleAddIngredient = () => {
    setNumIngredient(numIngredient + 1);
    setIngredients([...ingredients, ""]);
  };

  const handleDeleteIngredient = (groupIndex, itemIndex) => {
    const newIngredients = [...ingredients];
    newIngredients[groupIndex].items.splice(itemIndex, 1);
    setIngredients(newIngredients);
  };

  const handleDeleteIngredientGroup = (groupIndex) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(groupIndex, 1);
    setIngredients(newIngredients);
  };

  const handleIngredientTitleChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].title = event.target.value;
    setIngredients(newIngredients);
  };

  const handleIngredientItemChange = (event, groupIndex, itemIndex) => {
    const newIngredients = [...ingredients];
    newIngredients[groupIndex].items[itemIndex] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredientGroup = () => {
    setIngredients([...ingredients, { title: "", items: [""] }]);
  };

  const handleAddIngredientItem = (groupIndex) => {
    const newIngredients = [...ingredients];
    newIngredients[groupIndex].items.push("");
    setIngredients(newIngredients);
  };

  const [numSteps, setNumSteps] = React.useState(1);
  const [steps, setSteps] = React.useState(editingRecipe?.steps || [""]);

  const handleAddStep = () => {
    setNumSteps(numSteps + 1);
    setSteps([...steps, ""]);
  };

  const handleDeleteStep = (index) => {
    setNumSteps(numSteps - 1);
    setSteps([...steps.slice(0, index), ...steps.slice(index + 1)]);
  };

  const handleStepChange = (event, index) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };

  const [openNotifSucess, setopenNotifSucess] = React.useState(false);

  const handleCloseSucess = () => {
    setopenNotifSucess(false); // Close Snackbar
  };

  const [openNotifFail, setopenNotifFail] = React.useState(false);

  const handleCloseFail = () => {
    setopenNotifFail(false); // Close Snackbar
  };

  const [formErrors, setFormErrors] = React.useState({
    unit: false,
    title: false,
    time: false,
    energy: false,
    protein: false,
    meal: false,
    utensils: [],
    ingredients: [],
    steps: [],
  });

  const defaultImage = {
    mime: "image/png",
    data: "iVBORw0KGgoAAAANSUhEUgAAAWMAAADmCAYAAAAAyOQ+AAAACXBIWXMAAC4jAAAuIwF4pT92AAAGYWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA4LTIzVDExOjMxOjEwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA4LTIzVDExOjMxOjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wOC0yM1QxMTozMToxMCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MDZlYjk5Ni05YzFmLWYxNDktOTAzZC1kYmJlMDZhYTBlMjUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkYTc1MWJjZS03NWU0LTYxNDEtYTQ1Ny0zMjAxNThhMGFjMDUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZmRhNDA3NS03Yzk3LWMyNDgtOTkwMy0zY2E1ZjhiYmI1MDYiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ZmRhNDA3NS03Yzk3LWMyNDgtOTkwMy0zY2E1ZjhiYmI1MDYiIHN0RXZ0OndoZW49IjIwMTktMDgtMjNUMTE6MzE6MTArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTA2ZWI5OTYtOWMxZi1mMTQ5LTkwM2QtZGJiZTA2YWEwZTI1IiBzdEV2dDp3aGVuPSIyMDE5LTA4LTIzVDExOjMxOjEwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6NWMwZWI2YzEtNjA0Mi0yZTQ3LTk2MzgtNGVlOTgxNjM4YjhlPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RdtbYgAAKmpJREFUeJztnWmwHOWVpp+qurvQAmgDgdjEbjBgELskwG5veN9mvLSX7ujonpjp6YmYP/NjhmBifs5MTHTETHT0ZrfddrvdbWO7G9tgzG6zb2Y1iwADAiFAEhJarm5VzY83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",
  };

  const [image, setImage] = React.useState(
    editingRecipe?.image || defaultImage
  );
  const handleImageUpload = (image) => {
    console.log(image);
    setImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isFormValid = true;

    // Check for title
    if (!title) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        title: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        title: false,
      }));
      //isFormValid = true;
    }

    // Check for time, made sure that it has to be numbers
    if (!time || isNaN(time)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        time: true,
      }));
      isFormValid = false;
      console.log(time);
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        time: false,
      }));
      //isFormValid = true;
    }

    // Check for unit
    if (!unit) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        unit: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        unit: false,
      }));
      //isFormValid = true;
    }

    // Check for energy
    if (!energy) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        energy: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        energy: false,
      }));
      //isFormValid = true;
    }

    // Check for meal
    if (!meal) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        meal: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        meal: false,
      }));
      //isFormValid = true;
    }

    // Check for protein
    if (!protein) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        protein: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        protein: false,
      }));
      //isFormValid = true;
    }

    // Check for utensils
    if (utensils.some((utensil) => !utensil)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        utensils: utensils.map((utensil) => !utensil),
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        utensils: utensils.map(() => false),
      }));
      //isFormValid = true;
    }

    // Check for ingredients
    if (
      ingredients.some(
        (ingredient, groupIndex) =>
          groupIndex !== 0 &&
          (!ingredient.title || ingredient.items.some((item) => !item))
      )
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        ingredients: ingredients.map((ingredient, groupIndex) => ({
          ...ingredient,
          title: !ingredient.title && groupIndex !== 0,
          items: ingredient.items.map((item) => !item),
        })),
      }));
      isFormValid = false;
    } else {
      const isIngredientsValid = ingredients.every(
        (ingredient, groupIndex) =>
          groupIndex === 0 ||
          (ingredient.title && ingredient.items.every((item) => item !== ""))
      );

      if (isIngredientsValid) {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          ingredients: ingredients.map((ingredient) => ({
            ...ingredient,
            title: false,
            items: ingredient.items.map(() => false),
          })),
        }));
        //isFormValid = true;
      } else {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          ingredients: ingredients.map((ingredient, groupIndex) => ({
            ...ingredient,
            title: !ingredient.title && groupIndex === 0,
            items: ingredient.items.map((item) => !item),
          })),
        }));
        isFormValid = false;
      }
    }

    // Check for steps
    if (steps.some((step) => !step)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        steps: steps.map((step) => !step),
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        steps: steps.map(() => false),
      }));
      //isFormValid = true;
    }

    // Show Snackbar error message if form is not valid
    if (!isFormValid) {
      console.log("error");
      setopenNotifFail(true);
      return;
    }
    console.log("here is ingredeints:" + JSON.stringify(ingredients, null, 2));

    const recipe = {
      title: title,
      time: [time, unit],
      energy: energy,
      mealType: meal,
      utensils: utensils,
      ingredients: ingredients.reduce(
        (acc, ingredient, index) => ({
          ...acc,
          [index !== 0 ? ingredient.title : title]: ingredient.items,
        }),
        {}
      ),
      steps: steps,
      image: image,
      protein: protein,
      favorite: false,
    };
    console.log("changed recipe:" + JSON.stringify(recipe, null, 2));
    //console.log(recipe.title);

    // fetch("/addRecipe", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(recipe),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setopenNotifSucess(true);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500); // 0.5 seconds delay
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1 style={{ color: "grey" }}>
        {editingRecipe ? "Edit Recipe" : "Add Recipe"}
      </h1>
      <FormGroup
        style={{
          width: "70%",
          margin: "auto",
          padding: 20,
          paddingTop: 20,
          marginTop: 30,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        }}
      >
        <FormGroup
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            style={{ marginBottom: "4rem", marginRight: "2rem", width: "56%" }}
            error={formErrors.title}
          >
            <InputLabel sx={{ fontSize: 22 }}>Title</InputLabel>
            <Input
              onChange={handleTitle}
              required
              defaultValue={editingRecipe?.title || ""}
            />
            {formErrors.title && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
          <FormControl
            style={{ flex: "1", marginRight: "2rem" }}
            error={formErrors.time}
          >
            <InputLabel sx={{ fontSize: 22 }}>Time</InputLabel>
            <Input
              onChange={handleTime}
              required
              defaultValue={editingRecipe?.time[0] || ""}
            />
            {formErrors.time && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
          <FormControl style={{ flex: "0 0 20%" }} error={formErrors.unit}>
            <InputLabel sx={{ fontSize: 22 }}>Unit</InputLabel>
            <Select
              value={unit}
              label="Unit"
              onChange={handleUnit}
              required
              defaultValue={editingRecipe?.time[1] || ""}
            >
              <MenuItem value={"Mins"}>Min</MenuItem>
              <MenuItem value={"Hrs"}>Hrs</MenuItem>
            </Select>
            {formErrors.unit && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "4rem",
          }}
        >
          <FormControl
            style={{ flex: "1", marginRight: "1rem" }}
            error={formErrors.meal}
          >
            {showOtherMeal ? (
              <FormControl>
                <InputLabel sx={{ fontSize: 22 }}>Meal Type</InputLabel>
                <Input
                  value={meal}
                  onChange={handleOtherMeal}
                  onClick={(e) => e.stopPropagation()}
                  required
                  defaultValue={editingRecipe?.mealType || ""}
                />
                <Button onClick={handleBackMeal} sx={{ marginTop: "1rem" }}>
                  Back
                </Button>
              </FormControl>
            ) : (
              <FormControl>
                <InputLabel sx={{ fontSize: 22 }}>Meal Type</InputLabel>
                <Select
                  value={meal}
                  label="Mealtype"
                  onChange={handleMeal}
                  required
                >
                  <MenuItem value={"Entree"}>Entree</MenuItem>
                  <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                  <MenuItem value={"Lunch"}>Lunch</MenuItem>
                  <MenuItem value={"Dinner"}>Dinner</MenuItem>
                  <MenuItem value={"Side Dish"}>Side Dish</MenuItem>
                  <MenuItem value={"Sweets"}>Sweets</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            )}
            {formErrors.meal && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>

          <FormControl
            style={{ flex: "0 0 20%", marginRight: 20 }}
            error={formErrors.protein}
          >
            {showOtherProtein ? (
              <FormControl>
                <InputLabel sx={{ fontSize: 22 }}>Protein</InputLabel>
                <Input
                  value={protein}
                  onChange={handleOtherProtein}
                  onClick={(e) => e.stopPropagation()}
                  required
                />
                <Button onClick={handleBackProtein} sx={{ marginTop: "1rem" }}>
                  Back
                </Button>
              </FormControl>
            ) : (
              <FormControl>
                <InputLabel sx={{ fontSize: 22 }}>Protein</InputLabel>
                <Select
                  value={protein}
                  label="Protein"
                  onChange={handleProtein}
                  required
                  defaultValue={editingRecipe?.protein || ""}
                >
                  <MenuItem value={"Chicken"}>Chicken</MenuItem>
                  <MenuItem value={"Beef"}>Beef</MenuItem>
                  <MenuItem value={"Pork"}>Pork</MenuItem>
                  <MenuItem value={"Turkey"}>Turkey</MenuItem>
                  <MenuItem value={"Fish"}>Fish</MenuItem>
                  <MenuItem value={"No Protein"}>No Protein</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            )}
            {formErrors.protein && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
          <FormControl style={{ flex: "0 0 20%" }} error={formErrors.energy}>
            <InputLabel sx={{ fontSize: 22 }}>Energy</InputLabel>
            <Select
              value={energy}
              label="Energy"
              onChange={handleEnergy}
              required
              defaultValue={editingRecipe?.energy || ""}
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Difficult"}>Difficult</MenuItem>
            </Select>
            {formErrors.energy && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
        </FormGroup>
        {utensils.map((utensil, index) => (
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: "16px",
              width: "100%",
              marginTop: "1rem",
            }}
            key={index}
            error={formErrors.utensils[index]}
          >
            <InputLabel sx={{ fontSize: 22 }}>Utensil {index + 1}</InputLabel>
            <Input
              value={utensil}
              onChange={(event) => handleUtensilChange(event, index)}
              required
              sx={{ width: "80%" }}
            />
            {index !== 0 && (
              <Button
                variant="outlined"
                color="error"
                style={{
                  marginTop: 10,
                  marginLeft: "16px",
                  width: "20%",
                }}
                onClick={() => handleDeleteUtensil(index)}
              >
                Delete Utensil
              </Button>
            )}
          </FormControl>
        ))}

        <Button
          variant="outlined"
          color="secondary"
          style={{
            marginTop: 10,
            width: "20%",
            marginBottom: "3rem",
            fontSize: 16,
          }}
          onClick={handleAddUtensil}
        >
          Add Utensil
        </Button>
        {steps.map((utensil, index) => (
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: "16px",
              width: "100%",
              marginTop: "1rem",
            }}
            key={index}
            error={formErrors.steps[index]}
          >
            <InputLabel sx={{ fontSize: 22 }}>Step {index + 1}</InputLabel>
            <Input
              value={steps[index]}
              onChange={(event) => handleStepChange(event, index)}
              required
              sx={{ width: "80%" }}
            />
            {index !== 0 && (
              <Button
                variant="outlined"
                color="error"
                style={{
                  marginTop: 10,
                  marginLeft: "16px",
                  width: "20%",
                }}
                onClick={() => handleDeleteStep(index)}
              >
                Delete Step
              </Button>
            )}
          </FormControl>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          style={{
            marginTop: 10,
            width: "20%",
            marginBottom: "3rem",
            fontSize: 16,
          }}
          onClick={handleAddStep}
        >
          Add Step
        </Button>

        <FormGroup sx={{ marginTop: "1rem" }}>
          {ingredients.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 2 }}>
              {groupIndex !== 0 && (
                <FormControl
                  fullWidth
                  error={
                    formErrors.ingredients[groupIndex] &&
                    (!group.title ||
                      formErrors.ingredients[groupIndex].items === undefined)
                  } // Check for title and items
                >
                  <InputLabel sx={{ fontSize: 22 }}>
                    Ingredient Title
                  </InputLabel>
                  <Input
                    value={group.title}
                    onChange={(event) =>
                      handleIngredientTitleChange(event, groupIndex)
                    }
                    sx={{ marginBottom: "1rem", width: "80%" }}
                  />
                </FormControl>
              )}
              {group.items.map((item, itemIndex) => (
                <FormControl
                  key={itemIndex}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    marginBottom: "16px",
                    width: "100%",
                    marginTop: "2rem",
                  }}
                  error={
                    formErrors.ingredients[groupIndex] &&
                    (!item ||
                      formErrors.ingredients[groupIndex].items[itemIndex])
                  }
                >
                  <InputLabel sx={{ fontSize: 22 }}>
                    Ingredient {itemIndex + 1}
                  </InputLabel>
                  <Input
                    value={item}
                    onChange={(event) =>
                      handleIngredientItemChange(event, groupIndex, itemIndex)
                    }
                    required
                    sx={{ width: "80%" }}
                  />
                  {itemIndex !== 0 && (
                    <Button
                      variant="outlined"
                      color="error"
                      style={{
                        marginTop: 10,
                        marginLeft: "16px",
                        width: "20%",
                      }}
                      onClick={() => {
                        handleDeleteIngredient(groupIndex, itemIndex);
                      }}
                    >
                      Delete Ingredient
                    </Button>
                  )}
                </FormControl>
              ))}
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: "16px", fontSize: 16 }}
                onClick={() => {
                  handleAddIngredientItem(groupIndex);
                }}
              >
                Add Ingredient
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={{ marginTop: "16px", marginLeft: "16px", fontSize: 16 }}
                onClick={() => {
                  handleDeleteIngredientGroup(groupIndex);
                }}
              >
                Delete Group
              </Button>
            </Box>
          ))}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleAddIngredientGroup}
              style={{ marginBottom: "3rem", fontSize: 16 }}
            >
              Add Group
            </Button>
          </Box>
        </FormGroup>

        <UploadImage
          onImageUpload={handleImageUpload}
          initialImage={editingRecipe ? editingRecipe?.image : null}
        ></UploadImage>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: "1rem", width: "100%" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: "3rem", width: "20%", fontSize: 16 }}
            onClick={handleSubmit}
          >
            {editingRecipe ? "Update" : "Submit"}
          </Button>
          <Snackbar
            open={openNotifFail}
            autoHideDuration={3000}
            onClose={handleCloseFail}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseFail}
              severity="error"
            >
              Please fill out required form
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={openNotifSucess}
            autoHideDuration={3000}
            onClose={handleCloseSucess}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSucess}
              severity="success"
            >
              Recipe Added
            </MuiAlert>
          </Snackbar>
        </Box>
      </FormGroup>
    </div>
  );
}

AddForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      editingRecipe: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AddForm;
