import { NumberInputProps } from './NumberInput.type';
import TextInput from './TextInput';
import { ChangeEvent } from 'react';

const NumberInput = ({ max }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (max && Number(e.target.value) > max) return;
  };

  return <TextInput onChange={handleChange} />;
};

export default NumberInput;
