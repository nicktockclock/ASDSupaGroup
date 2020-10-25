import React, { Component } from 'react';
import "./ListRecipes.css";
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import {RecipeCards, getRecipeMetadata, getSorted} from "../components/RecipeDisplay";
import Axios from 'axios';

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.onChangeSort = this.onChangeSort.bind(this);

        this.onChangePerPage = this.onChangePerPage.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);

        this.state = {
            recipes: [],
            sort: "popular",
            page: 1,
            perpage: 25
        };

        console.log(this.state);
    }

    async onChangePerPage(e) {
        this.setState( {perpage : e.target.value, page : 1}, () => {
            this.incrementalLoad();
        });
    }

    async onChangeSort(e) {
        this.setState( {sort: e.target.value}, () =>{
            this.incrementalLoad();
        });
    }

    async onPrevious(e) {
        console.log(this.state.page);
        if (this.state.page > 1) {
            this.setState( {page: this.state.page - 1}, () => {
                this.incrementalLoad();
            });
            
        }
    }

    async onNext(e) {
        //check if too far
        this.setState( {page: this.state.page + 1}, () => {
            this.incrementalLoad().then(returnedNew => {
                if (!returnedNew) this.setState( {page: this.state.page - 1} );
            });
        });
    }

    async incrementalLoad() {       
        var r = [];
        
        var sortedRecipes = await getSorted({
            sort: this.state.sort,
            max: this.state.perpage,
            skip: (this.state.page-1) * this.state.perpage
        });

        if (!sortedRecipes || sortedRecipes.length === 0) return false; //when no results

        for (const f of sortedRecipes) {
            r.push(await getRecipeMetadata(f));
            this.setState( {recipes: r} );
        }

        return true;
    }

    async fullLoad() {
        this.setState({recipes: await getRecipeMetadata({
            sort: this.state.sort
        })})
    }

    componentDidMount () {
        this.incrementalLoad();
    }
    
    render() {        
        return (
            <div className = "all">
                <FormControl componentClass="select" as="select" value={this.state.sort} onChange={this.onChangeSort}>
                    <option value="popular">Popular</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="cookTime">Time</option>
                    <option value="servings">Servings</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="calories">Calories</option>
                    <option value="random">Random</option>
                </FormControl> 

                <div className="center">
                    <RecipeCards recipes={this.state.recipes}/>
                </div>

                <br></br>

                <div className="container form-inline bottom center">
                    <span>Per Page&nbsp;&nbsp;</span>     
                    <FormControl componentClass="select" as="select" value={this.state.perpage} onChange={this.onChangePerPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </FormControl>

                    <Button href="" onClick={this.onPrevious}>Previous</Button>
                    <span>{this.state.page}</span>
                    <Button href="" onClick={this.onNext}>Next</Button>
                </div>
            </div>
        )
    }
}
export default ListRecipes;

