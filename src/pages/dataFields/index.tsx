import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DataFieldListPage from './pages/DataFieldListPage';
import { DataFieldPage } from './pages/DataFieldPage';

export const DataFieldsRoot: React.FC = () => (
  <Routes>
    <Route index element={<DataFieldListPage />} />
    <Route path=":dataFieldId/*" element={<DataFieldPage />} />
  </Routes>
);
