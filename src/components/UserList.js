// import React, { Component } from 'react'
// import { Button, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import data from '../data/users.json'


// const ListBody = (props) => {
//     const rows = props.users.map((user, index) => {
//             return (
//                 <tr key={index}>
//                     <td>{user.email}</td>
//                     <td align='center'><Button variant="danger" onClick={() => props.removeUser(user.id)}>Delete</Button></td>
//                     {/* <td align='center'><Button variant="success" onClick={() => props.removeItem(item.id)}>Update</Button></td> */}
//                 </tr>
//              ) 
//     })

//     return <tbody>{rows}</tbody>
// }

// const UserList = (props) => {
//         const {users, removeUser} = props
//         return (
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Email</th>
//                         <th className='button-header'>Edit</th>
//                         <th className='button-header'>Delete</th>
//                     </tr>
//                 </thead>
//                 <ListBody users={users} removeUser={removeUser}/>
//             </Table>
//         )
// }

// export default UserList;
