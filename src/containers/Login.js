import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import "./Login.css";
import Routes from "../Routes";
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const { email, password } = this.state;

        axios.post(
            "http://localhost:5000/api/users",
            {
                user: {
                    email: email,
                    password: password
                }
            },
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }









    render() {
        return (
            <div className="Login">
                {/* //     <Form horizontal>
            //         <FormGroup controlId="formHorizontalEmail" bsSize='large'>
            //             <Col componentClass={ControlLabel} sm={3}>Email</Col>
            //             <Col sm={10}>
            //                 <FormControl type="email" placeholder="Email" />
            //             </Col>
            //         </FormGroup>

            //         <FormGroup controlId="formHorizontalPassword" bsSize='large'>
            //             <Col componentClass={ControlLabel} sm={3}>Password</Col>
            //             <Col sm={10}>
            //                 <FormControl type="password" placeholder="Password" />
            //             </Col>
            //         </FormGroup>

            //         <FormGroup >
            //             <Col smOffset={2} sm={10}>
            //                 <Checkbox>Remember me</Checkbox>
            //             </Col>
            //         </FormGroup>

            //         <FormGroup>
            //             <Col smOffset={2} sm={10}>
            //                 <Button type="submit" bsSize='large'>Sign in</Button>
            //             </Col>
            //         </FormGroup>
                //     </Form> */}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>


        )
    }
}
export default Login;

