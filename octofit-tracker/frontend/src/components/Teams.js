import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `${getApiBaseUrl()}/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        console.log('Fetched teams data:', data);
        setTeams(data.results || data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <div>Loading teams...</div>
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
              <h2 className="card-title mb-0">Teams</h2>
              <button className="btn btn-success btn-sm">
                <i className="bi bi-plus-circle me-2"></i>Create Team
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {teams.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No teams found. Create your first team to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="fw-bold">Team Name</th>
                      <th scope="col" className="fw-bold">Members</th>
                      <th scope="col" className="fw-bold text-center">Status</th>
                      <th scope="col" className="fw-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, idx) => (
                      <tr key={team.id || idx}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <div className="badge bg-info text-dark p-3 rounded-circle me-3" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold'}}>
                              {(team.name || 'T')[0].toUpperCase()}
                            </div>
                            <span className="fw-semibold">{team.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <span className="badge bg-light text-dark">{team.members || team.member_count || 0} members</span>
                        </td>
                        <td className="text-center align-middle">
                          <span className="badge bg-success">Active</span>
                        </td>
                        <td className="text-center align-middle">
                          <button className="btn btn-sm btn-outline-primary me-2" title="View Team">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary me-2" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete">
                            <i className="bi bi-trash"></i>
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
            <small className="text-muted">Total Teams: <strong>{teams.length}</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Teams;
//   );
// };

export default Teams;
