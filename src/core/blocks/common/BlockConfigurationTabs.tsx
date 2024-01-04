import React, { ReactNode, useState } from 'react';
import { Tab, Tabs } from '@mui/material';

export type BlockTabs = 'data' | 'preview' | 'options';

export interface BlockDataWithPreviewProps {
  activeTab: BlockTabs;
  dataFormElement?: ReactNode;
  previewElement?: ReactNode;
  optionsElement?: ReactNode;
}

export const BlockConfigurationTabs: React.FC<
BlockDataWithPreviewProps
> = ({
  activeTab,
  dataFormElement,
  previewElement,
  optionsElement,
}: BlockDataWithPreviewProps) => {
  const [tab, setTab] = useState(activeTab);

  const onTabChangeHandler = (
    _: React.SyntheticEvent,
    newValue: 'data' | 'preview',
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={onTabChangeHandler}
        variant="scrollable"
        scrollButtons="auto"
      >
        {!!dataFormElement && <Tab label="Block data" value="data" />}
        {!!optionsElement && <Tab label="Options" value="options" />}
        {!!previewElement && <Tab label="Preview" value="preview" />}
      </Tabs>
      {tab === 'data' && dataFormElement}
      {tab === 'options' && optionsElement}
      {tab === 'preview' && previewElement}
    </>
  );
};
