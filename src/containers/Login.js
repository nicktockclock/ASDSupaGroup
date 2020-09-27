import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, Alert } from 'react-bootstrap';
import "./Login.css";
import Routes from "../Routes";
import axios from 'axios';
import api from '../libs/api';
import { AuthContext } from '../libs/AuthContext';
import { useHistory } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            error: "",
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            const response = await api().post('/users/authenticate', { email, password });
            this.props.login(response.data);
            this.props.history.push('/')
        } catch (e) {
            this.setState({ error: e });
        }
    }

    render() {
        return (
            <div className="Login" onSubmit={this.handleSubmit}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Email</Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Password</Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>
                    {this.state.error != "" && <FormGroup >
                        <Col smOffset={2} sm={10}>
                            <Alert>{JSON.stringify(this.state.error.message)}</Alert>
                        </Col>
                    </FormGroup>}
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" bsSize='large'>Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>


        )
    }
}

const Wrapper = (props) => {
    const history = useHistory();
    return (<AuthContext>{ctx => <Login {...props} {...ctx} history={history} />}</AuthContext>
    )
}

export default Wrapper;

