import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 로딩 스피너 제거
setTimeout(() => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}, 100);