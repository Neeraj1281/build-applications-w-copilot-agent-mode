export function getApiBaseUrl() {
  if (process.env.REACT_APP_CODESPACE_URL) {
    return process.env.REACT_APP_CODESPACE_URL.replace(/\/$/, '');
  }

  if (process.env.REACT_APP_CODESPACE_NAME) {
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:8000';
    }
    return window.location.origin;
  }

  return 'http://localhost:8000';
}
