import React, { Component } from 'react';
import "./ListRecipes.css";
import {getImage, getRandomRating, getRandomDifficulty, getRandomDuration, ratingChanged} from "./Utils.js";

import {RecipeCards, FetchRecipes} from "../components/RecipeDisplay";

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    }

    async componentDidMount () {
        this.setState({recipes: await FetchRecipes({
            sort:"popular"
        })})
    }
    
    render() {        
        return (
            <div className = "all">
                <RecipeCards recipes={this.state.recipes}/>                
            </div>
        )
    }
}
export default ListRecipes;

