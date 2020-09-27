import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import './AccountManager.css';
import data from '../data/users.json'
import { Link } from 'react-router-dom';
import UserList from '../components/UserList';

class AccountManager extends Component {
    state = data.users;

    removeUser = (id) => {
        const { users } = this.state

        this.setState({
            items: users.filter((user, index) => {
                return user.id !== id
            }),
        })
    }

    render() {
        const { users } = this.state
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th className='button-header'>Edit</th>
                        <th className='button-header'>Delete</th>
                    </tr>
                </thead>
                {
                    data.users.map((user, index) => {
                        return (
                            <tbody>
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={{pathname: "/accountmanagement/updateuser",}} userName={user.id}>Update</Link></td>
                                    <td align='left'><Button variant="danger">Delete</Button></td>
                                    {/* <td align='left'><Button variant="danger" onClick={() => this.removeUser(user.id)}>Delete</Button></td> */}
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        )
    }
}

export default AccountManager;