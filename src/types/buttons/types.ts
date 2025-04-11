import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  debounce?: boolean;
  loading?: boolean;
  readOnly?: boolean;
}
