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
  children,
  showLimit,
  maxLength,
  onThrottledChange,
  ...props
}: InputProps) => {
  const throttledOnChange = onThrottledChange ? useThrottling(onThrottledChange, timeout) : null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value?.length > maxLength) return;
    onChange?.(e);
    throttledOnChange?.(e);
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

export default Input;
