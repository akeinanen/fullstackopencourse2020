import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = ({ blogs }) => {
    const [users, setUsers] = useState([])
    const [singleUser, setSingleUser] = useState(null)

    useEffect(() => {
        userService.getAll().then(users =>
            setUsers(users)
        )
    }, [])

    const userState = singleUser ?
        <>
            <h1>{singleUser.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {singleUser.blogs.map(blog =>
                    <li key={blog}>{blogs.find(b => b.id === blog).title}</li>
                )}
            </ul>
        </>
        :
        <>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td onClick={() => setSingleUser(user)}>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}

            </tbody>
        </table>
        </>

    return (
            <>
                {userState}
            </>
    )


}

export default Users