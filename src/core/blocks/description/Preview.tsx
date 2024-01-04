import React from 'react';
import Markdown from 'react-markdown';
import { DescriptionBlockData } from '../types';

export interface DescriptionBlockPreviewProps {
  data: DescriptionBlockData;
}

export const DescriptionBlockPreview: React.FC<
DescriptionBlockPreviewProps
> = ({ data: { title, description } }) => (
  <>
    <h3>{title}</h3>
    <Markdown>{description}</Markdown>
  </>
);
