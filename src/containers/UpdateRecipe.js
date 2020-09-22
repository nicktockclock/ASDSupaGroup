import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import Routes from "../Routes";
import axios from 'axios';
import ViewTable from './view-table';

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.onChangeRecipeDescription = this.onChangeRecipeDescription.bind(this);
        this.onChangeRecipeInstructions = this.onChangeRecipeInstructions.bind(this);
        this.onChangeRecipeIngredients = this.onChangeRecipeIngredients.bind(this);
        this.onChangeRecipeCookTime = this.onChangeRecipeCookTime.bind(this);
        this.onChangeRecipeServings = this.onChangeRecipeServings.bind(this);
        this.onChangeRecipeDifficulty = this.onChangeRecipeDifficulty.bind(this);
        this.onChangeRecipeCalories = this.onChangeRecipeCalories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { recipeCollection: [],
            id:  this.props.location.state.id,
            name: '',
            description: '',
            instructions: '',
            ingredients: '',
            cooktime: '',
            servings: 0,
            difficulty: 'Easy',
            calories: 0
        }   
    }

    onChangeRecipeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeRecipeDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeRecipeInstructions(e) {
        this.setState({ instructions: e.target.value })
    }

    onChangeRecipeIngredients(e) {
        this.setState({ ingredients: e.target.value })
    }

    onChangeRecipeCookTime(e) {
        this.setState({ cooktime: e.target.value })
    }

    onChangeRecipeServings(e) {
        this.setState({ servings: e.target.value })
    }

    onChangeRecipeDifficulty(e) {
        this.setState({ difficulty: e.target.value })
    }

    onChangeRecipeCalories(e) {
        this.setState({ calories: e.target.value })
        
    }

    onSubmit(e) {
        e.preventDefault()

        const recipeObject = {
            id: this.state.id,
            recipeName: this.state.name,
            description: this.state.description,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients,
            cooktime: this.state.cooktime,
            servings: parseInt(this.state.servings),
            difficulty: this.state.difficulty,
            calories: parseInt(this.state.calories)
        };
        axios.post('http://localhost:5000/api/recipes', recipeObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/recipes/'+this.state.id)
            .then(res => {
                this.setState({ recipeCollection: res.data });
                this.setState({ name: this.state.recipeCollection.recipeName })
                this.state.name = this.state.recipeCollection.recipeName;
                this.state.description = this.state.recipeCollection.description;
                this.state.instructions = this.state.recipeCollection.instructions;
                this.state.ingredients = this.state.recipeCollection.ingredients;
                this.state.cooktime = this.state.recipeCollection.cooktime;
                this.state.servings = this.state.recipeCollection.servings;
                this.state.difficulty = this.state.recipeCollection.difficulty;
                this.state.calories = this.state.recipeCollection.calories;
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    viewTable() {
        return this.state.recipeCollection.map((data, i) => {
            return <ViewTable obj={data} key={i} />;
        });
    }

    render() {
        console.log(this.state.name);
        return (
            <div className="wrapper-recipe">
                <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup controlId="formHorizontalName" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Recipe Name</Col>
                        <Col sm={10}>
                            <FormControl type="textarea" placeholder={this.state.name} value={this.state.name} onChange={this.onChangeRecipeName}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDescription" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Description</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Description" value={this.state.description} onChange={this.onChangeRecipeDescription}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalInstructions" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Instructions</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Instructions" value={this.state.instructions} onChange={this.onChangeRecipeInstructions}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalIngredients" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Ingredients</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Ingredients" value={this.state.ingredients} onChange={this.onChangeRecipeIngredients}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalCookTime" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={10}>Time to Cook</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="CookTime" value={this.state.cooktime} onChange={this.onChangeRecipeCookTime}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalServings" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={10}>How many Servings</Col>
                        <Col sm={10}>
                            <FormControl type="number" placeholder="Servings" value={this.state.servings} onChange={this.onChangeRecipeServings}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDifficulty" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Difficulty</Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" as="select" placeholder="Difficulty" value={this.state.difficulty} onChange={this.onChangeRecipeDifficulty}>
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Hard">Hard</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalCalories" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Calories (kCal)</Col>
                        <Col sm={10}>
                            <FormControl type="number" placeholder="Calories" value={this.state.calories} onChange={this.onChangeRecipeCalories}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" bsSize='large'>Add Recipe</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
export default UpdateRecipe;