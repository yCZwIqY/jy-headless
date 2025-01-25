import React, { CSSProperties, InputHTMLAttributes, ReactNode, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showLimit: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
  showError?: boolean;
  error?: ReactNode | string;
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
  maxLength,
  showLimit = false,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(restProps.value);

  const onChange = (e) => {
    setInputValue(e.target.value);
    restProps.onChange(e);
  };
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
        value={inputValue}
        onChange={onChange}
        maxLength={maxLength}
        className={className}
        style={{
          all: 'unset',
          ...style,
        }}
      />
      {showLimit && maxLength && (
        <span className={'max-length'}>
          {(inputValue ?? '').toString().length ?? 0}/{maxLength}
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
