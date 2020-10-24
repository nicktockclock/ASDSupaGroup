import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, Label } from 'react-bootstrap';
import "./CreateRecipe.css";
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";

class SearchIngredients extends Component {
    constructor(props) {
        super(props);
        this.onChangeRecipeIngredient = this.onChangeRecipeIngredient.bind(this);
        this.onAddFilter = this.onAddFilter.bind(this);
        this.onClearFilters = this.onClearFilters.bind(this);
        this.state = { recipeCollection: [], recipeFiltered: [], ingredient: '', filter: ''};
    }

    onChangeRecipeIngredient(e) {
        this.setState({ ingredient: e.target.value })
        if (e.target.value.length==0){
            this.setState({recipeFiltered: this.state.recipeCollection});
        }
        else{
            this.setState({ recipeFiltered: this.state.recipeCollection.filter(recipeCollection => recipeCollection.ingredients.toLowerCase().includes(e.target.value.toLowerCase())) });
        }
    }

    onAddFilter(e) {
        if (this.state.filter==''){
            this.setState( {filter: this.state.ingredient} );
        }
        else{
            this.setState( {filter: this.state.filter + ", " + this.state.ingredient} );
        }
        this.setState( {ingredient: ''} );
        this.setState({recipeCollection: this.state.recipeFiltered});
    }

    onClearFilters(e) {
        this.componentDidMount();
        this.setState( {ingredient: ''} );
        this.setState( {filter: ''} );
    }

    async incrementalLoad() {
        var r = [];
            
        var sortedRecipes = await getSorted({
            sort:"alphabetical"
        });
        
        for (const f of sortedRecipes) {
            var tmp = await getRecipeMetadata({
                food: f
            });
            r.push(tmp);

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
                <h1>Welcome to Recipe-zee-HDeasy</h1>
                <>
                <div>
                <Form horizontal>
                        <FormGroup controlId="formHorizontalName" bsSize='large'>
                            <Col componentClass={ControlLabel} sm={2}>Recipe Name</Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder={this.state.ingredient} value={this.state.ingredient} onChange={this.onChangeRecipeIngredient}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={2}>Add Filter</Col>
                            <Col sm={2}>
                                <FormControl type="button" value="Filter" onClick={this.onAddFilter}></FormControl>
                            </Col>
                            <Col sm={2}>
                                <FormControl type="button" value="Clear" onClick={this.onClearFilters}></FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={2}>Current Filters</Col>
                            <Col sm={2}>
                                <span class="label label-default">{this.state.filter}</span>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                </>
              </div>
      
              <div className="popularRecipes">
                <h1>Popular Recipes</h1> 
                <div className = "all">
                  <RecipeCards recipes={this.state.recipeFiltered}/>                
                </div>
              </div>
            </div>
          );
        }
}
export default SearchIngredients;