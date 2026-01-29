import { ReactNode } from 'react';

export interface PopoverProps {
  children: ReactNode;
  popover: ReactNode;
  direction:
    | 'top-left'
    | 'top-center'
    | 'top'
    | 'top-right'
    | 'left'
    | 'right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-center'
    | 'bottom-right';
  targetId?: string;
  domNode?: Element;
  key?: string;
  gap?: number;
}
