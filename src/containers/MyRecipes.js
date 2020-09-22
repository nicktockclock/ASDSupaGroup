import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import Routes from "../Routes";
import axios from 'axios';
import ViewTable from './view-table';

class MyRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = { recipeCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/recipes')
            .then(res => {
                this.setState({ recipeCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    viewTable() {
        return this.state.recipeCollection.map((data, i) => {
            return <ViewTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-recipe">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td><b>Name</b></td>
                                <td><b>Description</b></td>
                                <td><b>Instructions</b></td>
                                <td><b>Ingredients</b></td>
                                <td><b>Cook Time</b></td>
                                <td><b>Servings</b></td>
                                <td><b>Difficulty</b></td>
                                <td><b>Calories</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.viewTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default MyRecipes;