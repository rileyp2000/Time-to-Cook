const express = require("express");
const multer = require("multer");

const app = express();
const { MongoClient } = require('mongodb');
const { getRecipes, toggleFavorite, deleteRecipe, loadSamples, getFilters, addRecipe, editRecipe } = require("./recipes.js");
const path = require('path');
require('dotenv').config({path: __dirname + '/.env.docker'});

const port = process.env.PORT; //5000;
//app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'build')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, JSON.parse(req.body.recipe).title + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/getFilters', (req, res) => {
  console.log("/getFilters");
  getFilters()
    .then(filters => res.json(filters));
});

app.get("/getRecipes", (req, res) => {
  console.log("/getRecipes");
  console.log(req.query);
  getRecipes(req.query)
    .then(recipes => res.json(recipes));
  //res.status(200).send("please work");
});

app.post("/toggleFavorite", (req, res) => {
  console.log("/toggleFavorite");
  console.log(req.body);
  toggleFavorite(req.body._id, req.body.value).then((result) =>
    res.send(result)
  );
  //res.status(200).send("please work");
});

app.post("/deleteRecipe", (req, res) => {
  console.log("/deleteRecipe");
  console.log(req.body);
  deleteRecipe(req.body._id).then((result) => res.json(result));
  //res.status(200).send("please work");
});

// the purpose of this method is to have the functionality of adding new recipes to the interface
// takes in an endpot that says /addRecipe uisng a post request
app.post("/addRecipe", upload.single('image'), (req, res) => {
  // pass the body into the reqest
  console.log("/addRecipe");
  console.log(req.body.recipe);
  let recipe = JSON.parse(req.body.recipe);
  if(req.file != null){
    // take file, store on local machine
    // get name of file, append path, and save to json object
    const imgName = {"image": "images/" + recipe.title + path.extname(req.file.originalname)};
    recipe = {...recipe, ...imgName}; 
    console.log("change" + recipe);
  } else {
    const imgName = {"image": "images/" + "placeholder.png"};
    recipe = {...recipe, ...imgName}; 
  }
  // delete req.body._id;
  // take whole body to pass to function that has the add function (in recipes.js)
  addRecipe(recipe)
    .then((result) => res.json(result))
    .catch((error) => {
      console.error("Error adding recipe:", error);
      res.status(500).json({ error: "Failed to add recipe" });
    });
});

// the purpose of this method is to have the functionality of editing recipes entities already in the interface
// takes in an endpoint that says /editRecipe using a post request
//TODO: MAKE THIS MATCH ADD
app.post('/editRecipe', (req, res) => {
  // get the recipe ID from request body
  const recipeId = req.body._id;
  if (!recipeId) {
    return res.status(400).json({error: "No Recipe ID matches"});
  }

  // take whole body to pass to function that has the edit function (in recipes.js) 
  console.log("/editRecipe");
  console.log(req.body);

  // Call the function in recipes.js to update the recipe by ID
  editRecipe(recipeId, req.body)
    .then(result => res.json(result))
    .catch(error => {
      console.error("Error editing recipe:", error);
      res.status(500).json({error: "Failed to edit recipe"});
    });
});

app.get("/devpreload", (req, res) => {
  console.log("Loading sample data...");
  loadSamples().then((result) => res.json(result));
  //res.status(200).send("please work");
});


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
