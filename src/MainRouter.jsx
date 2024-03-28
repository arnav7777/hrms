// MainRouter.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import DetailsPage from './DetailsPage';

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/DetailsPage" element={<DetailsPage />} />
  </Routes>
);

export default MainRouter;
