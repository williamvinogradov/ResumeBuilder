import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import React from 'react';

const WrappedOutlet: React.FC = ({ className }: any) => (
  <div className={className}>
    <Outlet />
  </div>
);

export const Content = styled(WrappedOutlet)`
  padding: 20px 40px;
`;
