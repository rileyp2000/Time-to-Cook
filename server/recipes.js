const { MongoClient } = require("mongodb");
var mongo = require("mongodb");
let mongoCollection = null;
const path = require('path');
var data = require('./recipe_json.js');
require('dotenv').config({path: __dirname + '/.env.docker'});

const hostname = process.env.CONN_STR;

//const hostname = "mongodb://mongo:27017";

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
  } else {
    console.log("Failed to add recipe to collection.");
  }
  await client.close();
  client = null;
  return { added: result.insertedId };
}


async function editRecipe(recipeId, updatedRecipeData) {
    const recipes = await getRecipesCollection();
  
    delete updatedRecipeData._id;
    
    // Update the recipe by ID with the updated recipe data
    const result = await recipes.updateOne({ _id: new mongo.ObjectId(recipeId) }, { $set: updatedRecipeData });

    // if result is acknowledged by the server
    if (result.modifiedCount === 1) {
        console.log(`Recipe ${recipeId} updated`);
    } 
    else {
        console.log(`Recipe ${recipeId} not updated`);
    }
    await client.close();
    client = null;
    return {updated: result.modifiedCount};
}

function makeCaseInsensitive(query){
  let modified  = {};
  for (const k in query){
    if(typeof query[k] === 'boolean'){
      modified[k] = query[k];
    } else {
      modified[k] = new RegExp("^" + query[k].toLowerCase(), "i");
    }
  }
  return modified;
}

async function getRecipes(query) {
  //console.log("hello")
  const collection = await getRecipesCollection();
  if('favorite' in query === true){
    query['favorite'] = query['favorite'] === 'true' ? true : false;
  }
  let recipes = await collection.find(makeCaseInsensitive(query)).toArray();
  console.log(recipes.length);
  if (recipes.length === 0)
    return {
      results: 'No results found for this query'
    };
  
  return recipes;
}

async function loadSamples() {
  const collection = await getRecipesCollection();
  let insertManyresult = null;
  try {
    insertManyresult = await collection.insertMany(data.recipe_data);
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
