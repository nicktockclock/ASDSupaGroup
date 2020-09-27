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

    async incrementalLoad() {
        var didReturn = true;        
        var r = [];
        var i;
        for (i = 1; didReturn; i++) {
            var tmp = await FetchRecipes({
                index: i,
                sort:"popular"
            });

            didReturn = (tmp != null);
            if (didReturn) r.push(tmp);
           
            this.setState({recipes: r});
        }
    }

    async fullLoad() {
        this.setState({recipes: await FetchRecipes({
            sort: "popular",
            max: 12
        })})
    }

    componentDidMount () {
        this.incrementalLoad();
        //this.fullLoad();
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

