import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TemplatesRoot } from '../templates';
import { DataFieldsRoot } from '../dataFields';
import { CandidatesRoot } from '../candidates';
import { CvRoot } from '../cv';

const Root: React.FC = () => (
  <Routes>
    <Route path="/cv/*" element={<CvRoot />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="dataField/*" element={<DataFieldsRoot />} />
      <Route path="template/*" element={<TemplatesRoot />} />
      <Route path="candidate/*" element={<CandidatesRoot />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default Root;
