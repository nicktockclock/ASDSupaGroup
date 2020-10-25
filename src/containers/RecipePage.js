import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import Routes from "../Routes";
import queryString from 'query-string';
import Axios from 'axios';
import {getSorted, getRecipeMetadata} from "../components/RecipeDisplay";

class RecipePage extends Component {

  constructor(props) {
    super(props);
    this.state = { recipe : "" };
  }

  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    var requestedId = values.id;

    var res = "";
    if (requestedId) {
      var query = 'http://localhost:5000/api/Recipes/' + requestedId;
      await Axios.get(query).then(r => res = r.data);
    } else {
      //get random recipe
      res = await getSorted({sort:"random"}).then(r => res = r[0]);
    }

    if (!res) return; //dont continue on no return
    var r = await getRecipeMetadata(res)

    //edit empty values
    if (!r.owner) r.owner = "Anonymous";

    this.setState( {recipe : r} );
  }

  render() {
    return (
      <div className="page">
        <center>
          <h1> {this.state.recipe.recipeName} </h1> 
          <h4>by {this.state.recipe.owner}</h4>
          
          <input type="button" value="Save"></input>
          <button>
            <a href={
              "https://www.facebook.com/sharer/sharer.php?u=" + 
              window.location.href.replace("localhost", "127.0.0.1")} //facebook won't accept localhost
              target="_blank"
            >
              Share on Facebook
            </a>
          </button>

          <br></br><br></br>

          <img src={this.state.recipe.url} alt="Fried Chicken" width="100%"/>
          <h2>{this.state.recipe.description}</h2>
        </center>

        <br></br>

        <p>{this.state.recipe.instructions}</p>

        <br></br>

        <div>
          <p>Ingredients: {this.state.recipe.ingredients}</p>
          <p>Cooking Time: {this.state.recipe.cookTime}</p>
          <p>Difficulty: {this.state.recipe.difficulty}</p>
          <p>Serves: {this.state.recipe.servings}</p>
          <p>Calories: {this.state.recipe.calories}</p>
        </div>
      </div>
    )
  }
} export default RecipePage