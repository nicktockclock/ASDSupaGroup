import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import React, {useContext} from "react";
import Routes from "./Routes";
import { Route, Switch, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import "./containers/RecipePage.js";
import UpdateRecipe from "./containers/UpdateRecipe";
import {AuthContext} from './libs/AuthContext';

function App() {
  const {isAuthorised, logout, email} = useContext(AuthContext);
  const history = useHistory();
  

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
            {!isAuthorised ? (
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            ) : (
              <NavItem onClick={() => {logout(); history.push('/login');}}>Logout</NavItem>
            )}
            {isAuthorised &&
            <LinkContainer 
              to={{
                  pathname: "/createrecipe",
                  state: {email: email}
              }}
            >
              <NavItem>Create Recipe</NavItem>
            </LinkContainer>
            }
            <LinkContainer to="/listrecipes">
              <NavItem>Browse</NavItem>
            </LinkContainer>
            {isAuthorised &&
            <LinkContainer 
              to={{
                  pathname: "/myrecipes",
                  state: {email: email}
              }}
            >
              <NavItem>My Recipes</NavItem>
            </LinkContainer>
            }
            <LinkContainer to="/accountmanagement">
              <NavItem>Account Management</NavItem>
            </LinkContainer>
            {email && <NavItem disabled>{email}</NavItem>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  <Routes>
  </Routes>
    </div>
  );
}

export default App;