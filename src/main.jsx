// Main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <MainRouter />
  </Router>
);
