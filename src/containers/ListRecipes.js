import React, { Component } from 'react';
import "./ListRecipes.css";
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";
import Axios from 'axios';

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.onChangeSort = this.onChangeSort.bind(this);

        this.state = {
            recipes: [],
            sort: "popular"
        };
    }

    async onChangeSort(e) {
        this.setState( {sort: e.target.value}, () =>{
            this.incrementalLoad();
        });
    }

    async incrementalLoad() {       
        var r = [];
        
        var sortedRecipes = await getSorted({
            sort: this.state.sort
        });

        console.log(sortedRecipes);

        for (const f of sortedRecipes) {

            r.push(f);
            this.setState( {recipes: r} );
        }
    }

    async fullLoad() {
        this.setState({recipes: await getRecipeMetadata({
            sort: this.state.sort
        })})
    }

    componentDidMount () {
        this.incrementalLoad();
    }
    
    render() {        
        return (
            <div className = "all">
                <FormControl componentClass="select" as="select" value={this.state.sort} onChange={this.onChangeSort}>
                    <option value="popular">Popular</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="cookTime">Time</option>
                    <option value="servings">Servings</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="calories">Calories</option>
                    <option value="random">Random</option>
                </FormControl> 

                <RecipeCards recipes={this.state.recipes}/>          
            </div>
        )
    }
}
export default ListRecipes;

