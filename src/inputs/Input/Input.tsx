import { InputProps } from '../../types';
import useThrottling from '../../hooks/useThrottling';
import React, { ChangeEvent } from 'react';

const Input = ({
  id,
  value,
  suffixElement,
  prefixElement,
  wrapperStyle,
  wrapperClass = [],
  onChange,
  timeout = 300,
  useThrottle = false,
  children,
  showLimit,
  maxLength,
  ...props
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value?.length > maxLength) return;
    (onChange && useThrottle ? useThrottling(onChange, timeout) : onChange)?.(e);
  };

  return (
    <span
      data-testid={'input-wrapper'}
      id={[id, 'input-wrapper'].join('-')}
      className={wrapperClass?.join(' ')}
      style={wrapperStyle}
    >
      {prefixElement}
      <input role={'textbox'} id={id} value={value} onChange={handleChange} {...props} />
      {showLimit && maxLength && (
        <span id={[id, 'input-limit'].join('-')}>
          {(value ?? '').toString().length}/{maxLength}
        </span>
      )}
      {suffixElement}
    </span>
  );
};

const InputLimit = () => {};

export default Input;
