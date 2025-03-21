import { createContext } from 'react';

interface CheckboxListContextType {
  checkedItems: string[];
  onToggleCheck: (label: string) => void;
}

const CheckboxListContext = createContext<CheckboxListContextType | undefined>(undefined);

export default CheckboxListContext;
