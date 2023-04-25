var mongo = require("mongodb");
const recipes = [
  {
    "title": "French Toast",
    "time": ["15", "Min"],
    "energy": "Easy",
    "mealType": "Breakfast",
    "utensils": [
      "Measuring spoons",
      "1 bowl",
      "stove",
      "pan",
      "spatula",
      "whisk"
    ],
    "ingredients": {
      "French Toast": [
        "6 thick slices of bread",
        "2 eggs",
        "⅔ cup milk",
        "1 tsp vanilla extract",
        "¼ tsp ground cinnamon",
        "Salt to taste",
        "1 tbsp butter"
      ]
    },
    "steps": [
      "Whisk the milk, eggs, vanilla, cinnamon, and salt together in a bowl",
      "Butter the pan and heat over medium heat",
      "Dunk each slice of bread into the egg mixture, making sure to coat both sides",
      "Transfer the wet egg bread into the heated pan and cook on each side until golden brown",
      "Serve"
    ],
    "protein": "No Protein",
    "favorite": false,
    "image": "images/french-toast.jpg"
  }, 
  {
    "title": "Slow Cooker Mashed Potatoes",
    "time": ["4", "Hrs"],
    "energy": "Moderate",
    "mealType": "Side Dish",
    "utensils": [
      "Measuring spoons",
      "cutting board",
      "slow cooker",
      "knife"
    ],
    "ingredients": {
      "Slow Cooker Mashed Potatoes": [
        "4lbs potatoes",
        "1 ½ cups butter",
        "1tbsp salt",
        "1tsp pepper",
        "½ tsp paprika",
        "1 cup water",
        "1 ½ cups milk",
        "Garlic seasoned from the heart"
      ]
    },
    "steps": [
      "Peel and dice potatoes into ~1in cubes",
      "Dump all ingredients except for the milk into crock pot",
      "Cook on high for 4 hours",
      "Remove the lid and mash the potatoes, mixing in the milk as you go",
      "Eat"
    ],
    "protein": "No Protein",
    "favorite": false,
    "image": "images/crock-pot-mashed-potatoes.jpg"
  }, 
  {
    "title": "Banana Bread",
    "time": ["470", "Min"],
    "energy": "Moderate",
    "mealType": "Sweets",
    "utensils": [
      "Measuring spoons",
      "1  bowl",
      "oven",
      "fork",
      "loaf pan 8x4"
    ],
    "ingredients": {
      "Banana Bread": [
        "2-3 ripe bananas",
        "⅓ cup butter",
        "½ tsp baking soda",
        "Pinch of salt",
        "¾ cup sugar",
        "1 egg",
        "1tsp vanilla extract",
        "1 ½ cups flour",
        "½ cup chocolate chips"
      ]
    },
    "steps": [
      "Preheat Oven to 350℉",
      "Grease a loaf pan 8x4",
      "Mash the bananas in a bowl. Melt the butter and incorporate into the mashed bananas",
      "Beat the egg and add it. Then add the sugar and vanilla, baking soda, and salt. Stir",
      "Mix in the flour. It will be lumpy",
      "Make it more lumpy by mixing in the chocolate chips",
      "Pour the batter into the greased loaf pan and bake for 55-65 minutes. Make sure to check the center with a toothpick",
      "If the outside is brown, but the center is wet, cover with foil and continue cooking until cooked through"
    ],
    "protein": "No Protein",
    "favorite": false,
    "image": "images/banana-bread.jpeg"
  }, 
  {
    "title": "Sausage Strata",
    "time": ["1.20", "Hrs"],
    "energy": "Moderate",
    "mealType": "Breakfast",
    "utensils": [
      "Measuring spoons",
      "1  bowl",
      "stove",
      "9x13 glass baking dish",
      "stovetop pan",
      "cutting board",
      "knife"
    ],
    "ingredients": {
      "Sausage Strata": [
        "1.5lbs sausage",
        "9 eggs",
        "3 cups milk",
        "¼ tsp dry mustard",
        "1tsp salt",
        "12 slices of bread, cubed",
        "½ onion",
        "½ green pepper",
        "12oz shredded cheddar cheese"
      ]
    },
    "steps": [
      "Preheat Oven to 350℉",
      "Grease a 9x13 glass baking dish",
      "Brown the sausage in a pan and drain. Add to the bottom of the baking dish",
      "Chop up green pepper and onion into cubes",
      "Beat eggs for 2-3 minutes and then add salt, milk, and mustard. Beat well",
      "Stir in the cubed bread, cheese, green pepper, and onion",
      "Pour the weird bread/egg mixture over top of the sausage in the dish",
      "Bake for 45-50 minutes"
    ],
    "protein": "No Protein",
    "favorite": false,
    "image": "images/sausage-strata.jpg"
  },
  {
    "title": "Meatballs",
    "time": ["45", "Min"],
    "energy": "Moderate",
    "mealType": "Dinner",
    "utensils": ["Measuring spoons", "1 bowl", "stovetop", "pan", "baking sheet"],
    "ingredients": {
      "Meatballs": ["1lb ground beef (preferably 80% or above)", "½ lb mild sausage", "¼ onion- diced", "¼ cup finely shredded parmesan", "½ tsp paprika", "1tsp salt", "½ tsp pepper", "Garlic seasoned from the heart", "1 egg, ½ cup breadcrumbs (panko)", "2 tablespoons mayo", "2 tablespoon olive oil"]
    },
    "steps": ["Preheat Oven to 400℉", "Mix all ingredients but the olive oil in a medium bowl", "Using your hands, take about 2tbs worth of meat mixture, and form it into a packed ball. Continue this until your bowl is empty and you have an army of uncooked meatballs.", "Oil a pan using the olive oil and, over medium heat, give each meatball a couple minutes of cooking on 3 sides. I know they’re spheres and don’t have sides.", "Transfer the half-cooked meatballs to a foil-lined baking tray and bake for 20 minutes or until the insides are up to temp."],
    "protein": "Beef",
    "favorite": false,
    image: "images/meatballs.jpg"
  },
  {
    "_id": new mongo.ObjectId("6422011aabee3b0007ba19bd"),
    "title": "Snickerdoodles",
    "time": ["20", "Mins"],
    "energy": "Moderate",
    "mealType": "Sweets",
    "utensils": [
      "Measuring spoons",
      "2 bowls",
      "stove",
      "baking sheet"
    ],
    "ingredients": {
      "Snickerdoodles": [
        "2 ¾ cups all purpose flour",
        "2tsp cream of tartar",
        "½ tsp salt",
        "1tsp baking powder",
        "1 cup unsalted butter, softened",
        "2 eggs",
        "1 tsp vanilla extract"
      ],
      "Cinnamon Sugar Coating:": [
        "⅓ cup sugar",
        "2 tbsp cinnamon"
      ]
    },
    "steps": [
      "Preheat Oven to 350℉",
      "In a large bowl, cream together butter and sugar",
      "Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients",
      "Combine sugar and cinnamon for the cinnamon sugar coating",
      "Scoop out dough and roll into a ball",
      "Bake for 8-10 minutes"
    ],
    "protein": "No protein",
    "favorite": false,
    "image": "images/snickerdoodles.jpg"
  },
  {
    "_id": new mongo.ObjectId("64220139abee3b0007ba19be"),
    "title": "Brownies",
    "time": ["45", "Min"],
    "energy": "Moderate",
    "mealType": "Sweets",
    "utensils": [
      "Measuring spoons",
      "1 bowl",
      "stove",
      "8x8 pan",
      "spatula",
      "parchment paper",
      "whisk",
      "some patience"
    ],
    "ingredients": {
      "Brownies": [
        "8oz semi sweet chocolate, chopped",
        "12tbsp melted butter",
        "1 ¼ cup sugar",
        "2 eggs",
        "2tsp vanilla extract",
        "¾ cup all purpose flour",
        "¼ cup cocoa powder",
        "1tsp salt"
      ]
    },
    "steps": [
      "Preheat Oven to 350℉",
      "Line an 8x8 pan with parchment paper and grease",
      "Melt 4oz of the chopped chocolate in the microwave",
      "In a large bowl, cream the butter and sugar together with a mixer, then beat in the eggs and vanilla fro 2 minutes until the mixture becomes light and fluffy",
      "Whisk in the melted chocolate",
      "Fold in the remaining 4oz of chopped chocolate and transfer batter to the prepared 8x8 pan",
      "Bake for 20-25 minutes- check using the toothpick method",
      "Eat and burn your mouth because you forgot to let them cool"
    ],
    "protein": "No protein",
    "favorite": false,
    "image": "images/brownies.jpg"
  },
  {
    "title": "Slow Cooker Honey Teriyaki Chicken",
    "time": ["4.33", "Hrs"],
    "energy": "Easy",
    "mealType": "Dinner",
    "utensils": ["Measuring spoons", "slow cooker", "spoon"],
    "ingredients": {
      "Slow Cooker Honey Teriyaki Chicken": ["2lbs chicken breasts", "½ cup soy sauce", "½ cup honey", "¼ cup rice wine vinegar", "½ chopped onion", "2 cloves garlic", "1tsp ginger", "Pepper?", "3tbsp corn flour", "¼ cup water"],
    },
    "steps": [
      "Reminder to set your rice to cook if serving over rice.",
      "You could mix the sauce in a separate bowl, but that adds on dishes to do later. Alternatively: mix the soy sauce, ginger, onion, rice wine vinegar, garlic, and pepper inside the crock pot first.",
      "Add oil to the mixture as well as the chicken breasts.",
      "Because we took a shortcut and didn’t mix the sauce in a separate bowl, make sure to mix the sauce thoroughly over the chicken.",
      "Cover and cook on high for 3-4hrs.",
      "Remove chicken and drain. Shred using a couple of forks and some determination.",
      "Return the sauce drained to the now shredded chicken and mix.",
      "Serve on top of rice."
    ],
    "protein": "Chicken",
    "favorite": false,
    "image": "images/slow-cooker-honey-teriyaki-chicken.jpg"
  },  
  {
    "title": "Beef and Broccoli",
    "time": ["30", "Min"],
    "energy": "Moderate",
    "mealType": "Dinner",
    "utensils": ["Measuring spoons", "measuring cups", "pan", "small bowl", "cutting board", "knife", "spoon"],
    "ingredients": {
      "Beef and Broccoli": ["1lb steak(literally find what is on sale)", "4 cups broccoli florets", "3 cloves minced garlic", "½tsp ginger", "2tbsp sesame oil", "⅓ cup soy sauce", "¼ cup brown sugar", "¼ cup honey", "1 cup beef broth", "2tbsp cornstarch", "2tbsp water"]
    },
    "steps": [
      "If you are making this with rice, set the rice up in a rice cooker before you start",
      "Chop up your broccoli and steak. The steak should be cut in ~1\" slices",
      "In an oiled skillet, sear the steak over medium-high heat until proper temp is achieved. Then remove the steak",
      "Add more oil to the pan and add garlic and ginger. Saute until soft",
      "To the same pan, add sesame oil, soy sauce, brown sugar, honey, and beef broth. Stir together",
      "Add broccoli. You can pre-steam them beforehand for a softer texture",
      "In a bowl, combine the cornstarch and water. Add this to the pan with the broccoli and boil",
      "Add the steak back into the pan with the broccoli and sauce when the sauce has thickened"
      
    ],
    "protein": "Beef",
    "favorite": false,
    "image": "images/beef-and-broccoli.jpg"
  },
  {
    "title": "Slow Cooker Beef Stew",
    "time": ["4.33", "Hrs"],
    "energy": "Moderate",
    "mealType": "Dinner",
    "utensils": ["Measuring spoons", "1 bowl", "crock pot", "knife", "cutting board"],
    "ingredients": {
      "Slow Cooker Beef Stew": ["¼ cup flour", "½ tsp black pepper", "½ tsp garlic powder", "1 tsp salt", "2 lbs stew meat (or cut up chuck roast)", "4 tbsp olive oil", "3 tbsp butter", "2 cups onion", "4 cloves garlic", "1 cup red wine (optional)", "4 cups beef broth", "2 beef bouillon cubes", "2tbsp worcestershire sauce", "3 tbsp tomato paste", "5 medium carrots", "1lb golden potatoes", "2 bay leaves", "Sprig of rosemary", "¼ cup cold water", "3 tbsp cornstarch"]
    },
    "steps": [
      "Cut meat, potatoes, onions, and carrots into 1 inch pieces",
      "Mix everything but the water, cornstarch, and 2 tbsp butter into the crock pot",
      "Cook on high for 4 hrs",
      "After cooking, mix the leftover water and cornstarch together and add to the pot. Mix to thicken",
      "Then, add the last 2 tbsp of butter and mix",
      "Serve" 
    ],
    "protein": "Beef",
    "favorite": false,
    "image": "images/slow-cooker-beef-stew.jpg"
  },
  {
    "title": "Grandma’s Herb Pretzels",
    "time": ["1.33", "Hrs"],
    "energy": "Easy",
    "mealType": "?????",
    "utensils": ["bowl", "spatula", "pan"],
    "ingredients": {
      "Grandma’s Herb Pretzels": ["12oz Redenbacher PopCorn Oil", "32oz small pretzels", "1pkg hidden valley dry ranch dressing", "½ tsp garlic powder", "1tsp onion powder", "2tbsp dry dill weed"]
    },
    "steps": [
      "Mix the dry ingredients and then add oil and stir",
      "Pour a little at a time over the pretzels in a large pan",
      "Stir the coated pretzels every 15 minutes until the pretzels look dry",
      "Takes about 4-5 stirs"
    ],
    "protein": "No Protein",
    "favorite": false,
    "image": "images/grandma-herb-pretzel.jpg"
  }
];


exports.recipe_data = recipes;