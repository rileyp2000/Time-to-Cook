const { MongoClient } = require("mongodb");
var mongo = require('mongodb');
let mongoCollection = null;

const hostname = "mongodb://mongo:27017";

let client = null;

async function getRecipesCollection() {
  //if (mongoCollection) return mongoCollection;

  // TODO - Eventually update this to allow the hostname to be configurable
  // if (client == null) {
     client = new MongoClient(hostname);
  // }
  await client.connect();
  console.log("Connected to mongo");

  const db = client.db("time-to-cook");
  mongoCollection = db.collection("recipes");

  return mongoCollection;
}


async function toggleFavorite(id, value) {
  const recipes = await getRecipesCollection();
  const filter = { _id: new mongo.ObjectId(id) };
  const update = {
    $set: {
      favorite: value,
    }
  }
  console.log(filter);
  const filter_check = await recipes.find(filter).toArray();
  console.log(filter_check);

  const result = await recipes.updateOne(filter, update);
  await client.close();
  client = null;
  return result
}

async function deleteRecipe(id) {
  const recipes = await getRecipesCollection();
  const query = { _id: new mongo.ObjectId(id) };
  const result = await recipes.deleteOne(query);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
  await client.close();
  client = null;
  return { deleted: result.deletedCount };
}

// the purpose of this function is to add recipes to the database
async function addRecipe(recipeData) {
    const recipes = await getRecipesCollection();
    //delete recipeData._id;
    //const query =  {_id: new mongo.ObjectId(id)};
    const result = await recipes.insertOne(recipeData);
    if (result.acknowledged === true) {
        console.log("Successfully added one recipe.");
    } 
    else {
        console.log("Failed to add recipe to collection.");
    }
    await client.close();
    client = null;
    return {added: result.insertedId};
}


async function editRecipe(recipeId, updatedRecipeData) {
    const recipes = await getRecipesCollection();

    // Update the recipe by ID with the updated recipe data
    const result = await recipes.updateOne({ _id: new mongo.ObjectId(recipeId) }, { $set: updatedRecipeData });

    // if result is acknowledged by the server
    if (result.acknowledged === true) {
        console.log("Recipe ${recipeId} updated");
    } 
    else {
        console.log("Recipe ${recipeId} not updated");
    }
    await client.close();
    client = null;
    return {updated: result.modifiedCount};
}

async function getRecipes(query) {
  //console.log("hello")
  const collection = await getRecipesCollection();
  let recipes = await collection.find(query).toArray();
  console.log(recipes.length);
  if (recipes.length === 0)
    return {
      results: 'No results found for this query'
      // title: 'Snickerdoodles',
      // time: '20mins',
      // energy: 'Moderate',
      // mealType: 'Sweets',
      // utensils: ['Measuring spoons', '2 bowls', 'stove', 'baking sheet'],
      // ingredients: {
      //   Snickerdoodles: [
      //     '2 ¾ cups all purpose flour',
      //     '2tsp cream of tartar',
      //     '½ tsp salt',
      //     '1tsp baking powder',
      //     '1 cup unsalted butter, softened',
      //     '2 eggs',
      //     '1 tsp vanilla extract'
      //   ],
      //   'Cinnamon Sugar Coating:': ['⅓ cup sugar', '2 tbsp cinnamon']
      // },
      // steps: [
      //   'Preheat Oven to 350℉',
      //   'In a large bowl, cream together butter and sugar',
      //   'Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients',
      //   'Combine sugar and cinnamon for the cinnamon sugar coating',
      //   'Scoop out dough and roll into a ball',
      //   'Bake for 8-10 minutes'
      // ],
      // image: { mime: 'image/jpeg', path: '/some/path/to/file' },
      // filters: ['No Protein'],
      // favorite: false,
      // fake: 'true'
    };
  
  return recipes;
}

async function loadSamples() {
  const collection = await getRecipesCollection();
  let insertManyresult = null;
  try {
    insertManyresult = await collection.insertMany([
      {
        "_id": new mongo.ObjectId("6422011aabee3b0007ba19bd"),
        "title": "Snickerdoodles",
        "time": "20mins",
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
        "image": {
          "mime": "image/jpeg",
          "path": "/some/path/to/file"
        },
        "filters": [
          "No Protein"
        ],
        "favorite": false
      },
      {
        "_id": new mongo.ObjectId("64220139abee3b0007ba19be"),
        "title": "Brownies",
        "time": "45mins",
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
        "image": {
          "mime": "image/jpeg",
          "path": "/some/path/to/file"
        },
        "filters": [
          "No Protein"
        ],
        "favorite": false
      }
    ]);
    console.log(`${insertManyresult.insertedCount} documents were inserted.`);
  } catch (e) {
    console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
    let ids = e.result.result.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
    }
    console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
    insertManyresult = {inserted: e.result.result.nInserted};
  }

  await client.close();
  client = null;
  return insertManyresult;
}

async function getFilters() {
  const collection = await getRecipesCollection();
  const eng = await collection.distinct("energy");
  const meal = await collection.distinct("mealType");
  const prot = await collection.distinct("protein");

  console.log(eng);
  console.log(meal);
  console.log(prot);

  return {
    energy: eng,
    mealType: meal,
    protein: prot
  };
}


module.exports = {
    getRecipes,
    toggleFavorite,
    deleteRecipe,
    loadSamples,
    addRecipe,
    editRecipe,
    getFilters,
    addRecipe
};
