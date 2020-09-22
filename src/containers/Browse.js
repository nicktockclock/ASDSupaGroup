import React, { Component, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "./Browse.css";
import Routes from "../Routes";

class Browse extends Component {
    render() {
        return (
            <DropdownButton id="dropdown-item-button" title="Dropdown button">
                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <Dropdown.Item as="button">Another action</Dropdown.Item>
                <Dropdown.Item as="button">Something else</Dropdown.Item>
            </DropdownButton>
        )
    }
}
export default Browse;