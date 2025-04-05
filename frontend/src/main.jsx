// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // ✅ 추가
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      {' '}
      {/* ✅ 이렇게 감싸줘야 useAuth()가 동작함 */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
