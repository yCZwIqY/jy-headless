import React, {
  CSSProperties,
  DetailedReactHTMLElement,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import Input, { InputProps } from './Input';
import UpArrowIcon from '../icons/UpArrowIcon';
import DownArrowIcon from '../icons/DownArrowIcon';

interface NumberInputProps extends InputProps {
  increaseElement?: ReactNode;
  decreaseElement?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  increaseElement = <UpArrowIcon />,
  decreaseElement = <DownArrowIcon />,
  step = 1,
  min,
  max,
  value,
  onChange,
  ...restProps
}) => {
  const onNumberInput = (e) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    onChange(e.toString.value);
  };

  const onIncrease = () => {
    if (!max || value + step <= max) {
      onChange(value + step);
    }
  };

  const onDecrease = () => {
    if (!min || value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <Input
      {...restProps}
      value={value}
      onChange={onNumberInput}
      prefixElement={React.cloneElement(
        decreaseElement as DetailedReactHTMLElement<{ onClick: () => void }, HTMLElement>,
        { onClick: onDecrease },
      )}
      suffixElement={React.cloneElement(
        increaseElement as DetailedReactHTMLElement<{ onClick: () => void }, HTMLElement>,
        { onClick: onIncrease },
      )}
    />
  );
};

export default NumberInput;
