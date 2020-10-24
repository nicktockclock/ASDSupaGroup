import React, { Component, useState, useContext } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import Routes from "../Routes";
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';



class CreateRecipe extends Component {
    constructor(props) {
        super(props)
        
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.onChangeRecipeDescription = this.onChangeRecipeDescription.bind(this);
        this.onChangeRecipeInstructions = this.onChangeRecipeInstructions.bind(this);
        this.onChangeRecipeIngredients = this.onChangeRecipeIngredients.bind(this);
        this.onChangeRecipeCookTime = this.onChangeRecipeCookTime.bind(this);
        this.onChangeRecipeServings = this.onChangeRecipeServings.bind(this);
        this.onChangeRecipeDifficulty = this.onChangeRecipeDifficulty.bind(this);
        this.onChangeRecipeCalories = this.onChangeRecipeCalories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            instructions: '',
            ingredients: '',
            cooktime: '',
            servings: '',
            difficulty: 'Easy',
            calories: '',
            caloriesError: false,
            servingsError: false,
            missingvalues: false,
            created: false,
            email: '',
            authorised: false
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
        if (isNaN(e.target.value)){
            this.setState({servingsError: true});
            return;
        }
        this.setState({servingsError: false});
        this.setState({ servings: e.target.value })
    }

    onChangeRecipeDifficulty(e) {
        this.setState({ difficulty: e.target.value })
    }

    onChangeRecipeCalories(e) {
        if (isNaN(e.target.value)){
            this.setState({caloriesError: true});
            return;
        }
        this.setState({caloriesError: false});
        this.setState({ calories: e.target.value })
        
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.state.name=='' || this.state.description=='' || this.state.instructions=='' || 
        this.state.ingredients=='' || this.state.cooktime=='' || this.state.servings=='' || this.state.calories==''){
            this.setState({missingvalues: true});
            return;
        }
        this.setState({missingvalues: false});
        const recipeObject = {
            recipeName: this.state.name,
            description: this.state.description,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients,
            owner: this.state.email,
            cookTime: this.state.cooktime,
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

        this.setState({ created: true,
            name: '',
            description: '',
            instructions: '',
            ingredients: '',
            cooktime: '',
            servings: '',
            difficulty: 'Easy',
            calories: '',})
    }

    componentDidMount(){
        if (typeof(this.props.location.state) !== 'undefined'){
            this.setState({authorised: true});
            this.setState({email: this.props.location.state.email})
        }
    }

    render() {
        if (this.state.authorised){
            if (this.state.created){
                return(
                    <div className = "wrapper-recipe">
                        <p>Your recipe has been successfully created.</p>
                        <Col smOffset={2} sm={10}>
                            <Button value='false' onClick={(event => this.setState({ created: false}))}>
                                Add Another Recipe
                            </Button>
                            <Link to='/'>
                                <Button>
                                    Return Home
                                </Button>
                            </Link>
                        </Col>
                    </div>
                )
            }
            else{
                const servingerror = this.state.servingsError;
                const calorieerror = this.state.caloriesError;
                const missingValues = this.state.missingvalues;
                return (
                    <div className = "wrapper-recipe">
                        <Form horizontal onSubmit={this.onSubmit}>
                            <FormGroup controlId="formHorizontalName" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Recipe Name</Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Name" value={this.state.name} onChange={this.onChangeRecipeName}/>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalDescription" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Description</Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="Description" value={this.state.description} onChange={this.onChangeRecipeDescription}/>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalInstructions" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Instructions</Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="Instructions" value={this.state.instructions} onChange={this.onChangeRecipeInstructions}/>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalIngredients" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Ingredients</Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="Ingredients" value={this.state.ingredients} onChange={this.onChangeRecipeIngredients}/>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalCookTime" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Time to Cook</Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="CookTime" value={this.state.cooktime} onChange={this.onChangeRecipeCookTime}/>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalServings" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>How many Servings</Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Servings" value={this.state.servings} onChange={this.onChangeRecipeServings}/>
                                </Col>
                            </FormGroup>
                            
                            <FormGroup controlId="formHorizontalDifficulty" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Difficulty</Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" as="select" placeholder="Difficulty" value={this.state.difficulty} onChange={this.onChangeRecipeDifficulty}>
                                        <option value="Easy">Easy</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Hard">Hard</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
    
                            <FormGroup controlId="formHorizontalCalories" bsSize='large'>
                                <Col componentClass={ControlLabel} sm={2}>Calories (kCal)</Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Calories" value={this.state.calories} onChange={this.onChangeRecipeCalories}/>
                                </Col>
                            </FormGroup>
                            {servingerror && <b>Servings must be an integer.</b>}
                            <br></br>
                            {calorieerror && <b>Calories must be an integer.</b>}
                            <br></br>
                            {missingValues && <b>Please fill in every field.</b>}
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
        else{
            return(<div><p>You are not authorised to access this page.</p></div>);
        }
        
    }
}
export default CreateRecipe;

