import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./CreateRecipe.css";
import Routes from "../Routes";
import axios from 'axios';
import ViewTable from './view-table';

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = { recipeCollection: [],
            id:  this.props.state.id};
    }

    componentDidMount() {
        console.log(this.state.id);
        axios.get('http://localhost:5000/api/recipes/'+this.props.location)
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
                
            </div>
        )
    }
}
export default UpdateRecipe;