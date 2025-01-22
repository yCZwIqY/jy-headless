import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import RadioInput, { RadioInputProps } from './RadioInput';

export interface RadioGroupContextProps {
  selectedValues: string[] | null;
  onToggle: (value: string) => void;
  clearable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

export interface ItemComposition {
  Item?: React.FC<RadioInputProps>;
}

const RadioGroupContext = createContext<RadioGroupContextProps>({
  selectedValues: [],
  onToggle: () => {},
  clearable: false,
  readOnly: false,
  disabled: false,
});

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

const RadioGroup: React.FC<RadioGroupProps> & ItemComposition = ({
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

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const onToggle = (name) => {
    if (readOnly || disabled) return;
    let result;
    if (selectedValues?.includes(name)) {
      if (clearable) {
        result = selectedValues.filter((it) => it !== name);
      } else {
        return;
      }
    } else {
      if (allowMultiSelect) {
        result = [...selectedValues, name];
      } else {
        result = [name];
      }
    }

    setSelectedValues(() => result);
    onChange?.(result);
  };

  return (
    <RadioGroupContext value={{ selectedValues, onToggle, clearable, readOnly, disabled }}>
      <span role={'radiogroup'} style={{ position: 'relative', ...style }} className={className}>
        {typeof title === 'string' ? <h3>{title}</h3> : title}
        {children}
        {showError && typeof error === 'string' ? (
          <span style={{ position: 'absolute', top: '100%', left: 0 }}>{error}</span>
        ) : (
          error
        )}
      </span>
    </RadioGroupContext>
  );
};

const RadioGroupItem: React.FC<RadioInputProps> = (props: RadioInputProps) => {
  const { selectedValues, onToggle, clearable, readOnly, disabled } = useContext(RadioGroupContext);
  const uniqueId = useMemo(() => props.id ?? `radio-${crypto.randomUUID()}`, [props.id]);

  return (
    <RadioInput
      {...props}
      readOnly={readOnly}
      disabled={disabled}
      id={uniqueId}
      checked={selectedValues?.includes(uniqueId)}
      onChange={(e) => {
        if (readOnly || disabled) return;
        onToggle(e.target.id);
      }}
    />
  );
};

RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
