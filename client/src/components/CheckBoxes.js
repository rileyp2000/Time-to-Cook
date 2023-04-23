import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function Checkboxes(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [parentChecked, setParentChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    const query = selectedOptions.join("|");
    props.onQueryChange(query);
  }, [selectedOptions]);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
  };

  const handleParentChange = (event) => {
    setParentChecked(event.target.checked);
    setIndeterminate(false);
    if (event.target.checked) {
      setSelectedOptions(props.options);
    } else {
      setSelectedOptions([]);
    }
  };

  useEffect(() => {
    if (selectedOptions.length === 0) {
      setParentChecked(false);
      setIndeterminate(false);
    } else if (selectedOptions.length === props.options.length) {
      setParentChecked(true);
      setIndeterminate(false);
    } else {
      setIndeterminate(true);
    }
  }, [selectedOptions]);

  const children = props.options.map((option) => (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }} key={option}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedOptions.includes(option)}
            onChange={handleOptionChange}
            value={option}
          />
        }
        label={option}
      />
    </Box>
  ));

  return (
    <div>
      {props.parentButton && (
        <FormControlLabel
          label={props.parentButton}
          control={
            <Checkbox
              checked={parentChecked}
              indeterminate={indeterminate}
              onChange={handleParentChange}
            />
          }
        />
      )}
      {children}
    </div>
  );
}

Checkboxes.propTypes = {
  options: PropTypes.array.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  parentButton: PropTypes.node,
};

export default Checkboxes;
