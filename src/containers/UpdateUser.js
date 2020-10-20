import React, { Component } from 'react'
import {
    useParams
  } from "react-router-dom";

const UpdateUser = () => {
    const { userId } = useParams();
    
    return (
        <div>
            UPDATE USERS HERE {userId}
        </div>
    );
}

export default UpdateUser
