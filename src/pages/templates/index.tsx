import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TemplateListPage } from './pages/TemplateListPage';
import { TemplatePage } from './pages/TemplatePage';

export const TemplatesRoot: React.FC = () => (
  <Routes>
    <Route index element={<TemplateListPage />} />
    <Route path=":templateId/*" element={<TemplatePage />} />
  </Routes>
);
