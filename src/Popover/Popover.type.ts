import { ReactNode } from 'react';

export interface HoverProps {
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
  rootId?: string;
  domNode?: Element;
  key?: string;
}
