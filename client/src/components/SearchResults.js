import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function SearchResults() {
  const array = [
    {
      title: "Snickerdoodles",
      time: "20mins",
      energy: "Moderate",
      mealType: "Sweets",
      utensils: ["Measuring spoons", "2 bowls", "stove", "baking sheet"],
      ingredients: {
        Snickerdoodles: [
          "2 ¾ cups all purpose flour",
          "2tsp cream of tartar",
          "½ tsp salt",
          "1tsp baking powder",
          "1 cup unsalted butter, softened",
          "2 eggs",
          "1 tsp vanilla extract",
        ],
        "Cinnamon Sugar Coating:": ["⅓ cup sugar", "2 tbsp cinnamon"],
      },
      steps: [
        "Preheat Oven to 350℉",
        "In a large bowl, cream together butter and sugar",
        "Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients",
        "Combine sugar and cinnamon for the cinnamon sugar coating",
        "Scoop out dough and roll into a ball",
        "Bake for 8-10 minutes",
      ],
      image: {
        mime: "image/jpeg",
        path: "/some/path/to/file",
      },
      filters: ["No Protein"],
      favorite: false,
    },
    {
      title: "Brownies",
      time: "45mins",
      energy: "Moderate",
      mealType: "Sweets",
      utensils: [
        "Measuring spoons",
        "1 bowl",
        "stove",
        "8x8 pan",
        "spatula",
        "parchment paper",
        "whisk",
        "some patience",
      ],
      ingredients: {
        Brownies: [
          "8oz semi sweet chocolate, chopped",
          "12tbsp melted butter",
          "1 ¼ cup sugar",
          "2 eggs",
          "2tsp vanilla extract",
          "¾ cup all purpose flour",
          "¼ cup cocoa powder",
          "1tsp salt",
        ],
      },
      steps: [
        "Preheat Oven to 350℉",
        "Line an 8x8 pan with parchment paper and grease",
        "Melt 4oz of the chopped chocolate in the microwave",
        "In a large bowl, cream the butter and sugar together with a mixer, then beat in the eggs and vanilla fro 2 minutes until the mixture becomes light and fluffy",
        "Whisk in the melted chocolate",
        "Fold in the remaining 4oz of chopped chocolate and transfer batter to the prepared 8x8 pan",
        "Bake for 20-25 minutes- check using the toothpick method",
        "Eat and burn your mouth because you forgot to let them cool",
      ],
      image: {
        mime: "image/jpeg",
        path: "https://cafedelites.com/wp-content/uploads/2018/02/Best-Fudgiest-Brownies-IMAGE-1001.jpg",
      },
      filters: ["No Protein"],
    },
  ];
  const { query } = useParams(); // Retrieve the search query parameter

  const getRecipe = (recipe) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].title.toLowerCase() == recipe.toLowerCase()) {
        console.log(array[i]);
        return array[i];
      }
    }
    return null;
  };

  const recipe = getRecipe(query);

  // Use the search query to fetch search results from your backend, or render static search results based on the query
  return (
    <div>
      {recipe ? (
        <RecipeCard rec={recipe} />
      ) : (
        <h2>No results found for `{query}`</h2>
      )}
    </div>
  );
}

// SearchResults.propTypes = {
//   query: PropTypes.string.isRequired,
// };

export default SearchResults;
