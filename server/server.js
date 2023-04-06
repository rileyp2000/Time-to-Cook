const express = require("express");
const app = express();
const { MongoClient } = require('mongodb');
const { getRecipes, toggleFavorite, deleteRecipe, loadSamples, getFilters } = require("./recipes.js");
//const cors = require("cors");
//require("dotenv").config({ path: "./config.env" });
const port = 5000;
const url = process.env.CONN_STR
//app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));
// get driver connection
//const dbo = require("./db/conn");

//const client = new MongoClient(uri);
// try {
//   // Connect to the MongoDB cluster
//   await client.connect();
//   const db = client.db("recipe-info");
//   const coll = db.collection("reicpes");
  
//   const result = await coll.insertOne(ex);
//     // display the results of your operation
//     console.log(result.insertedIds);

// } catch (e) {
//   console.error(e);
// } finally {
//   // Ensures that the client will close when you finish/error
//   await client.close();
// }

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/getFilters', (req, res) => {
  console.log("/getFilters");
  getFilters()
    .then(filters => res.json(filters));
});

app.get('/getRecipes', (req, res) => {
  console.log("/getRecipes");
  console.log(req.query);
  getRecipes(req.query)
    .then(recipes => res.json(recipes));
  //res.status(200).send("please work");
});

app.post('/toggleFavorite', (req, res) => {
  console.log("/toggleFavorite");
  console.log(req.body);
  toggleFavorite(req.body._id, req.body.value)
    .then(result => res.send(result));
  //res.status(200).send("please work");
});

app.post('/deleteRecipe', (req, res) => {
  console.log("/deleteRecipe");
  console.log(req.body);
  deleteRecipe(req.body._id)
    .then(result => res.json(result));
  //res.status(200).send("please work");
});

app.get('/devpreload', (req, res) => {
  console.log("Loading sample data...");
  loadSamples()
    .then(result => res.json(result));
  //res.status(200).send("please work");
});


// app.get('/getrecipes', (req, res) => {
//   res.status(200).json([{
//     title: 'Snickerdoodles',
//     _id: '123123131123123',
//     time: '20mins',
//     energy: 'Moderate',
//     mealType: 'Sweets',
//     utensils: ['Measuring spoons', '2 bowls', 'stove', 'baking sheet'],
//     ingredients: {
//       Snickerdoodles: [
//         '2 ¾ cups all purpose flour',
//         '2tsp cream of tartar',
//         '½ tsp salt',
//         '1tsp baking powder',
//         '1 cup unsalted butter, softened',
//         '2 eggs',
//         '1 tsp vanilla extract'
//       ],
//       'Cinnamon Sugar Coating:': ['⅓ cup sugar', '2 tbsp cinnamon']
//     },
//     steps: [
//       'Preheat Oven to 350℉',
//       'In a large bowl, cream together butter and sugar',
//       'Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients',
//       'Combine sugar and cinnamon for the cinnamon sugar coating',
//       'Scoop out dough and roll into a ball',
//       'Bake for 8-10 minutes'
//     ],
//     image: { mime: 'image/jpeg', path: '/some/path/to/file' },
//     filters: ['No Protein'],
//     favorite: false
//   }]);
// });



app.get('/', (req, res) => {
  //console.log("hello there");
  res.status(200).send("Welcome to the backend!");
})
