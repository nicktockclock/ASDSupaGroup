import React, { Component, useState } from 'react';
import "./ListRecipes.css";
import {getImage} from "./Webscrape.js";

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foods: ["burger", "pizza"],
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
                            return (<div background-color="blue">
                                    <h1>{this.state.foods[index]}</h1>
                                    <img src={value} width="300"/>
                                    <p>See more</p>
                                    </div>)
                        })}
                        
                    </div>
                </div>

            </div>
        )
    }
}
export default ListRecipes;

