import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  spinner?: ReactNode;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
}

const Button = ({
  prefixElement,
  suffixElement,
  children,
  loading = false,
  spinner = <Spinner color={'black'} size={'1em'} />,
  style,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
    >
      {prefixElement}
      {loading ? spinner : children}
      {suffixElement}
    </button>
  );
};

export default Button;
