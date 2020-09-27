import Signup from "./containers/Signup";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import RecipePage from "./containers/RecipePage";
import CreateRecipe from "./containers/CreateRecipe";
import MyRecipes from "./containers/MyRecipes";
import UpdateRecipe from "./containers/UpdateRecipe";
import AccountManager from "./containers/AccountManager";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/recipepage">
        <RecipePage/>
      </Route>
      <Route exact path="/createrecipe">
        <CreateRecipe/>
      </Route>
      <Route exact path="/myrecipes">
        <MyRecipes/>
      </Route>
      <Route exact path="/accountmanagement">
        <AccountManager/>
      </Route>
      <Route path="/myrecipes/updaterecipe" render={props => <UpdateRecipe {...props} className="MyRecipes" app={this}/>}/>
    </Switch>
  );}



