import React, { useEffect, useState } from 'react';
//import { getApiBaseUrl } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const endpoint = `${getApiBaseUrl()}/api/users/`;
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        console.log('Fetched users data:', data);
        setUsers(data.results || data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <div>Loading users...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="card-title mb-0">Users</h2>
              <button className="btn btn-secondary btn-sm">
                <i className="bi bi-person-plus me-2"></i>Invite User
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {users.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No users found. Invite someone to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="fw-bold">Username</th>
                      <th scope="col" className="fw-bold">Email</th>
                      <th scope="col" className="fw-bold text-center">Status</th>
                      <th scope="col" className="fw-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={user.id || idx}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '32px', height: '32px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                              {(user.username || user.name || 'U')[0].toUpperCase()}
                            </div>
                            <span>{user.username || user.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="align-middle">{user.email || '-'}</td>
                        <td className="text-center align-middle">
                          <span className="badge bg-success">Active</span>
                        </td>
                        <td className="text-center align-middle">
                          <button className="btn btn-sm btn-outline-primary me-2" title="View Profile">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Remove">
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="card-footer bg-light py-3">
            <small className="text-muted">Total Users: <strong>{users.length}</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Users;
//   );
// };

export default Users;
