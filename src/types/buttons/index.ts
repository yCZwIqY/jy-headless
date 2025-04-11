import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  readOnly?: boolean;
  useDebounce?: boolean;
  timeout?: number;
}
