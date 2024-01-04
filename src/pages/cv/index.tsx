import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CvPage } from './pages/CvPage';

export const CvRoot: React.FC = () => (
  <Routes>
    <Route path=":candidateId/*" element={<CvPage />} />
  </Routes>
);
