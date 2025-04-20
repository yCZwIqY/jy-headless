import { createContext, CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position?: TooltipPosition;
  style?: CSSProperties;
  space?: number;
}

interface TooltipContextProps {
  show: boolean;
  tooltipPosition: CSSProperties;
}

export const TooltipContext = createContext<TooltipContextProps | null>(null);
