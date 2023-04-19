import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  makeStyles,
  autocompleteClasses,
} from "@mui/material";

function FormList() {
  const [numInputs, setNumInputs] = React.useState(1);
  const [inputValues, setInputValues] = React.useState([""]);

  const handleAddInput = () => {
    setNumInputs(numInputs + 1);
    setInputValues([...inputValues, ""]);
  };

  const handleDeleteInput = (index) => {
    setNumInputs(numInputs - 1);
    setInputValues([
      ...inputValues.slice(0, index),
      ...inputValues.slice(index + 1),
    ]);
  };

  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  return (
    <FormGroup
      style={{
        marginTop: 20,
        margin: "auto",
        padding: "16px", // equivalent to theme.spacing(2)
        width: "100%",
      }}
    >
      {[...Array(numInputs)].map((_, index) => (
        <FormControl
          style={{ marginBottom: "16px", width: "100%" }}
          key={index}
        >
          <InputLabel>Utensil {index + 1}</InputLabel>
          <Input
          style={{ width: "100%" }}
            value={inputValues[index]}
            onChange={(event) => handleInputChange(event, index)}
          />
          {index !== 0 && (
            <Button
              variant="outlined"
              color="error"
              style={{
                marginTop: 10,
                width: "20%",
              }}
              onClick={() => handleDeleteInput(index)}
            >
              Delete
            </Button>
          )}
        </FormControl>
      ))}
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: 10, width: "20%" }}
        onClick={handleAddInput}
      >
        Add
      </Button>
    </FormGroup>
  );
}

export default FormList;
