import React, { Component, useState } from 'react';
import "./ListRecipes.css";
import {getImage} from "./Webscrape.js";

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foods: ["burger", "pizza", "salad", "spaghetti bolognese", "steak", "chicken schnitzel", "risotto", "lasagne"],
            imgURLs: [],
        };
    }

    async componentDidMount () {
        let URLarray = this.state.imgURLs;

        for (const food of this.state.foods) {
            const URL = await getImage(food);
            URLarray.push(URL);
        }
        
        this.setState({imgURLs: URLarray});
    }

    render() {        
        return (
            <div className = "all">

                <div className = "row">
                    <div className = "column">
                        {console.log("Received=")}
                        {console.log("length:" + this.state.imgURLs.length)}

                        {this.state.imgURLs.map((value, index) => {
                            return (
                            <div class="gallery">
                                <a target="_blank" href="{value}">
                                    <p class="name">{this.state.foods[index]}</p>
                                    <img src={value} width="300"/>
                                    <div class="desc">See more</div>
                                </a>                                
                            </div>)
                        })}
                        
                    </div>
                </div>

            </div>
        )
    }
}
export default ListRecipes;

