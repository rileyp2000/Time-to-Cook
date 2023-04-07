import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  makeStyles,
  autocompleteClasses,
} from "@mui/material";

function AddForm() {
  const [unit, setUnit] = React.useState("");

  const handleUnit = (event) => {
    setUnit(event.target.value);
  };

  const [title, setTitle] = React.useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  //time has to be a number?
  const [time, setTime] = React.useState("");

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const [energy, setEnergy] = React.useState("");

  const handleEnergy = (event) => {
    setEnergy(event.target.value);
  };

  const [meal, setMeal] = React.useState("");

  const handleMeal = (event) => {
    setMeal(event.target.value);
  };

  const [numUtensils, setnumUtensils] = React.useState(1);
  const [utensils, setUtensils] = React.useState([""]);

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
  const [steps, setSteps] = React.useState([""]);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const recipe = {
      title: title,
      time: [time, unit],
      energy: energy,
      mealType: meal,
      utensils: utensils,
      ingredients: ingredients.map((ingredient) => ({
        [ingredient.title]: ingredient.items,
      })),
      steps: steps,
      image: { mime: "image/jpeg", path: "/some/path/to/file" },
      filters: ["No Protein"],
      fake: "true",
    };
    console.log(recipe);
    // Send recipe object to the backend using fetch or Axios
    console.log(ingredients);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "grey" }}>Add New Recipe</h1>
      <FormGroup
        style={{
          width: "50%",
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
          <FormControl style={{ marginBottom: "1rem", marginRight: "2rem" }}>
            <InputLabel>Title</InputLabel>
            <Input onChange={handleTitle} required />
          </FormControl>
          <FormControl style={{ flex: "1", marginRight: "2rem" }}>
            <InputLabel>Time</InputLabel>
            <Input onChange={handleTime} required />
          </FormControl>
          <FormControl style={{ flex: "0 0 20%" }}>
            <InputLabel>Unit</InputLabel>
            <Select value={unit} label="Unit" onChange={handleUnit} required>
              <MenuItem value={"Minute"}>Min</MenuItem>
              <MenuItem value={"Hours"}>Hrs</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <FormControl style={{ flex: "1", marginRight: "1rem" }}>
            <InputLabel>Meal Type</InputLabel>
            <Input onChange={handleMeal} required />
          </FormControl>
          <FormControl style={{ flex: "0 0 20%" }}>
            <InputLabel>Energy</InputLabel>
            <Select
              value={energy}
              label="Energy"
              onChange={handleEnergy}
              required
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Difficult"}>Difficult</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        {[...Array(numUtensils)].map((_, index) => (
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: "16px",
              width: "100%",
            }}
            key={index}
          >
            <InputLabel>Utensil {index + 1}</InputLabel>
            <Input
              value={utensils[index]}
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
          style={{ marginTop: 10, width: "20%", marginBottom: 10 }}
          onClick={handleAddUtensil}
        >
          Add Utensil
        </Button>
        {[...Array(numSteps)].map((_, index) => (
          <FormControl
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: "16px",
              width: "100%",
            }}
            key={index}
          >
            <InputLabel>Step {index + 1}</InputLabel>
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
          style={{ marginTop: 10, width: "20%", marginBottom: 10 }}
          onClick={handleAddStep}
        >
          Add Step
        </Button>

        <FormGroup sx={{ marginTop: "1rem" }}>
          {ingredients.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Ingredient Title</InputLabel>
                <Input
                  value={group.title}
                  onChange={(event) =>
                    handleIngredientTitleChange(event, groupIndex)
                  }
                  Ï
                  sx={{ marginBottom: "1rem", width: "80%" }}
                />
              </FormControl>
              {group.items.map((item, itemIndex) => (
                <FormControl
                  key={itemIndex}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    marginBottom: "16px",
                    width: "100%",
                  }}
                >
                  <InputLabel>Ingredient {itemIndex + 1}</InputLabel>
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
                style={{ marginTop: "16px" }}
                onClick={() => {
                  handleAddIngredientItem(groupIndex);
                }}
              >
                Add Ingredient
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={{ marginTop: "16px", marginLeft: "16px" }}
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
              style={{ marginBottom: 24}}
            >
              Add Group
            </Button>
          </Box>
        </FormGroup>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: "1rem", width: "100%" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10, width: "20%" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </FormGroup>
    </div>
  );
}

export default AddForm;
