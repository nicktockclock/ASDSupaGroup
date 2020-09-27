import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import './AccountManager.css';
import data from '../data/users.json'
import { Link } from 'react-router-dom';
import UserList from '../components/UserList';

let state = data.users;

removeUser = (index) => {
    const {users} = this.state

    this.setState({
        users: users.filter((user, i) => {
            return i !== index
        })
    })
}



const rows = data.users.map((user, index) => {
    return (
        <tbody>
            <tr key={index}>
                <td>{user.email}</td>
                <td>
                    <Link
                        to={{
                            pathname: "/accountmanagement/updateuser",
                        }}
                        userName={user.id}
                    >Update</Link>
                </td>
                <td><Button variant="danger">Delete</Button></td>
                {/* // <td align='center'><Button variant="danger" onClick={() => props.removeItem(item.id)}>Delete</Button></td>
                /* <td align='center'><Button variant="success" onClick={() => props.removeItem(item.id)}>Update</Button></td> */}
            </tr>
        </tbody>
    )
})


export class AccountManager extends Component {
    render() {
        const {users} = this.state
        return (
            <UserList users={users} removeUser={this.removeUser}/>
            // <Table>
            //     <thead>
            //         <tr>
            //             <th>Email</th>
            //             <th className='button-header'>Edit</th>
            //             <th className='button-header'>Delete</th>
            //         </tr>
            //     </thead>
            //     {rows}
            // </Table>
        )
    }
}

export default AccountManager;
