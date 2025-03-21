import React, { HTMLAttributes, ReactNode, useContext, useMemo } from 'react';
import Checkbox from './Checkbox';
import CheckboxListContext from './CheckboxListContext';

interface CheckboxListProps extends HTMLAttributes<HTMLDivElement> {
  checkLimit?: number;
  values: string[];
  onCheck: (value: (prev: string[]) => string[]) => void;
  showAllCheck?: boolean;
  onAllCheck?: (isAll: boolean) => void;
  allCheckLabel?: string | ReactNode;
  itemCount?: number;
}

const CheckboxList = ({
  children,
  checkLimit = Infinity,
  values = [],
  onCheck,
  showAllCheck = false,
  onAllCheck,
  allCheckLabel,
  itemCount,
  ...props
}: CheckboxListProps) => {
  console.log(values);
  const onToggleCheck = (label: string) => {
    onCheck((prev) => {
      const isChecked = prev.includes(label);
      let newChecked: string[];

      if (isChecked) {
        newChecked = prev.filter((item) => item !== label);
      } else if (!checkLimit || prev.length < checkLimit) {
        newChecked = [...prev, label];
      } else {
        return prev;
      }
      return newChecked;
    });
  };

  return (
    <div {...props}>
      <CheckboxListContext.Provider
        value={{
          checkedItems: values,
          onToggleCheck,
        }}
      >
        {showAllCheck && (
          <Checkbox
            checked={itemCount === values.length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onAllCheck(itemCount === values.length)
            }
          >
            {allCheckLabel ?? 'All'}
          </Checkbox>
        )}
        {children}
      </CheckboxListContext.Provider>
    </div>
  );
};

export interface CheckboxItemProps extends HTMLAttributes<HTMLInputElement> {
  children?: string;
}

const CheckboxItem = ({ id, children, ...props }: CheckboxItemProps) => {
  const checkboxId = useMemo(() => id ?? crypto.randomUUID(), []);
  const { onToggleCheck, checkedItems } = useContext(CheckboxListContext);

  const isChecked = checkedItems.includes(id ?? children);

  const onChange = () => {
    onToggleCheck(id ?? children);
  };

  return (
    <div>
      <Checkbox id={checkboxId} checked={isChecked} onChange={onChange} {...props}>
        {children}
      </Checkbox>
    </div>
  );
};

CheckboxItem.displayName = 'Item';
CheckboxList.displayName = 'CheckboxList';
CheckboxList.Item = CheckboxItem;
export default CheckboxList;
