using RecipeApi.Models;
using RecipeApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RecipeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService _recipeService;

        public RecipesController(RecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet]
        public ActionResult<List<Recipe>> Get(int skip = 0, int max = 100) =>
            _recipeService.Get(skip:skip, max:max);


        [HttpGet("{id:length(24)}", Name = "GetRecipe")]
        public ActionResult<Recipe> Get(string id)
        {
            var recipe = _recipeService.Get(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        [HttpPost]
        public ActionResult<Recipe> Create(Recipe recipe)
        {
            _recipeService.Create(recipe);

            return CreatedAtRoute("GetRecipe", new { id = recipe.Id.ToString() }, recipe);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Recipe recipeIn)
        {
            var recipe = _recipeService.Get(id);

            if (recipe == null)
            {
                return NotFound();
            }

            _recipeService.Update(id, recipeIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var recipe = _recipeService.Get(id);

            if (recipe == null)
            {
                return NotFound();
            }

            _recipeService.Remove(recipe.Id);

            return NoContent();
        }
    }
}