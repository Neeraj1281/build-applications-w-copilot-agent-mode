import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading users...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Users</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-warning">
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.username || user.name || JSON.stringify(user)}</td>
                <td>{user.email || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-secondary">Invite User</button>
      </div>
    </div>
  );
};

export default Users;
