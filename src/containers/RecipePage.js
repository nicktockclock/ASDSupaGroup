import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import Routes from "../Routes";

class RecipePage extends Component {
    render() {
        return (
            <div>
                <h1>Crispy Fried Chicken </h1>
    
             <input type="button" value="Save"></input>
             <button><a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">
                Share on Facebook
              </a>
            </button>


     <br></br>

    <img src="Fried Chicken.jpg" alt="Fried Chicken" width="500" height="600"></img>
    
 <h3>Step 1</h3>
    
     <p>
       In a large shallow dish, combine 2-2/3 cups flour, 2 tablespoons garlic salt, 1 tablespoon paprika, 2-1/2 teaspoons pepper and 2-1/2 teaspoons poultry seasoning. 
     </p>
    
     <h3>Step 2</h3>
    
     <p>In another shallow dish, beat eggs and 1-1/2 cups water; add 1 teaspoon salt and the remaining 1-1/3 cup flour and 1/2 teaspoon pepper. Dip chicken in egg mixture, then place in the flour mixture, a few pieces at a time. Turn to coat.</p>
    
     <h3>Step 3</h3>
    
     <p>Dip chicken in egg mixture, then place in the flour mixture, a few pieces at a time. Turn to coat.</p>

     <h3>Step 4</h3>
    
     <p>In a deep-fat fryer, heat oil to 375°. Working in batches, fry chicken, several pieces at a time, until golden brown and a thermometer inserted into chicken reads 165°, about 7-8 minutes on each side. Drain on paper towels.</p>

     <h3>Step 5</h3>
    
     <p>Working in batches, fry chicken, several pieces at a time, until golden brown and a thermometer inserted into chicken reads 165°, about 7-8 minutes on each side. Drain on paper towels.</p>

     <h3>Step 6</h3>
    
    <p>Drain on paper towels.</p>
    hello
            </div>
        )
    }
}
export default RecipePage;

