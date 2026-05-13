import React, { useEffect, useState } from 'react';
//import { getApiBaseUrl } from '../api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const endpoint = `${getApiBaseUrl()}/api/leaderboard/`;
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        console.log('Fetching leaderboard from:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        setLeaders(data.results || data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <div>Loading leaderboard...</div>
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

  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getRankBadgeClass = (rank) => {
    switch(rank) {
      case 1: return 'bg-warning text-dark';
      case 2: return 'bg-secondary';
      case 3: return 'bg-danger';
      default: return 'bg-light text-dark';
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card shadow-lg">
          <div className="card-header text-center">
            <h2 className="card-title mb-0">
              <i className="bi bi-trophy me-2"></i>Leaderboard
            </h2>
          </div>
          <div className="card-body p-0">
            {leaders.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No leaderboard data available yet.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th scope="col" className="fw-bold text-center">Rank</th>
                      <th scope="col" className="fw-bold">Player Name</th>
                      <th scope="col" className="fw-bold text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders.map((leader, idx) => {
                      const rank = idx + 1;
                      return (
                        <tr key={leader.id || idx} className={rank <= 3 ? 'table-success' : ''}>
                          <td className="text-center align-middle">
                            <span className={`badge ${getRankBadgeClass(rank)} p-2`} style={{minWidth: '40px'}}>
                              {getMedalEmoji(rank)} {rank}
                            </span>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '36px', height: '36px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                                {(leader.user_name || leader.user || 'U')[0].toUpperCase()}
                              </div>
                              <span className="fw-semibold">{leader.user_name || leader.user || 'Unknown'}</span>
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            <h5 className="mb-0">
                              <span className="badge bg-success p-2" style={{fontSize: '1rem'}}>{leader.score || 0}</span>
                            </h5>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="card-footer bg-light py-3 text-center">
            <small className="text-muted">Competing Players: <strong>{leaders.length}</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
