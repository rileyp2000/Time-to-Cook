const { MongoClient } = require("mongodb");
var mongo = require('mongodb');
let mongoCollection = null;

const hostname = "mongodb://mongo:27017";

let client = null;

async function getRecipesCollection() {
    //if (mongoCollection) return mongoCollection;

    // TODO - Eventually update this to allow the hostname to be configurable
    if (client == null){
        client = new MongoClient(hostname);
    }
    await client.connect();
    console.log("Connected to mongo");

    const db = client.db("time-to-cook");
    mongoCollection = db.collection("recipes");

    return mongoCollection;
}


async function toggleFavorite(id, value){
    const recipes = await getRecipesCollection();
    const filter = {_id: new mongo.ObjectId(id)};
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

async function deleteRecipe(id){
    const recipes = await getRecipesCollection();
    const query =  {_id: new mongo.ObjectId(id)};
    const result = await recipes.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    await client.close();
    client = null;
    return {deleted: result.deletedCount};
}


async function getRecipes() {
    //console.log("hello")
    const collection = await getRecipesCollection();
    let recipes = await collection.find().toArray();
    console.log(recipes.length);
    if (recipes.length === 0)
        return {
            title: 'Snickerdoodles',
            time: '20mins',
            energy: 'Moderate',
            mealType: 'Sweets',
            utensils: ['Measuring spoons', '2 bowls', 'stove', 'baking sheet'],
            ingredients: {
                Snickerdoodles: [
                    '2 ¾ cups all purpose flour',
                    '2tsp cream of tartar',
                    '½ tsp salt',
                    '1tsp baking powder',
                    '1 cup unsalted butter, softened',
                    '2 eggs',
                    '1 tsp vanilla extract'
                ],
                'Cinnamon Sugar Coating:': ['⅓ cup sugar', '2 tbsp cinnamon']
            },
            steps: [
                'Preheat Oven to 350℉',
                'In a large bowl, cream together butter and sugar',
                'Mix flour, cream of tartar, baking soda, and salt together in another bowl and then slowly combine wet and dry ingredients',
                'Combine sugar and cinnamon for the cinnamon sugar coating',
                'Scoop out dough and roll into a ball',
                'Bake for 8-10 minutes'
            ],
            image: { mime: 'image/jpeg', path: '/some/path/to/file' },
            filters: ['No Protein'],
            favorite: false,
            fake: 'true'
        };
    return recipes;
}

async function loadSamples(){
    const collection = await getRecipesCollection();
    let recipes = await collection.insertMany([
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
    await client.close();
    client = null;
    return recipes;
}


module.exports = {
    getRecipes,
    toggleFavorite,
    deleteRecipe,
    loadSamples
};
