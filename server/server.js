const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
 
	});
	console.log(`Server is running on port: ${port}`);
});

// GET route for title
app.get('/gettitle', (req, res) => {
   res.status(200).json({ mealType: "Snickerdoodles" });
   })

// POST method route
app.post('/gettitle', (req, res) => {
  res.status(200).json({ mealType: "Snickerdoodles" });
})

// GET route
app.get('/gettime', (req, res) => {
  res.status(200).json({ mealType: "20min" });
})

// POST method route
app.post('/gettime', (req, res) => {
 res.status(200).json({ mealType: "20min" });
})

// GET route
app.get('/getenergy', (req, res) => {
  res.status(200).json({ mealType: "Moderate" });
})

// POST method route
app.post('/getenergy', (req, res) => {
  res.status(200).json({ mealType: "Moderate" });
})

// GET route
app.get('/getmealType', (req, res) => {
  res.status(200).json({ mealType: "Sweets" });
});

// POST method route 
app.post('/getmealType', (req, res) => {
  res.status(200).json({ mealType: "Sweets" });
});

// GET route for utensils
app.get('/getutensils', (req, res) => {
  const utensils = ["Measuring spoons", "2 bowls", "stove", "baking sheet"];
  res.status(200).json({ utensils });
});

// POST route to receive utensils list
app.post('/getutensils', (req, res) => {
   const utensils = ["Measuring spoons", "2 bowls", "stove", "baking sheet"];
   res.status(200).json({ utensils });
});

// GET route
app.get('/getingredients', (req, res) => {
  const ingredients = {
    Snickerdoodles: [
      "2 ¾ cups all purpose flour",
      "2tsp cream of tartar",
      "½ tsp salt",
      "1tsp baking powder",
      "1 cup unsalted butter, softened",
      "2 eggs",
      "1 tsp vanilla extract"
    ],
    CinnamonSugarCoating: [
      "⅓ cup sugar",
      "2 tbsp cinnamon"
    ]
  }
  res.status(200).json(ingredients);
});

// POST method route
app.post('/getingredients', (req, res) => {
  const ingredients = {
    Snickerdoodles: [
      "2 ¾ cups all purpose flour",
      "2tsp cream of tartar",
      "½ tsp salt",
      "1tsp baking powder",
      "1 cup unsalted butter, softened",
      "2 eggs",
      "1 tsp vanilla extract"
    ],
    CinnamonSugarCoating: [
      "⅓ cup sugar",
      "2 tbsp cinnamon"
    ]
  }
  res.status(200).json(ingredients);
});

app.get('/steps', (req, res) => {
  const steps = ["Preheat Oven to 350℉",
    "In a large bowl, cream together butter and sugar",
    "Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients",
    "Combine sugar and cinnamon for the cinnamon sugar coating",
    "Scoop out dough and roll into a ball",
    "Bake for 8-10 minutes"];
  res.status(200).json({ steps });
})

// POST method route
app.post('/steps', (req, res) => {
  const steps = ["Preheat Oven to 350℉",
    "In a large bowl, cream together butter and sugar",
    "Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients",
    "Combine sugar and cinnamon for the cinnamon sugar coating",
    "Scoop out dough and roll into a ball",
    "Bake for 8-10 minutes"];
  res.status(200).json({ steps });
})

// GET route
app.get('/getimage', (req, res) => {
  const image = req.body.image;
  res.status(200).json({ image });
});

// POST method route
app.post('/getimage', (req, res) => {
  const image = req.body.image;
  res.status(200).json({ image });
});

// GET route
app.get('/getfilters', (req, res) => {
  const filters = req.body.filters;
  res.status(200).json({ message: `Results filtered by: ${filters.join(', ')}` });
})

// POST method route
app.post('/filter', (req, res) => {
  const filters = req.body.filters;
  res.status(200).json({ message: `Results filtered by: ${filters.join(', ')}` });
});




db.collection.find({ field: value })

db.collection.find({
  "title": "Snickerdoodles",
  "time": "20 mins"	
  "mealType": "Sweets",
  "energy": "Moderate"	
})

db.collection.find({
  "utensils": {
    $in: ["Measuring spoons",
    "2 bowls",
    "stove",
    "baking sheet"]
  }
})

db.collection.find({
  "ingredients.Snickerdoodles": {
    $exists: true
  }
})

db.collection.find({
  "ingredients.CinnamonSugarCoating": {
    $exists: true
  }
})

db.collection.find({
  "steps": {
    $in: ["Preheat Oven to 350℉",
    "In a large bowl, cream together butter and sugar",
    "Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients",
    "Combine sugar and cinnamon for the cinnamon sugar coating",
    "Scoop out dough and roll into a ball",
    "Bake for 8-10 minutes"]
  }
})

db.collection.find({ "image.mime": "image/jpeg" })

db.collection.find({
  "filters": { "$nin": ["Protein"] }
})
