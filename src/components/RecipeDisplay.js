import React from "react";
import "./RecipeDisplay.css";
import ReactStars from "react-rating-stars-component";

import {getImage, getRandomRating, parseDuration, parseCalories, ratingChanged, shuffle} from "../containers/Utils.js";
//https://stackoverflow.com/questions/44552557/update-specific-component-instance-in-react-js-based-on-an-id
import Axios from 'axios';

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
                  <p>{recipe.difficulty} / {recipe.duration} / {recipe.calories}</p>
              </center>
          </div>
      )}
  </div>
);

export async function getRecipeMetadata(options) {
    var options = options || {};
    var food = options.food || null;
    
    if (food) {
        var f = {
            'id': food.id,
            'food': food.recipeName,
            'url': await getImage(food.recipeName),
            'rating': getRandomRating(),
            'difficulty': food.difficulty, //getRandomDifficulty(),
            'duration': parseDuration(food.cookTime), //getRandomDuration()
            'calories' : parseCalories(food.calories)
        }
        return f;
    }  
    return null; 
}

export async function getSorted(options) {
    //sort = alphabetical, time, servings, difficulty, calories
    //not implemented: popular, new, hot, rating
    var sort = options.sort || "popular";
    var max = options.max || 100;
    var skip = options.skip || 0;

    console.log("SORT:" + sort);

    var query = 'http://localhost:5000/api/Recipes?max=' + max + '&skip=' + skip;

    var foods;
    await Axios.get(query)
    .then(res => {
        foods = res.data;
    })
    .catch(function (error) {
        console.log(error);
    });

    actuallySort(foods, sort);

    return foods;
}

export function actuallySort(foods, sort) {
    //popular, alphabetical, cookTime, servings, difficulty, calories, random
    switch(sort) {
        case "popular":
            return foods.sort((a,b) => popularSort(a, b));
        case "alphabetical":
            return foods.sort((a,b) => SemiNumericSort(a.recipeName, b.recipeName));
        case "cookTime":
            return foods.sort((a,b) => SemiNumericSort(a.cookTime, b.cookTime));
        case "servings":
            return foods.sort((a,b) => SemiNumericSort(a.servings, b.servings));
        case "difficulty":
            return foods.sort((a,b) => difficultySort(a.difficulty, b.difficulty));
        case "calories":
            return foods.sort((a,b) => SemiNumericSort(a.calories, b.calories));
        case "random":
            return foods;//shuffle(foods);
    }
}

function SemiNumericSort(a, b) {
    if (!isNaN(a) && !isNaN(b)) {
        //both are numbers
        a = parseInt(a);
        b = parseInt(b);
        return a < b ? -1 : 1;
    }
    return a < b ? -1 : 1;
}

function difficultySort(a, b) {
    if (a === b) return 0;
    
    if (a === "Easy" && (b === "Moderate" || b === "Hard")) return -1;
    if (a === "Moderate" && (b === "Hard")) return -1;

    if (b === "Easy" && (a === "Moderate" || a === "Hard")) return 1;
    if (b === "Moderate" && (a === "Hard")) return 1;

    console.log("a=" + a + ",b=" + b);
    console.log("REACHED END OF difficultySort");
}

function popularSort(a, b) {
    var popularity = 0;
    popularity += SemiNumericSort(a.cookTime, b.cookTime) * 3;
    popularity += difficultySort(a.difficulty, b.difficulty) * 2;
    popularity += SemiNumericSort(a.servings, b.servings) * 1;

    return Math.sign(popularity);
}