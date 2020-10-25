import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, Label } from 'react-bootstrap';
import "./CreateRecipe.css";
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";

class FilterByDifficulty extends Component {
    constructor(props) {
        super(props);
        this.onDifficultyFilter = this.onDifficultyFilter.bind(this);
        this.state = { 
            recipeCollection: [], 
            recipeFiltered: [], 
            difficulty: '',
        };
    }

    onDifficultyFilter(e) {
      if (e.target.value=="No Preference"){
        this.setState({recipeFiltered: this.state.recipeCollection});
      }
      else{
        this.setState( {difficulty: e.target.value} );
        this.setState({ recipeFiltered: this.state.recipeCollection.filter(recipeCollection => recipeCollection.difficulty.toLowerCase().includes(e.target.value.toLowerCase())) });
    }
  }

 
    async incrementalLoad() {
        var r = [];
        var sortedRecipes = await getSorted({
            sort:"alphabetical"
        });
        if (!sortedRecipes) return; //when no results
        for (const f of sortedRecipes) {
            r.push(await getRecipeMetadata(f));
            this.setState({ recipeCollection: r });
            this.setState({ recipeFiltered: r });
        }
    }

    componentDidMount() {
        this.incrementalLoad();
    }

    render() {
        return (
            <div className="Home">
              <div className="lander">
                <h1>Filter recipes by difficulty!</h1><br /><br />
                <>
                <div>
                <Form horizontal>
                        <FormGroup controlId="formHorizontalName" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={4}>Difficulty Level:</Col>
                            <Col sm={5}>
                            <FormControl type="button" value={this.difficulty = "No Preference"} onClick={this.onDifficultyFilter}/>
                            <FormControl type="button" value={this.difficulty = "Easy"} onClick={this.onDifficultyFilter}/>
                            <FormControl type="button" value={this.difficulty = "Moderate"} onClick={this.onDifficultyFilter}/>
                            <FormControl type="button" value={this.difficulty = "Hard"} onClick={this.onDifficultyFilter}/>
                            </Col>

                        </FormGroup>

                </Form>
                </div>
                </>
              </div>
      
              <div className="popularRecipes">
                <h1>Filtered Recipes</h1> 
                <div className = "all">
                  <RecipeCards recipes={this.state.recipeFiltered}/>                
                </div>
              </div>
            </div>
          );
        }
}
export default FilterByDifficulty;