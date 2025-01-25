import { ReactNode } from 'react';

interface TabItem {
  label: string;
  id: string | number;
  redner: ReactNode;
}
interface TabProps {
  tab: TabItem[];
}

const Tab = ({ tab }: TabProps) => {};
export default Tab;
