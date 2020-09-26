import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import React from "react";
import Routes from "./Routes";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import "./containers/RecipePage.js";
import UpdateRecipe from "./containers/UpdateRecipe";

function App() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/recipepage">
              <NavItem>Recipe Page</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/createrecipe">
              <NavItem>Create Recipe</NavItem>
            </LinkContainer>
            <LinkContainer to="/myrecipes">
              <NavItem>My Recipes</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  <Routes>
  </Routes>
    </div>
  );
}

export default App;