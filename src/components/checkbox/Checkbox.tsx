import React, { HTMLAttributes, useMemo } from 'react';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({
  children,
  id,
  checked,
  onChange,
  style,
  className,
  ...props
}: CheckboxProps) => {
  const checkboxId = useMemo(() => id ?? crypto.randomUUID(), []);

  return (
    <>
      <input
        role={'checkbox'}
        id={checkboxId}
        type={'checkbox'}
        {...props}
        checked={checked}
        onChange={onChange}
      />
      <label role={'label'} htmlFor={checkboxId} style={style} className={className}>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
