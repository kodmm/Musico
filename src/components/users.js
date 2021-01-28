import React, { useState, useEffect } from 'react';

const Users = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/v1/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            
            .catch(err => console.error(err))
    },[]);

    console.log(users)
    return(
        <div>
            <h1>Users</h1>
            {users.map(user => (
                <div key={user.id.toString()}>{user.username} </div>
            ))}
        </div>
    )
}

export default Users;