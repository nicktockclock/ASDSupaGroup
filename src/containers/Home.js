import React from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";



export default function Home() {
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
        <div class="card-columns">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </div>
  );
}