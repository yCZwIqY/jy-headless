import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';
import { SelectOptionProps, SelectOptionsProps, SelectProps, SelectTriggerProps } from './Select.type';

type SelectContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string[];
  toggleValue: (v: string) => void;
  multiple: boolean;
  triggerRef: React.RefObject<HTMLDivElement | null>;

  optionRefs: React.MutableRefObject<HTMLDivElement[]>;
  focusedIndex: number | null;
  setFocusedIndex: Dispatch<SetStateAction<number>>
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
  const optionRefs = useRef<HTMLDivElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

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
        optionRefs,
        focusedIndex,
        setFocusedIndex,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

const Trigger = (props: SelectTriggerProps) => {
  const { open, setOpen, triggerRef, setFocusedIndex } = useSelectContext();

  return (
    <div
      ref={triggerRef}
      role={'button'}
      aria-expanded={open}
      onClick={(e) => {
        setOpen(!open);
        setFocusedIndex(0);
        props.onClick?.(e);
      }}
      {...props}
    />
  );
};


const Options = ({ children, ...props }: SelectOptionsProps) => {
  const { open, triggerRef, setOpen, setFocusedIndex, optionRefs } = useSelectContext();
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

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        setOpen(false);
        setFocusedIndex(-1);
      }

      if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => prev - 1 < 0 ? optionRefs.current.length - 1 : prev - 1);
      }

      if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => prev + 1 >= optionRefs.current.length ? 0 : prev + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      optionRefs.current = [];
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [open]);

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
  const { value: selected, toggleValue, optionRefs, focusedIndex } = useSelectContext();
  const isSelected = selected.includes(value);
  const [index, setIndex] = useState<number | null>(null);
  const isFocused = useMemo(() => focusedIndex === index, [focusedIndex, index]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && index === null) {
      setIndex(optionRefs.current.length);
      optionRefs.current[optionRefs.current.length] = ref.current;
    }
  }, []);

  useEffect(() => {
    ref.current?.setAttribute('data-focused', String(focusedIndex === index));
    if (focusedIndex === index) {
      ref.current?.focus();
    }
  }, [focusedIndex, index]);

  return (
    <div
      ref={ref}
      role='option'
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-focused={isFocused}
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
