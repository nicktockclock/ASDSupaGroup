import React from "react";
import "./RecipeDisplay.css";
import ReactStars from "react-rating-stars-component";

import {getImage, getRandomRating, getRandomDifficulty, getRandomDuration, ratingChanged} from "../containers/Utils.js";
//https://stackoverflow.com/questions/44552557/update-specific-component-instance-in-react-js-based-on-an-id

export const RecipeCards = ({ recipes }) => (
  <div>

      {recipes.map(recipe =>

          <div className="card">
              <a target="_blank" href="{value}">
                  <p className="name">{recipe.food}</p>
                  <img src={recipe.url} width="300"/>
              </a>

              <div className="center">
                  <ReactStars
                      count={5}
                      value={recipe.rating}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                      size={17}
                  />
              </div>

              <center>
                  <p>{recipe.difficulty} &nbsp; - &nbsp; {recipe.duration}</p>
              </center>
          </div>
      )}
  </div>
);

export async function FetchRecipes(options) {
    var options = options || {};
    var sort = options.sort || "popular";
    var max = options.max || 100;
    //*paramters*
    //sort = "popular" "recent" "shortest" "easiest" "hardest" "alphabetical"
    //max = int


    //async updateRecipes() {
        
        var foods = ["burger", "pizza", "salad", "Bolognese", "steak", "chicken schnitzel", "risotto", "lasagne", "curry", "salad", "panna cotta", "sushi", "toasted sandwich", "creme brulee"];

        var updatedRecipes = [];
        var index = 0;

        //needs to be:
        //db api call to get popular recipes
        //include sort

        for (const food of foods) { 
            
            if (index > max-1) break; //exit once we've received max

            const r = {
                'id': index,
                'food': food,
                'url': await getImage(food),
                'rating': getRandomRating(),
                'difficulty': getRandomDifficulty(),
                'duration': getRandomDuration()
            }
            updatedRecipes.push(r);
            index++;
        }
        //console.log(updatedRecipes);
        return updatedRecipes;
    //}
}