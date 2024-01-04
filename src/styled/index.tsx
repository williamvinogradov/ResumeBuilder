import styled from 'styled-components';
import {
  BlockAlign,
  BlockDirection,
  BlockDisplayOptions,
} from '../core/blocks/types';
import { StyledPrefix } from './types';

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
  margin: 16px 0;
`;

export const StyledActionsLeftContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledActionsRightContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
`;

export const StyledBlockTemplateLayout = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  margin: 8px;
  border: 2px dashed #c1c1c1;
`;

export interface StyledBlockTemplateContentProps {
  $direction: BlockDirection;
  $align: BlockAlign;
}
export const StyledBlockTemplateContent = styled.div<StyledBlockTemplateContentProps>`
  flex: 1 1;
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'horizontal' ? 'row' : 'column')};
  justify-content: ${({ $align }) => {
    switch ($align) {
      case 'end':
        return 'flex-end';
      case 'middle':
        return 'center';
      default:
        return 'flex-start';
    }
  }};
`;
export const StyledBlockTemplateActions = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
`;

export const StyledLayoutBlockTemplateEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

export const StyledFlexAllBlock = styled.div`
  flex: 1 1;
`;

export const StyledBorderBottomBlock = styled.div`
  border-bottom: 1px solid #ececec;
`;

export const StyledCvContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const StyledBlockLayout = styled.div<
StyledPrefix<BlockDisplayOptions>
>`
  flex: ${({ $flex }) => $flex};
  display: flex;
  flex-direction: ${({ $contentDirection }) => ($contentDirection === 'horizontal' ? 'row' : 'column')};
  justify-content: ${({ $contentAlign }) => {
    switch ($contentAlign) {
      case 'end':
        return 'flex-end';
      case 'middle':
        return 'center';
      default:
        return 'flex-start';
    }
  }};
  height: 100%;
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
  color: ${({ $color }) => $color};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  box-sizing: border-box;
`;
