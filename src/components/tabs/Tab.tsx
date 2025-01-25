import React, { CSSProperties, HTMLAttributes, useContext } from 'react';
import TabContext from './TabContext';

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  currentTab: string;
  onChangeTab: (id: string) => void;
}

interface TabComposition {
  Item?: React.FC<TabItemProps>;
}

const Tab: React.FC<TabProps> & TabComposition = ({
  children,
  currentTab,
  onChangeTab,
  ...restProps
}: TabProps) => {
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

const TabItem = ({
  children,
  style = {},
  className = '',
  activeStyle = {},
  activeClassName = '',
  tabId,
  ...restProps
}: TabItemProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('ModalCloseButton must be used within a ModalContext.Provider');
  }
  const { currentTabId, onChangeTab } = context;
  return (
    <span
      {...restProps}
      onClick={() => onChangeTab(tabId)}
      style={currentTabId === tabId ? activeStyle : style}
      className={currentTabId === tabId ? activeClassName : className}
    >
      {children}
    </span>
  );
};

Tab.Item = TabItem;
export default Tab;
