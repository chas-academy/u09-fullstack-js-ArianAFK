import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignup } from '../hooks/useSignup';

const Admin = ({ role }) => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeoutIds, setTimeoutIds] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, err, isLoading } = useSignup();



    const fetchUsers = async () => {
        if (!user || !user.token) return;

        try {
            const response = await fetch('https://u09-fullstack-js-arianafk.onrender.com/api/user/allusers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                    'Role': role,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stayInAdmin = true

        const success = await signup(email, password, stayInAdmin);
        console.log(success)

        if (success) {
            //get list
            fetchUsers()
        }

    }

    const handleCheckboxChange = async (id) => {
        const userToUpdate = users.find((user) => user._id === id);
        const updatedRole = userToUpdate.role === 'admin' ? 'user' : 'admin';

        try {
            const response = await fetch(`https://u09-fullstack-js-arianafk.onrender.com/api/user/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                    'Role': role,
                },
                body: JSON.stringify({ role: updatedRole }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user role');
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, role: updatedRole } : user
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const updateEmail = async (id, value) => {
        try {
            const response = await fetch(`https://u09-fullstack-js-arianafk.onrender.com/api/user/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                    'Role': role,
                },
                body: JSON.stringify({ email: value }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user email');
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, email: value } : user
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEmailChange = (id, value) => {
        if (timeoutIds[id]) {
            clearTimeout(timeoutIds[id]);
        }

        const newTimeoutId = setTimeout(() => {
            updateEmail(id, value);
        }, 1000);

        setTimeoutIds((prev) => ({
            ...prev,
            [id]: newTimeoutId,
        }));
    };

    const deleteUser = async (id) => {
        const response = await fetch(`https://u09-fullstack-js-arianafk.onrender.com/api/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
                'Role': role,
            },
        })


        if (response.ok) {
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== id))
        } else {
            console.error("Something went wrong")
        }
    }

    return (
        <div className="admin-container">
            <div className='create-user'>
            <h1>Admin Panel</h1>
            <h2>Create a new user</h2>
            <form className="admin-signup" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Create user</button>
                </form>
                </div>
            <h2>User List</h2>
            

                {error && <div className="error">{error}</div>}
            
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                {/* <td>
                                    <span>{user._id}</span>
                                </td> */}
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={user.email}
                                        onChange={(e) => handleEmailChange(user._id, e.target.value)}
                                        className="email-input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.role === 'admin'}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                </td>

                                <td>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Admin;
