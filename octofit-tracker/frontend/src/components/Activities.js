import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${getApiBaseUrl()}/api/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched activities data:', data);
        setActivities(data.results || data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.workout_name || activity.workout || JSON.stringify(activity.workout)}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary">Add Activity</button>
      </div>
    </div>
  );
};

export default Activities;
