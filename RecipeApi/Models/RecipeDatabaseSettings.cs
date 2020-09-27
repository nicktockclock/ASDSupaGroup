namespace RecipeApi.Models
{
    public class RecipeDatabaseSettings : IRecipeDatabaseSettings
    {
        public string RecipeCollectionName { get; set; }
        public string UsersCollectionName {get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IRecipeDatabaseSettings
    {
        string RecipeCollectionName { get; set; }
        string UsersCollectionName {get; set; }        
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}