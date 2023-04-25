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

  const [image, setImage] = React.useState({});
  const [newImage, setNewImage] = React.useState(false);
  const handleImageUpload = (image, isNewImage) => {
    console.log("Image path", image);
    console.log("new image?:", isNewImage);
    setNewImage(isNewImage);
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
      protein: protein,
      favorite: false,
    };
    console.log("changed recipe:" + JSON.stringify(recipe, null, 2));
    //console.log(recipe.title);

    //handling image for formdata
    const formData = new FormData();
    console.log("before appending image:", image);

    if (!editingRecipe) {
      // Add the file to the FormData object
      formData.append("image", image);
      //adding recipe for when we are adding ant not editing
      formData.append("recipe", JSON.stringify(recipe));

      fetch("/addRecipe", {
        method: "POST",
        body: formData, // send the formData as the body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("we are in the else case");
      //we add the id no matter what
      const editedRecipe = Object.assign({}, recipe, {
        _id: editingRecipe._id,
      });

      if (newImage) {
        console.log("new image case:");
        //append new image, should get updated from handleFileUpload
        //send new image and recipe with no image in it
        formData.append("image", image);
        formData.append("recipe", JSON.stringify(editedRecipe));
      } else {
        console.log("else new image case");
        let oldImageRecipe = Object.assign({}, editedRecipe, {
          image: editingRecipe.image,
        });
        formData.append("recipe", JSON.stringify(oldImageRecipe));
      }

      // send FormData to server
      fetch("/editRecipe", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setopenNotifSucess(true);
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
              <MenuItem value={"Min"}>Min</MenuItem>
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
              {!editingRecipe ? "Recipe Added" : "Recipe Updated"}
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
