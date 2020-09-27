using RecipeApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;
using System.Diagnostics;
using RecipeApi.DTOs;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;

namespace RecipeApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IConfiguration _configuration;

        public UserService(IRecipeDatabaseSettings settings, IConfiguration _configuration)
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

        public string Authenticate(AuthenticateDTO payload)
        {
            var user = _users.Find<User>(user => user.email == payload.Email).FirstOrDefault();
            if (user == null) return null;
            if (user.password != payload.Password) return null;
            return GenerateToken(user);
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("BtHE1zD41lhZm9yqU8b2LTDrRAXiZXY2I0WuB5xRjpkpIApjcX47V3UxWR1zLPt"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim( "id", user.userID.ToString()),
                new Claim( "email", user.email.ToString())
            };
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}