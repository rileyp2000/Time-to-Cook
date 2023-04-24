import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function Checkboxes({
  title,
  options,
  onQueryChange,
  selectedOptions: initialSelectedOptions,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions || []
  );

  // useEffect(() => {
  //   console.log("selected options in checkBoxes are:", selectedOptions);
  //   let query = "";
  //   if (selectedOptions.length > 0) {
  //     query = selectedOptions.join("|");
  //   }
  //   onQueryChange(query);
  // }, [selectedOptions]);

  useEffect(() => {
    console.log("selected options in checkBoxes are:", selectedOptions);
    const nonEmptySelectedOptions = selectedOptions.filter(
      (option) => option !== ""
    );
    const query =
      nonEmptySelectedOptions.length > 0
        ? nonEmptySelectedOptions.join("|")
        : "";
    onQueryChange(query);
  }, [selectedOptions]);

  const handleOptionChange = (event) => {
    console.log("handleOptionChange is:", event.target.value);
    const option = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
  };

  const children = options.map((option) => (
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
      <h3
        style={{
          borderBottom: "1px solid grey",
          marginTop: "2rem",
          width: "30%",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

Checkboxes.propTypes = {
  options: PropTypes.array.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selectedOptions: PropTypes.array,
};

export default Checkboxes;
