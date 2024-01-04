import React from 'react';
import { BlockDisplayOptions } from '../types';
import { StyledBlockLayout } from '../../../styled';

export interface BlockLayoutProps {
  displayOptions: BlockDisplayOptions;
  children: React.ReactNode;
}

export const BlockLayout: React.FC<BlockLayoutProps> = ({
  displayOptions: {
    flex,
    contentAlign,
    color,
    padding,
    backgroundColor,
    margin,
    contentDirection,
  },
  children,
}) => {
  return (
    <StyledBlockLayout
      $flex={flex}
      $contentAlign={contentAlign}
      $color={color}
      $padding={padding}
      $backgroundColor={backgroundColor}
      $margin={margin}
      $contentDirection={contentDirection}
    >
      {children}
    </StyledBlockLayout>
  );
};
