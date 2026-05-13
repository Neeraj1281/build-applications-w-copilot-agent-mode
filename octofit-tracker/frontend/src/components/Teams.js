import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched teams data:', data);
        setTeams(data.results || data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-info">
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.name || JSON.stringify(team)}</td>
                <td>{team.members || team.member_count || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success">Create Team</button>
      </div>
    </div>
  );
};

export default Teams;
