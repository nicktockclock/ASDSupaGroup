import React, { Component } from 'react';
import "./Home.css";
import { Button } from "react-bootstrap";
import {RecipeCards, FetchRecipes} from "../components/RecipeDisplay";
import {getImage, getRandomRating, getRandomDifficulty, getRandomDuration, ratingChanged} from "./Utils.js";
import ReactStars from "react-rating-stars-component";


//export default function Home() {
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        recipes: []
    };
  }

  async componentDidMount () {
    this.setState({recipes: await FetchRecipes({
      sort: "popular",
      max: 12
    })})
  }

  render() { 
    return (
      <div className="Home">
        <div className="lander">
          <h1>Welcome to Recipe-zee-HDeasy</h1>
          <h2>Search by...</h2>
          <>
          <div>
          <Button href="/#">Ingredient</Button> 
          <Button href="/#">Recipe</Button>
          </div>
          </>
        </div>

        <div className="popularRecipes">
          <h1>Popular Recipes</h1> 
          <div className = "all">
            <RecipeCards recipes={this.state.recipes}/>                
          </div>
        </div>
      </div>
    );
  }
}
export default Home;