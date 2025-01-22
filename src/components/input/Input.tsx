import React, { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
  showError?: boolean;
  error?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  prefixElement,
  suffixElement,
  className,
  style,
  containerStyle,
  containerClassName,
  showError = false,
  error,
  ...restProps
}) => {
  return (
    <span
      className={containerClassName}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      {prefixElement}
      <input
        {...restProps}
        className={className}
        style={{
          all: 'unset',
          ...style,
        }}
      />
      {suffixElement}
      {showError && <div style={{ position: 'absolute', top: '100%' }}>{error}</div>}
    </span>
  );
};

export default Input;
