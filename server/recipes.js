const { MongoClient } = require("mongodb");

let mongoCollection = null;

/**
 * Get a connected Mongo collection. This utility will ensure we only connect
 * to the database once, ensuring follow-up requests are quick.
 * @returns A configured and connection Mongo collection object
 */
async function getRecipesCollection() {
    //if (mongoCollection) return mongoCollection;

    // TODO - Eventually update this to allow the hostname to be configurable
    const client = new MongoClient("mongodb://mongo:27017");
    await client.connect();
    console.log("Connected to mongo");

    const db = client.db("time-to-cook");
    mongoCollection = db.collection("recipes");

    return mongoCollection;
}

/**
 * Get a random meme url to display. If none found in the database, fall back
 * to a standard "404"-type image.
 * @returns {string} A meme url
 */
async function getRecipes() {
    console.log("hello")
    const collection = await getRecipesCollection();
    const recipes = await collection.find().toArray();
    console.log(recipes);
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
            fake: 'true'
        };
    return recipes;
}

module.exports = {
    getRecipes,
};
