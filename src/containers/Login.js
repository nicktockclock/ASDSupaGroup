import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./Login.css";
import Routes from "../Routes";

class Login extends Component {
    render() {
        return (
            <div className = "Login">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Email</Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" bsSize='large'>
                        <Col componentClass={ControlLabel} sm={3}>Password</Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

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
export default Login;

