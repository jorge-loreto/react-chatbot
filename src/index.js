import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext'; // 👈 import your provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider> {/* ✅ Wrap everything inside this */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdminProvider>
  </React.StrictMode>
);

reportWebVitals();
