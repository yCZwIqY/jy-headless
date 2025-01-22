import React, { InputHTMLAttributes, ReactNode, useEffect, useMemo, useState } from 'react';

export interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  onToggle?: (e) => void;
  showError?: boolean;
  error?: ReactNode | string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  clearable = false,
  children = '',
  checked = false,
  onChange,
  onToggle,
  style,
  className,
  id,
  defaultChecked,
  readOnly,
  showError = false,
  error = null,
  ...restProps
}: RadioInputProps) => {
  const [selected, setSelected] = useState(checked || false);
  const uniqueId = useMemo(() => id || `radio-${crypto.randomUUID()}`, [id]);

  useEffect(() => {
    setSelected(checked || false);
  }, [checked]);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (readOnly || restProps.disabled) return;
    const result = clearable ? !selected : true;
    setSelected(result);
    onToggle?.({
      ...e,
      target: {
        ...e.target,
        id: uniqueId,
        checked: result,
        value: result,
      },
    });
  };

  return (
    <span className={className} style={{ position: 'relative', ...style }}>
      <input
        id={uniqueId}
        type={'radio'}
        readOnly
        {...restProps}
        checked={selected}
        onClick={onClick}
      />
      <label htmlFor={uniqueId}>{children}</label>
      {showError && typeof error === 'string' ? (
        <span style={{ position: 'absolute', top: '100%', left: 0 }}>{error}</span>
      ) : (
        error
      )}
    </span>
  );
};

export default RadioInput;
