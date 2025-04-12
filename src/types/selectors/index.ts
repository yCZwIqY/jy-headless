import { HTMLAttributes } from 'react';

export interface DropdownContextValue<T> {
  isOpen: boolean;
  toggle: () => void;
  select: (value: T) => void;
  selected: T | null;
}

export interface DropdownProps<T> extends HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  toggle?: () => void;
  select?: (value: T) => void;
  selected?: T | null;
}

export interface UseDropdownProps<T> {
  defaultValue?: T;
}
