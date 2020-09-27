import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ViewTable extends Component {
    handleDelete(e){
        e.preventDefault();
        axios.delete('http://localhost:5000/api/recipes/' + e.target.value)
            .then((res) => {
                console.log(res.data)
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            });  
   }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.recipeName}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.instructions}
                </td>
                <td>
                    {this.props.obj.ingredients}
                </td>
                <td>
                    {this.props.obj.cookTime}
                </td>
                <td>
                    {this.props.obj.servings}
                </td>
                <td>
                    {this.props.obj.difficulty}
                </td>
                <td>
                    {this.props.obj.calories}
                </td>
                <td>
                    <Link
                        to={{
                            pathname: "/myrecipes/updaterecipe",
                            state: {id: this.props.obj.id}
                        }}
                    >Update</Link>
                </td>
                <td>
                    <button value={this.props.obj.id} onClick={e => this.handleDelete(e, "value")}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default ViewTable;