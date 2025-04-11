import { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffixElement?: ReactElement | ReactNode;
  prefixElement?: ReactElement | ReactNode;
  wrapperStyle?: CSSProperties;
  wrapperClass?: string[];
  useThrottle?: boolean;
  timeout?: number;
}
