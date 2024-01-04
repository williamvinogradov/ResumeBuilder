import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CandidateListPage } from './pages/CandidateListPage';
import { CandidatePage } from './pages/CandidatePage';

export const CandidatesRoot: React.FC = () => (
  <Routes>
    <Route index element={<CandidateListPage />} />
    <Route path=":candidateId/*" element={<CandidatePage />} />
  </Routes>
);
