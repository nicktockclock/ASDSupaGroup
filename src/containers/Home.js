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

  async incrementalLoad() {
      var didReturn = true;        
      var r = [];
      var i;
      for (i = 1; didReturn; i++) {
          var tmp = await FetchRecipes({
              index: i,
              sort:"popular",
              max:12
          });

          didReturn = (tmp != null);
          if (didReturn) r.push(tmp);
          console.log("returned: ");
          console.log(tmp);
         
          this.setState({recipes: r});
      }
  }

  async componentDidMount () {
    this.incrementalLoad();
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