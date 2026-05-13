import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results || data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-danger">
            <tr>
              <th>Name</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.name || workout.type || JSON.stringify(workout)}</td>
                <td>{workout.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-danger">Add Workout</button>
      </div>
    </div>
  );
};

export default Workouts;
