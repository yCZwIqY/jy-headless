import { createContext, useContext, useState } from 'react';
import { DropdownContextValue, UseDropdownProps } from '../types';

export const DropdownContext = createContext<DropdownContextValue<any> | null>(null);

const useDropdown = <T>(defaultValue: T | null = null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(defaultValue);

  const toggle = () => setIsOpen((prev) => !prev);
  const select = (value: T) => {
    setSelected(value);
    setIsOpen(false);
  };

  return {
    isOpen,
    selected,
    toggle,
    select,
  };
};

export const useDropdownContext = <T>() => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown components must be used within <Dropdown>');
  return context as DropdownContextValue<T>;
};

export default useDropdown;
