import React, { Component } from 'react'
import { Button, Table, Alert } from 'react-bootstrap';
import './AccountManager.css';
import data from '../data/users.json'
import { Link } from 'react-router-dom';
import UserList from '../components/UserList';
import api from '../libs/api';

class AccountManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            error: null,
            loading: false
        }
    }

    getUsers = async () => {
        this.setState({loading: true, error: null})
        try {
            const response = await api().get('/users');
            this.setState({users: response.data, loading: false});
        } catch(e) {
            this.setState({error: e, loading: false});
        }
    }

    async componentDidMount() {
        await this.getUsers();
    }

    removeUser = async (id) => {
        this.setState({loading: true, error: null})
        try {
            await api().delete(`/users/${id}`);
        } catch(e) {
            this.setState({error: e, loading: false});
        }
        await this.getUsers();
    }



    render() {
        const { users, error, loading } = this.state
        return (
            <>
            {error && <Alert error><pre>{JSON.stringify(error, null, 2)}</pre></Alert>}
            <Table>
                <thead>
                    <tr>
                        <th>Add a User: </th>
                        <th><input type="text"/></th>
                        <th><button onClick={() => this.props.addItem(this.state.inputText)}>Add</button></th>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th className='button-header'>Edit</th>
                        <th className='button-header'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? (
                        <tr><td>Loading...</td></tr>
                    ) : (
                        users.map((user, index) => {
                            return (
                                    <tr key={index}>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={{ pathname: `/accountmanagement/updateuser/${user.userID}`, }} userName={user.userID}>Update</Link></td>
                                        <td align='left'><Button type="button" variant="danger" onClick={(e) => {e.preventDefault(); this.removeUser(user.userID)}}>Delete</Button></td>
                                        {/* <td align='left'><Button variant="danger" onClick={() => this.removeUser(user.id)}>Delete</Button></td> */}
                                    </tr>
                            )
                        })
                    )
                }

</tbody>
            </Table>
            </>
        )
    }
}

export default AccountManager;