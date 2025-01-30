import React, { CSSProperties, ReactNode, useMemo, useState } from 'react';
import RadioInput, { RadioInputProps } from './RadioInput';
import generateHash from '../utils/generateHash';

export interface RadioGroupProps {
  children: ReactNode;
  value?: string[];
  onChange?: (value: string) => void;
  title?: ReactNode | string;
  style?: CSSProperties;
  className?: string;
  allowMultiSelect?: boolean;
  clearable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  showError?: boolean;
  error?: ReactNode | string;
}

const RadioGroup = ({
  title,
  style,
  className,
  children,
  value = [],
  onChange,
  clearable = false,
  allowMultiSelect = false,
  readOnly = false,
  disabled = false,
  showError = false,
  error,
}: RadioGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  const onToggle = (id) => {
    if (readOnly || disabled) return;
    let result;
    if (selectedValues?.includes(id)) {
      if (clearable) {
        result = selectedValues.filter((it) => it !== id);
      } else {
        return;
      }
    } else {
      if (allowMultiSelect) {
        result = [...selectedValues, id];
      } else {
        result = [id];
      }
    }

    setSelectedValues(() => result);
    onChange?.(result);
  };

  return (
    <span role={'radiogroup'} style={{ position: 'relative', ...style }} className={className}>
      {typeof title === 'string' ? <h3>{title}</h3> : title}
      {React.Children.map(children, (child) => {
        const renderer = child as ReactNode;
        return React.isValidElement(renderer)
          ? React.cloneElement(renderer, {
              selectedValues,
              onToggle,
              clearable,
              readOnly,
              disabled,
            } as RadioGroupItemProps)
          : null;
      })}
      {showError &&
        (typeof error === 'string' ? (
          <span style={{ position: 'absolute', top: '100%', left: 0 }}>{error}</span>
        ) : (
          error
        ))}
    </span>
  );
};

interface RadioGroupItemProps extends RadioInputProps {
  selectedValues?: string[] | null;
  onToggle?: (value: string) => void;
  clearable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const RadioGroupItem = ({
  selectedValues,
  onToggle,
  clearable,
  readOnly,
  disabled,
  ...restProps
}: RadioGroupItemProps) => {
  const uniqueId = useMemo(() => restProps.id ?? `radio-${generateHash()}`, [restProps.id]);

  return (
    <RadioInput
      {...restProps}
      clearable={clearable}
      readOnly={readOnly}
      disabled={disabled}
      id={uniqueId}
      checked={selectedValues?.includes(uniqueId)}
      onToggle={(e) => {
        if (readOnly || disabled) return;
        onToggle?.(e.target.id);
      }}
    />
  );
};

RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
