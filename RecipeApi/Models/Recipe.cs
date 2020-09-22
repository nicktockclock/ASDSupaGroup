using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RecipeApi.Models
{
    public class Recipe
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string recipeName { get; set; }

        public string description { get; set; }

        public string instructions { get; set; }

      //  [BsonRepresentation(BsonType.Array)]
        public string ingredients { get; set; }
        
        public string owner { get; set; }
        
        public string cookTime { get; set; }

        public int servings { get; set; }

        public string difficulty { get; set; }

        public int calories { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string userId { get; set; }
    }
}