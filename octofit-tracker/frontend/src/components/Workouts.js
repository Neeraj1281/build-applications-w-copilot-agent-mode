import React, { useEffect, useState } from 'react';
//import { getApiBaseUrl } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const endpoint = `${getApiBaseUrl()}/api/workouts/`;
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results || data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <div>Loading workouts...</div>
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

  const getWorkoutTypeColor = (type) => {
    const typeMap = {
      'running': 'danger',
      'cycling': 'info',
      'swimming': 'primary',
      'strength': 'success',
      'yoga': 'warning',
      'cardio': 'danger'
    };
    return typeMap[type?.toLowerCase()] || 'secondary';
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="card-title mb-0">Workouts</h2>
              <button className="btn btn-danger btn-sm">
                <i className="bi bi-plus-circle me-2"></i>Add Workout
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {workouts.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No workouts found. Add your first workout to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="fw-bold">Workout Type</th>
                      <th scope="col" className="fw-bold">Workout Name</th>
                      <th scope="col" className="fw-bold">Duration (min)</th>
                      <th scope="col" className="fw-bold text-center">Difficulty</th>
                      <th scope="col" className="fw-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout, idx) => (
                      <tr key={workout.id || idx}>
                        <td className="align-middle">
                          <span className={`badge bg-${getWorkoutTypeColor(workout.type)}`}>
                            {workout.type || 'General'}
                          </span>
                        </td>
                        <td className="align-middle fw-semibold">{workout.name || workout.workout || 'Unknown'}</td>
                        <td className="align-middle">
                          <span className="badge bg-light text-dark">{workout.duration || 0} min</span>
                        </td>
                        <td className="text-center align-middle">
                          <span className="badge bg-info">Medium</span>
                        </td>
                        <td className="text-center align-middle">
                          <button className="btn btn-sm btn-outline-primary me-2" title="View">
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
            <small className="text-muted">Total Workouts: <strong>{workouts.length}</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Workouts;
//   );
// };

export default Workouts;
