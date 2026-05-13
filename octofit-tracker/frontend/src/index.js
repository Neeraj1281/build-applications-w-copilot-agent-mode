
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set the REACT_APP_CODESPACE_URL for API calls
if (!process.env.REACT_APP_CODESPACE_URL) {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || '';
  // Default to https for GitHub Codespaces
  process.env.REACT_APP_CODESPACE_URL = `https://${codespaceName}-8000.app.github.dev`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
