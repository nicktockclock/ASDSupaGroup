import React, { Component } from 'react';
import "./Home.css";
import { Button } from "react-bootstrap";
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";

//export default function Home() {
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        recipes: []
    };
  }

  async incrementalLoad() {
    var r = [];
        
    var sortedRecipes = await getSorted({
        sort:"popular",
        max:12
    });
    if (!sortedRecipes) return; //when no results
    
    for (const f of sortedRecipes) {

        r.push(f);
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
          <Button href="/searchingredient">Ingredient</Button> 
          <Button href="/searchname">Recipe</Button>
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