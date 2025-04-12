import React, { useEffect, useRef } from 'react';
import { DropdownContext, useDropdownContext } from '../../hooks';
import { DivAttribute, DropdownProps, SpanAttribute } from '../../types';
import useDropdown from '../../hooks/useDropdown';

const DropdownRoot = <T,>({
  select,
  selected,
  isOpen,
  toggle,
  children,
  ...props
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const unControlled = useDropdown<T>();

  const customValue = {
    isOpen: isOpen ?? unControlled.isOpen,
    toggle: toggle ?? unControlled.toggle,
    select: select ?? unControlled.select,
    selected: selected ?? unControlled.selected,
  };

  useEffect(() => {
    if (!dropdownRef.current) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        if (isOpen && toggle) {
          toggle();
        }
      }
    };

    window.addEventListener('click', onClickOutside);
    return () => window.removeEventListener('click', onClickOutside);
  }, [customValue]);

  return (
    <div {...props} ref={dropdownRef}>
      <DropdownContext.Provider value={customValue}>{children}</DropdownContext.Provider>
    </div>
  );
};

const DropdownViewer = ({ children, ...props }: SpanAttribute<null>) => {
  return (
    <span role={'viewer'} {...props}>
      {children}
    </span>
  );
};

const DropdownButton = <T,>({ onClick, children, ...props }: SpanAttribute<T>) => {
  const { toggle } = useDropdownContext<T>();
  return (
    <span {...props} onClick={toggle}>
      {children}
    </span>
  );
};

const DropdownOptions = <T,>({ children, ...props }: DivAttribute<T>) => {
  const { isOpen } = useDropdownContext<T>();
  if (!isOpen) return null;
  return <div {...props}>{children}</div>;
};

const DropdownOption = <T,>({ children, value, ...props }: DivAttribute<T>) => {
  const { select } = useDropdownContext<T>();
  return (
    <div role="option" onClick={() => select(value as T)} {...props}>
      {children}
    </div>
  );
};

const Dropdown = Object.assign(DropdownRoot, {
  Button: DropdownButton,
  Options: DropdownOptions,
  Option: DropdownOption,
  Viewer: DropdownViewer,
});

export default Dropdown;
