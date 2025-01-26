import { createContext, ReactNode } from 'react';

interface DropdownContextType {
  selected: string | number | null;
  onChangeValue: (value: string | number | null) => void;
  onChangeLabel: (label: string | ReactNode) => void;
}
const DropdownContext = createContext<DropdownContextType>({
  selected: '',
  onChangeValue: () => {},
  onChangeLabel: () => {},
});

export default DropdownContext;
