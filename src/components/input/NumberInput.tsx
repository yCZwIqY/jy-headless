import React, { ChangeEvent, DetailedReactHTMLElement, ReactNode } from 'react';
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
  min = -Infinity,
  max = Infinity,
  value,
  onChange,
  ...restProps
}) => {
  const onNumberInput = (e) => {
    const newValue = Number(e.target.value);
    if (isNaN(newValue)) {
      return;
    }

    onChange({
      ...e,
      target: {
        ...e.target,
        value: newValue.toString(),
      },
    });
  };

  const onNumberChange = (dir) => {
    if (isNaN(value as number)) {
      onChange(null);
      return;
    }
    let newValue = ((value ?? 0) as number) + dir * (step || 1);

    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;

    const event = {
      target: {
        ...({} as HTMLInputElement),
        value: newValue.toString(),
      },
    } as any;

    onChange(event);
  };

  const onIncrease = () => {
    onNumberChange(1);
  };

  const onDecrease = () => {
    onNumberChange(-1);
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
