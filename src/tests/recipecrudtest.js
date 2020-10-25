import axios from 'axios';


var result1;

async function create(){
  var result = false;
  
  const recipeObject = {
    recipeName: 'test',
    description: 'test',
    instructions: 'test',
    ingredients: 'test',
    owner: 'test',
    cookTime: 'test',
    servings: 22,
    difficulty: 'Easy',
    calories: 22
  };
  return axios.post('http://localhost:5000/api/recipes', recipeObject)
      .then((res) => {
        //console.log(res.data)
          result1 = true;
      }).catch((error) => {
          result1 = false;
        console.log(error)
      });
  //console.log(result.status);
}

var assert = require('assert');

describe('crud', function(){
    before(async function(){
      await create();
    });
    it('creation should work', async function(){
      assert.equal(true, result1);
    });
});