import { createContext, useContext, useEffect, useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';
import { SelectOptionProps, SelectOptionsProps, SelectProps, SelectTriggerProps } from './Select.type';

type SelectContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string[];
  toggleValue: (v: string) => void;
  multiple: boolean;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used within <Select>');
  return ctx;
};


const SelectContainer = ({ value, onChange, multiple = false, children }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleValue = (v: string) => {
    if (!multiple) {
      onChange([v]);
      setOpen(false);
      return;
    }

    onChange(
      value.includes(v)
        ? value.filter(i => i !== v)
        : [...value, v],
    );
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        toggleValue,
        multiple,
        triggerRef,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

const Trigger = (props: SelectTriggerProps) => {
  const { open, setOpen, triggerRef } = useSelectContext();

  return (
    <div
      ref={triggerRef}
      role={'button'}
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      {...props}
    />
  );
};


const Options = ({ children, ...props }: SelectOptionsProps) => {
  const { open, triggerRef, setOpen } = useSelectContext();
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerWidth =
    triggerRef.current?.getBoundingClientRect().width;


  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, setOpen, triggerRef]);

  const { portal } = usePortal({
    visible: open,
    targetRef: triggerRef,
    popoverRef,
    direction: 'bottom',
    gap: 4,
    content: (
      <div ref={popoverRef}
           style={{ width: triggerWidth }} {...props}>
        {children}
      </div>
    ),
  });

  return open ? portal : null;
};


const Option = ({ value, disabled, children, ...props }: SelectOptionProps) => {
  const { value: selected, toggleValue } = useSelectContext();
  const isSelected = selected.includes(value);

  return (
    <div
      role='option'
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) toggleValue(value);
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const Select = Object.assign(SelectContainer, {
  Trigger,
  Options,
  Option,
});

export default Select;
