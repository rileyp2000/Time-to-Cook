import React, { useState } from 'react';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsMenuOpen(false);
  };

  return (
    <div className="Filtering Options">
      <div className="menu-header" onClick={handleMenuClick}>
        <h3>Advanced Filters</h3>
        <button>{isMenuOpen ? '-' : '+'}</button>
      </div>
      {isMenuOpen && (
        <div className="menu-options">
          
          <select name="Main Protein" id="proteins">
            <option value="Any Protein">Any Protein</option>
            <option value="Beef">Beef</option>
            <option value="Chicken">Chicken</option>
            <option value="Fish">Fish</option>
            <option value="Pork">Pork</option>
          </select>

          <select name="Meal Type" id="meals">
            <option value="Any Meal Type">Any Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Other">Other</option>
          </select>

          <select name="Energy" id="energy">
            <option value="Any Energy Level">Any Energy Level</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>
      )}
      {selectedOption && (
        <div className="selected-option">
          You have selected: {selectedOption}
        </div>
      )}
    </div>
  );
};

export default Menu;
