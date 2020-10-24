import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import Routes from "../Routes";
import {RecipeCardsName, FetchRecipes} from "../components/RecipeDisplay";
import axios from 'axios';
import ViewTable from './view-table';
import {Link, Redirect} from 'react-router-dom';

class SearchName extends Component {
    constructor(props) {
        super(props);
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.state = { recipeCollection: [], recipeFiltered: [],name: '' };
    }

    onChangeRecipeName(e) {
        this.setState({ name: e.target.value })
        if (e.target.value.length==0){
            this.setState({recipeFiltered: this.state.recipeCollection});
        }
        else{
            this.setState({ recipeFiltered: this.state.recipeCollection.filter(recipeCollection => recipeCollection.recipeName.toLowerCase().includes(e.target.value.toLowerCase())) });
        }
    }

    onSubmit(e) {
        e.preventDefault()

        
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/recipes')
            .then(res => {
                this.setState({ recipeCollection: res.data });
                this.setState({ recipeFiltered: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
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
                  <RecipeCardsName recipes={this.state.recipeFiltered}/>                
                </div>
              </div>
            </div>
          );
        }
}
export default SearchName;