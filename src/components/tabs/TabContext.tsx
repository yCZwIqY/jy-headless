import { createContext } from 'react';

interface TabContextType {
  currentTabId: string;
  onChangeTab: (tabId: string) => void;
}

const TabContext = createContext<TabContextType>({
  currentTabId: '',
  onChangeTab: (tabId) => {},
});

export default TabContext;
