using RecipeApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace RecipeApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IRecipeDatabaseSettings settings)
        {
            var client = new MongoClient("mongodb://admin:ASDSupa1@ds147746.mlab.com:47746/heroku_1dvlrfcm?retryWrites=false");
            var database = client.GetDatabase("heroku_1dvlrfcm");

            _users = database.GetCollection<User>("Users");
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.userID == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.userID == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.userID == userIn.userID);

        public void Remove(string id) => 
            _users.DeleteOne(user => user.userID == id);
    }
}