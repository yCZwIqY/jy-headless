import React, { CSSProperties, HTMLAttributes, useContext } from 'react';
import TabContext from './TabContext';

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  currentTab: string;
  onChangeTab: (id: string) => void;
}

const Tab = ({ children, currentTab, onChangeTab, ...restProps }: TabProps) => {
  return (
    <div {...restProps}>
      <TabContext.Provider
        value={{
          onChangeTab,
          currentTabId: currentTab,
        }}
      >
        {children}
      </TabContext.Provider>
    </div>
  );
};

interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  tabId: string;
  activeStyle?: CSSProperties;
  activeClassName?: string;
}

const TabItem = ({ children, tabId, ...restProps }: TabItemProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('ModalCloseButton must be used within a ModalContext.Provider');
  }
  const { currentTabId, onChangeTab } = context;
  return (
    <span {...restProps} onClick={() => onChangeTab(tabId)}>
      {children}
    </span>
  );
};

TabItem.displayName = 'Tab.Item';
Tab.Item = TabItem;
export default Tab;
