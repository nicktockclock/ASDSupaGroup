using RecipeApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace RecipeApi.Services
{
    public class RecipeService
    {
        private readonly IMongoCollection<Recipe> _recipes;

        public RecipeService(IRecipeDatabaseSettings settings)
        {
            var client = new MongoClient("mongodb://admin:ASDSupa1@ds147746.mlab.com:47746/heroku_1dvlrfcm?retryWrites=false");
            var database = client.GetDatabase("heroku_1dvlrfcm");

            _recipes = database.GetCollection<Recipe>("Recipes");
        }

        public List<Recipe> Get() =>
            _recipes.Find(recipe => true).ToList();

        public Recipe Get(string id) =>
            _recipes.Find<Recipe>(recipe => recipe.Id == id).FirstOrDefault();

        public Recipe Create(Recipe recipe)
        {
            _recipes.InsertOne(recipe);
            return recipe;
        }

        public void Update(string id, Recipe recipeIn) =>
            _recipes.ReplaceOne(recipe => recipe.Id == id, recipeIn);

        public void Remove(Recipe recipeIn) =>
            _recipes.DeleteOne(recipe => recipe.Id == recipeIn.Id);

        public void Remove(string id) => 
            _recipes.DeleteOne(recipe => recipe.Id == id);
    }
}