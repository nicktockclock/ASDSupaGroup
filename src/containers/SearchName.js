import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";

class SearchName extends Component {
    constructor(props) {
        super(props);
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.state = { recipeCollection: [], recipeFiltered: [], name: '' };
    }

    onChangeRecipeName(e) {
        this.setState({ name: e.target.value })
        if (e.target.value.length==0){
            this.setState({recipeFiltered: this.state.recipeCollection});
        }
        else{
            console.log(this.state.recipeCollection);
            this.setState({ recipeFiltered: this.state.recipeCollection.filter(r => r.recipeName.toLowerCase().includes(e.target.value.toLowerCase())) });
        }
    }

    onSubmit(e) {
        e.preventDefault()
    }

    async incrementalLoad() {
        var r = [];
            
        var sortedRecipes = await getSorted({
            sort:"alphabetical"
        });
        
        for (const f of sortedRecipes) {
            
            r.push(f);

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
                                <FormControl type="text" placeholder={this.state.name} value={this.state.name} onChange={this.onChangeRecipeName}/>
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
export default SearchName;