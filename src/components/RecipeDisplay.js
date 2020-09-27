import React from "react";
import "./RecipeDisplay.css";
import ReactStars from "react-rating-stars-component";

import {getImage, getRandomRating, getRandomDifficulty, getRandomDuration, ratingChanged} from "../containers/Utils.js";
//https://stackoverflow.com/questions/44552557/update-specific-component-instance-in-react-js-based-on-an-id

export const RecipeCards = ({ recipes }) => (
  <div>
      {recipes.map(recipe =>

          <div className="card" key={recipe.id}>
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
    var index = options.index || -1;
    var sort = options.sort || "popular";
    var max = options.max || 100;
    //*paramters*
    //index = 1+ (int) //which index food to return (speed optimisation)
    //sort = "popular" "recent" "shortest" "easiest" "hardest" "alphabetical"
    //max = int

    console.log("INDEX" + index);
        
    var foods = ["burger", "pizza", "salad", "Bolognese", "steak",
     "chicken schnitzel", "risotto", "lasagne", "curry", "salad",
      "panna cotta", "sushi", "toasted sandwich", "creme brulee",
    "apple pie", "bread", "poached eggs", "scrambled eggs", "pancakes",
    "tacos", "dumplings", "peking duck", "spring rolls", "paella"];

    //needs to be:
    //db api call to get popular recipes
    //include sort

    //load incrementally
    if (index != -1) {
        index = index-1;
        if (foods[index] != null) {
            return {
                'id': index,
                'food': foods[index],
                'url': await getImage(foods[index]),
                'rating': getRandomRating(),
                'difficulty': getRandomDifficulty(),
                'duration': getRandomDuration()
            }
        } else {
            return null;
        }
        
    }


    var updatedRecipes = [];
    var count = 0;

    //load all at once
    for (const food of foods) { 
        
        if (count > max-1) break; //exit once we've received max

        const r = {
            'id': count,
            'food': food,
            'url': await getImage(food),
            'rating': getRandomRating(),
            'difficulty': getRandomDifficulty(),
            'duration': getRandomDuration()
        }
        updatedRecipes.push(r);
        count++;
    }
    return updatedRecipes;
}