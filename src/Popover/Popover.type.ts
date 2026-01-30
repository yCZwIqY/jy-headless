import { ReactNode } from 'react';
import { Direction } from '../hooks';

export interface PopoverProps {
  children: ReactNode;
  popover: ReactNode;
  direction: Direction;
  targetId?: string;
  domNode?: Element;
  key?: string;
  gap?: number;
  autoFlip?: boolean;
}
