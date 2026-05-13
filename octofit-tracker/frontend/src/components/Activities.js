import React, { useEffect, useState } from 'react';
//import { getApiBaseUrl } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const endpoint = `${getApiBaseUrl()}/api/activities/`;
   const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        console.log('Fetched activities data:', data);
        setActivities(data.results || data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <div>Loading activities...</div>
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
              <h2 className="card-title mb-0">Activities</h2>
              <button className="btn btn-primary btn-sm">
                <i className="bi bi-plus-circle me-2"></i>Add Activity
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {activities.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <p>No activities found. Start by adding your first activity!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="fw-bold">Activity Name</th>
                      <th scope="col" className="fw-bold">Duration (min)</th>
                      <th scope="col" className="fw-bold">Calories Burned</th>
                      <th scope="col" className="fw-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="align-middle">{activity.workout_name || activity.workout || 'Unknown'}</td>
                        <td className="align-middle">
                          <span className="badge bg-info">{activity.duration} min</span>
                        </td>
                        <td className="align-middle">
                          <span className="badge bg-success">{activity.calories} cal</span>
                        </td>
                        <td className="text-center align-middle">
                          <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
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
            <small className="text-muted">Total Activities: <strong>{activities.length}</strong></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
