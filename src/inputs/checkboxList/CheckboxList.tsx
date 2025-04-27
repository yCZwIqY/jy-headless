import React, { createContext, useContext, useMemo } from 'react';
import { CheckboxContextData, CheckboxItemProps, CheckboxProps } from '../../types';

const CheckboxContext = createContext<CheckboxContextData<any> | null>(null);
const CheckBoxRoot = <T,>({
  children,
  values,
  onChange,
  max = Infinity,
  ...props
}: CheckboxProps<T>) => {
  const onToggle = (checked: T, isCheck: boolean) => {
    if (isCheck && values.length < max) {
      onChange([...values, checked]);
    } else {
      onChange(values.filter((it) => it != checked));
    }
  };

  return (
    <div {...props}>
      <CheckboxContext.Provider value={{ values, onToggle }}>{children}</CheckboxContext.Provider>
    </div>
  );
};

const CheckBoxItem = <T,>({ value, children, id, ...props }: CheckboxItemProps<T>) => {
  const context = useContext(CheckboxContext) as CheckboxContextData<T>;
  if (!context) {
    logCannotFindContextError('CheckboxList');
    return null;
  }
  const uuid = useMemo(() => id || crypto.randomUUID(), []);
  const { values, onToggle } = context;

  return (
    <div {...props}>
      <input
        id={uuid}
        checked={values.includes(value)}
        onChange={(e) => onToggle(value, e.target.checked)}
        type={'checkbox'}
      />
      <label htmlFor={uuid}> {children}</label>
    </div>
  );
};

const CheckboxList = Object.assign(CheckBoxRoot, {
  Item: CheckBoxItem,
});

export default CheckboxList;
