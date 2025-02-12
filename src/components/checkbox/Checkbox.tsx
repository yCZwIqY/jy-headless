import React, { HTMLAttributes, useMemo } from 'react';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ children, id, ...props }: CheckboxProps) => {
  const checkboxId = useMemo(() => id ?? crypto.randomUUID(), []);

  return (
    <span>
      <input role={'checkbox'} id={checkboxId} type={'checkbox'} {...props} />
      <label role={'label'} htmlFor={checkboxId}>
        {children}
      </label>
    </span>
  );
};

export default Checkbox;
