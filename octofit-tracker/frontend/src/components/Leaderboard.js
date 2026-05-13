import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${getApiBaseUrl()}/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        console.log('Fetching leaderboard from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        setLeaders(data.results || data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-success">
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                <td>{leader.user_name || leader.user || JSON.stringify(leader.user)}</td>
                <td>{leader.score || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
