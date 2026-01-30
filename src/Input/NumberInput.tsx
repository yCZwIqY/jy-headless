import { NumberInputProps } from './NumberInput.type';
import { ChangeEvent } from 'react';
import TextInput from './TextInput';

const NumberInput = ({ max, useThousandsSeparator, onChange, ...props }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');

    if (rawValue && isNaN(Number(rawValue))) return;

    let finalValue = rawValue;
    if (max && Number(rawValue) > max) {
      finalValue = String(max);
    }

    if (useThousandsSeparator && finalValue) {
      const formattedValue = Number(finalValue).toLocaleString();
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formattedValue,
        },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    } else {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: finalValue,
        },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    }
  };

  return <TextInput {...props} onChange={handleChange} />;
};

export default NumberInput;