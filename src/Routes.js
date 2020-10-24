import Signup from "./containers/Signup";
import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import Home from "./containers/Home";
import Login from "./containers/Login";
import Browse from "./containers/Browse";
import RecipePage from "./containers/RecipePage";
import CreateRecipe from "./containers/CreateRecipe";
import MyRecipes from "./containers/MyRecipes";
import UpdateRecipe from "./containers/UpdateRecipe";
import ListRecipes from "./containers/ListRecipes";
import AccountManager from "./containers/AccountManager";
import UpdateUser from "./containers/UpdateUser";
import SearchName from "./containers/SearchName";
import SearchIngredient from "./containers/searchingredient";

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
      <Route exact path="/browse">
        <Browse/>
      </Route>
      <Route exact path="/recipepage">
        <RecipePage/>
      </Route>
      <Route path="/createrecipe" render={props => <CreateRecipe {...props} className="CreateRecipes" app={this}/>}/>
      <Route path="/myrecipes" render={props => <MyRecipes {...props} className="MyRecipes" app={this}/>}/>
      <Route exact path="/listrecipes">
        <ListRecipes/>
      </Route>
      <Route exact path="/accountmanagement">
        <AccountManager/>
      </Route>
      <Route exact path="/searchname">
        <SearchName/>
      </Route>
      <Route exact path="/searchingredient">
        <SearchIngredient/>
      </Route>
      <Route path="/updaterecipe" render={props => <UpdateRecipe {...props} className="UpdateRecipe" app={this}/>}/>
      <Route path="/accountmanagement/updateuser" render={props => <UpdateUser {...props}/>}/>
    </Switch>
  );}



