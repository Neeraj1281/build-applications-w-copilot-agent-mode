
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', justifyContent: 'center', padding: 0 }}>
            <li><Link to="/">Activities</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
          </ul>
            <div className="App container py-4">
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded">
                <a className="navbar-brand" href="#">OctoFit Tracker</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#activities">Activities</a></li>
                    <li className="nav-item"><a className="nav-link" href="#leaderboard">Leaderboard</a></li>
                    <li className="nav-item"><a className="nav-link" href="#teams">Teams</a></li>
                    <li className="nav-item"><a className="nav-link" href="#users">Users</a></li>
                    <li className="nav-item"><a className="nav-link" href="#workouts">Workouts</a></li>
                  </ul>
                </div>
              </nav>
              <main>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h1 className="card-title display-5 mb-4 text-center">Welcome to OctoFit Tracker</h1>
                        {/* Components would be rendered here */}
                        <div className="alert alert-info text-center">Select a section from the navigation menu above.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
    </Router>
  );
}

export default App;
