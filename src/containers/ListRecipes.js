import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./ListRecipes.css";
import {getImage, getRandomRating, getRandomDifficulty, getRandomDuration, ratingChanged} from "./Utils.js";

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foods: ["burger", "pizza", "salad", "Bolognese", "steak", "chicken schnitzel", "risotto", "lasagne", "curry", "salad", "panna cotta", "sushi", "toasted sandwich", "creme brulee"],
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
                                    </a>

                                    <div class="center">
                                        <ReactStars
                                            count={5}
                                            value={getRandomRating()}
                                            onChange={ratingChanged}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            size={17}
                                        />
                                    </div>

                                    <center>
                                        <p>{getRandomDifficulty()} &nbsp; - &nbsp; {getRandomDuration()}</p>
                                    </center>

                                </div>)
                            })}
                        
                    </div>
                </div>

            </div>
        )
    }
}
export default ListRecipes;

