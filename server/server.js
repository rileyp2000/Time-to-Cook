const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const {
  getRecipes,
  toggleFavorite,
  deleteRecipe,
  loadSamples,
  addRecipe,
} = require("./recipes.js");
//const cors = require("cors");
//require("dotenv").config({ path: "./config.env" });
const port = 5000;
const url = process.env.CONN_STR;
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

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/getAll", (req, res) => {
  res.json({
    rec: [
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
          path: "/some/path/to/file",
        },
        filters: ["No Protein"],
        favorite: false,
      },
    ],
  });
});

app.get("/filters", (req, res) => {
  res.status(200).json({
    filters: [
      "time",
      { energy: ["Easy", "Moderate", "Difficult"] },
      { mealType: ["Breakfast", "Lunch", "Dinner", "Sweets"] },
    ],
  });
});

app.get("/getRecipes", (req, res) => {
  console.log("/getRecipes");
  getRecipes().then((recipes) => res.json(recipes));
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
// takes in an endpot that says /addrecipe uisng a post request
app.post("/addRecipe", (req, res) => {
  // pass the body into the reqest
  console.log("/addRecipe");
  console.log(req.body);
  // delete req.body._id;
  // take whole body to pass to function that has the add function (in recipes.js)
  addRecipe(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      console.error("Error adding recipe:", error);
      res.status(500).json({ error: "Failed to add recipe" });
    });
});

app.get("/devpreload", (req, res) => {
  console.log("Loading sample data...");
  loadSamples().then((result) => res.json(result));
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

app.get("/", (req, res) => {
  //console.log("hello there");
  res.status(200).send("Welcome to the backend!");
});
