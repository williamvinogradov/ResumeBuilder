import React from 'react';
import { LineTextBlockData } from '../types';

export interface LineTextBlockPreviewProps {
  data: LineTextBlockData;
}

export const LineTextBlockPreview: React.FC<
LineTextBlockPreviewProps
> = ({ data: { value } }) => <h2>{value}</h2>;
