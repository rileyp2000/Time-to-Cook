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

  const [protein, setProtein] = React.useState(editingRecipe?.protein || "");

  const handleProtein = (event) => {
    setProtein(event.target.value);
  };

  const [meal, setMeal] = React.useState("");

  const handleMeal = (event) => {
    setMeal(event.target.value);
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

  const [numIngredient, setNumIngredient] = React.useState(1);
  const [ingredients, setIngredients] = React.useState([
    { title: "", items: [""] },
  ]);

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
  const handleImageUpload = (image) => {
    console.log("Image path", image);
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
      isFormValid = true;
    }

    // Check for time
    if (!time) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        time: true,
      }));
      isFormValid = false;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        time: false,
      }));
      isFormValid = true;
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
      isFormValid = true;
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
      isFormValid = true;
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
      isFormValid = true;
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
      isFormValid = true;
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
      isFormValid = true;
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
        isFormValid = true;
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
      isFormValid = true;
    }

    // Show Snackbar error message if form is not valid
    if (!isFormValid) {
      console.log("error");
      setopenNotifFail(true);
      return;
    }

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
      image: { mime: "image/jpeg", path: "/some/path/to/file" },
      filters: protein,
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
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "grey" }}>Add New Recipe</h1>
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
            <InputLabel sx={{ fontSize: 22 }}>Meal Type</InputLabel>
            <Input
              onChange={handleMeal}
              required
              defaultValue={editingRecipe?.mealType || ""}
            />
            {formErrors.meal && (
              <FormHelperText id="component-error-text">Error</FormHelperText>
            )}
          </FormControl>
          <FormControl
            style={{ flex: "0 0 20%", marginRight: 20 }}
            error={formErrors.protein}
          >
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
              <MenuItem value={"No Protein"}>No Protein</MenuItem>
            </Select>
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

        <UploadImage onImageUpload={handleImageUpload}></UploadImage>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: "1rem", width: "100%" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10, width: "20%", fontSize: 16 }}
            onClick={handleSubmit}
          >
            Submit
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
              Please fill required form
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
