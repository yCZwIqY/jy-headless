import React, { CSSProperties, InputHTMLAttributes, JSX, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showLimit?: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  prefixElement?: ReactNode | JSX.Element;
  suffixElement?: ReactNode | JSX.Element;
  showError?: boolean;
  error?: ReactNode | JSX.Element | string;
}

const Input = ({
  prefixElement,
  suffixElement,
  className,
  style,
  containerStyle,
  containerClassName,
  showError = false,
  error,
  maxLength,
  showLimit = false,
  ...restProps
}: InputProps) => {
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
        role={'textbox'}
        value={restProps.value}
        maxLength={maxLength}
        className={className}
        style={{
          all: 'revert-layer',
          ...style,
        }}
      />
      {showLimit && maxLength && (
        <span className={'max-length'}>
          {(restProps.value ?? '').toString().length ?? 0}/{maxLength}
        </span>
      )}
      {suffixElement}
      {showError &&
        (typeof error === 'string' ? (
          <span className={'error-message'} style={{ position: 'absolute', top: '100%', left: 0 }}>
            {error}
          </span>
        ) : (
          error
        ))}
    </span>
  );
};

export default Input;
