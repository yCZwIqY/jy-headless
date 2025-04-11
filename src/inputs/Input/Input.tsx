import { InputProps } from '../../types';
import useThrottling from '../../hooks/useThrottling';
import React from 'react';

const Input = ({
  id,
  suffixElement,
  prefixElement,
  wrapperStyle,
  wrapperClass = [],
  onChange,
  timeout = 300,
  useThrottle = false,
  children,
  ...props
}: InputProps) => {
  const handleChange = onChange && useThrottle ? useThrottling(onChange, timeout) : onChange;

  return (
    <span
      data-testid={'input-wrapper'}
      id={[id, 'input-wrapper'].join('-')}
      className={wrapperClass?.join(' ')}
      style={wrapperStyle}
    >
      {prefixElement}
      <input id={id} onChange={handleChange} {...props} />
      {suffixElement}
    </span>
  );
};

export default Input;
