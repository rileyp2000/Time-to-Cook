// import React, { useState, useEffect } from "react";

// function RadioButtons(props) {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     setQuery(selectedOptions.join("|"));
//     props.onQueryChange(selectedOptions.join("|"));
//   }, [selectedOptions]);

//   const handleOptionChange = (event) => {
//     const option = event.target.value;
//     if (event.target.checked) {
//       setSelectedOptions([...selectedOptions, option]);
//     } else {
//       setSelectedOptions(selectedOptions.filter((o) => o !== option));
//     }
//   };

//   return (
//     <div>
//       {props.options.map((option, index) => (
//         <label key={index}>
//           <input
//             type="checkbox"
//             value={option}
//             checked={selectedOptions.includes(option)}
//             onChange={handleOptionChange}
//           />
//           {option}
//         </label>
//       ))}
//       {query && <p>query string: {query}</p>}
//     </div>
//   );
// }

// export default RadioButtons;
