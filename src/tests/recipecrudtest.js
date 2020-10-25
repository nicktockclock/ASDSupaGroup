import axios from 'axios';

const recipeObject = {
  recipeName: 'test',
  description: 'test',
  instructions: 'test',
  ingredients: 'test',
  owner: 'RecipeCRUDTester',
  cookTime: 'test',
  servings: 22,
  difficulty: 'Easy',
  calories: 22
};

const recipeObjectMissing = {
  recipeName: 'test',
  description: '',
  instructions: 'test',
  ingredients: '',
  owner: 'RecipeCRUDTester',
  cookTime: 'test',
  servings: 22,
  difficulty: 'Easy',
  calories: 22
};

const recipeObjectBad = {
  recipeName: 'test',
  description: 'test',
  instructions: 'test',
  ingredients: 'test',
  owner: 'RecipeCRUDTester',
  cookTime: 'test',
  servings: 'hello',
  difficulty: 'Peasy',
  calories: 22
};

var id;
var createresult;
var createbaddataresult;
var editresult;
var editmissingdataresult;
var editbaddataresult;
var viewresult;
var deleteresult;
var numberrecipes;

async function create(){
  return axios.post('http://localhost:5000/api/recipes', recipeObject)
      .then((res) => {id = res.data.id; createresult = true}).catch((error) => {createresult = false});
}


async function createBad(){
  return axios.post('http://localhost:5000/api/recipes', recipeObjectBad)
      .then((res) => {createbaddataresult = true}).catch((error) => {createbaddataresult = false;});
}

async function edit(){
  const recipeObjectEdit = {
    id: id,
    recipeName: 'new test',
    description: 'test',
    instructions: 'test',
    ingredients: 'test',
    owner: 'RecipeCRUDTester',
    cookTime: 'test',
    servings: 33,
    difficulty: 'Hard',
    calories: 33
  };
  return axios.put('http://localhost:5000/api/recipes/'+id, recipeObjectEdit)
            .then((res) => {editresult = true}).catch((error) => {editresult = false});
}

async function editMissing(){
  const recipeObjectEditMissing = {
    id: id,
    recipeName: 'new test',
    description: '',
    instructions: 'test',
    ingredients: 'test',
    owner: 'RecipeCRUDTester',
    cookTime: '',
    servings: 33,
    difficulty: 'Hard',
    calories: 33
  };
  return axios.put('http://localhost:5000/api/recipes/'+id, recipeObjectEditMissing)
            .then((res) => {editmissingdataresult = true}).catch((error) => {editmissingdataresult = false});
}

async function editBad(){
  const recipeObjectEditBad = {
    id: id,
    recipeName: 'new test',
    description: 'test',
    instructions: 'test',
    ingredients: 'test',
    owner: 'RecipeCRUDTester',
    cookTime: 'test',
    servings: 'hello',
    difficulty: 'Peasy',
    calories: 33
  };
  return axios.put('http://localhost:5000/api/recipes/'+id, recipeObjectEditBad)
            .then((res) => {editbaddataresult = true}).catch((error) => {editbaddataresult = false});
}

async function view(){
  return axios.get('http://localhost:5000/api/recipes/' + id)
            .then(res => {viewresult = true}).catch((error) => {viewresult = false});
}


async function deleteRecipe(){
  return axios.delete('http://localhost:5000/api/recipes/' + id)
            .then((res) => {deleteresult = true}).catch((error) => {deleteresult = false});  
}

async function numRecipes(){
  return axios.get('http://localhost:5000/api/recipes/myrecipes', { params: { owner: 'RecipeCRUDTester' } })
            .then(res => {numberrecipes = res.data.length}).catch((error) => {numberrecipes = -1})
}


var assert = require('assert');

describe('Recipe CRUD', function(){
    it('RecipeCRUDTester should have no recipes', async function(){
      await numRecipes();
      assert.equal(0, numberrecipes);
    });
    it('creation should work', async function(){
      await create();
      assert.equal(true, createresult);
    });
    it('creation with bad data should not work', async function(){
      await createBad();
      assert.equal(false, createbaddataresult);
    });
    it('RecipeCRUDTester should have one recipe', async function(){
      await numRecipes();
      assert.equal(1, numberrecipes);
    });
    it('edit should work', async function(){
      await edit();
      assert.equal(true, editresult);
    });
    it('edit with missing data should work', async function(){
      await editMissing();
      assert.equal(true, editmissingdataresult);
    });
    it('edit with bad data should not work', async function(){
      await editBad();
      assert.equal(false, editbaddataresult);
    });
    it('view the newly created recipe should work', async function(){
      await view();
      assert.equal(true, viewresult);
    });
    it('delete the newly created recipe should work', async function(){
      await deleteRecipe();
      assert.equal(true, deleteresult);
    });
    it('view the newly deleted recipe should not work', async function(){
      await view();
      assert.equal(false, viewresult);
    });
    it('delete the newly deleted recipe should not work', async function(){
      await deleteRecipe();
      assert.equal(false, deleteresult);
    });
    it('RecipeCRUDTester should have no recipes again', async function(){
      await numRecipes();
      assert.equal(0, numberrecipes);
    });
});