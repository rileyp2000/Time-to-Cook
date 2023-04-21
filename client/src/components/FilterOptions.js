import React, { useState } from 'react';
import RadioButtons from './RadioButtons';

const Menu = () => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const proteinOptions = ['Beef', 'Pork', 'Turkey', 'Clam', 'Crab', 'Englishman'];
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const energyOptions = ['Easy', 'Moderate', 'Difficult'];
  const [proteinQuery, setProteinQuery] = useState('');
  const [mealQuery, setMealQuery] = useState('');
  const [energyQuery, setEnergyQuery] = useState('');
  

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeProtein = (newQuery) => {
    setProteinQuery(newQuery);
    buildQuery(newQuery, mealQuery, energyQuery);
  }

  const changeMeal = (newQuery) => {
    setMealQuery(newQuery);
    buildQuery(proteinQuery, newQuery, energyQuery);
  }

  const changeEnergy = (newQuery) => {
    setEnergyQuery(newQuery);
    buildQuery(proteinQuery, mealQuery, newQuery);
  }

  const buildQuery = (query1, query2, query3) => {
    setQuery('getRecipes?protein='+ query1 + '&mealType=' + query2 + '&energy=' + query3);
  }

  return (
    <div className="Filtering Options">
      <div className="menu-header" onClick={handleMenuClick}>
        <h3>Advanced Filters</h3>
        <button>{isMenuOpen ? '-' : '+'}</button>
      </div>
      {isMenuOpen && (
        <div className="menu-options">
          <h1>Select a Protein:</h1>
          <RadioButtons options={proteinOptions} onQueryChange={changeProtein}/>
          <h1>Select a Meal Type:</h1>
          <RadioButtons options={mealOptions} onQueryChange={changeMeal}/>
          <h1>Select an Energy Level:</h1>
          <RadioButtons options={energyOptions} onQueryChange={changeEnergy}/>
          <p>query string: {query}</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
