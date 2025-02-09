import React, {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import DownArrowIcon from '../icons/DownArrowIcon';
import DropdownContext from './DropdownContext';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  value?: string | number | null;
  defaultValue?: string | number | null;
  icon?: ReactNode;
  optionPosition?: 'top' | 'down';
  iconPosition?: 'left' | 'right' | 'none';
  optionStyle?: CSSProperties;
}

const Dropdown = ({
  children,
  value,
  defaultValue,
  onChange,
  optionPosition = 'down',
  iconPosition = 'right',
  style,
  icon = <DownArrowIcon />,
  optionStyle,
  ...restProps
}: DropdownProps) => {
  const [isShow, setIsShow] = useState(false);
  const [label, setLabel] = useState(null);
  const dropdownRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <span
      role={'combobox'}
      {...restProps}
      style={{ ...style, cursor: 'pointer', position: 'relative' }}
      ref={dropdownRef}
      onClick={() => setIsShow(!isShow)}
    >
      {iconPosition === 'left' && <span>{icon}</span>}
      <span>
        {label}
        <DropdownContext.Provider
          value={{
            selected: value || defaultValue,
            onChangeValue: (value) => {
              onChange(value as any);
            },
            onChangeLabel: (label) => {
              setLabel(label);
            },
          }}
        >
          <span
            style={{
              display: isShow ? 'inline-block' : 'none',
              position: 'absolute',
              top: optionPosition === 'down' ? '100%' : '-100%',
              left: 0,
              right: 0,
              ...optionStyle,
            }}
          >
            {children}
          </span>
        </DropdownContext.Provider>
      </span>

      {iconPosition === 'right' && <span>{icon}</span>}
    </span>
  );
};

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number | null;
}

const DropdownItem = ({ children, value, ...restProps }: DropdownItemProps) => {
  const { selected, onChangeValue, onChangeLabel } = React.useContext(DropdownContext);

  useEffect(() => {
    if (selected === value) {
      onChangeLabel(children);
    }
  }, [selected, children]);

  const onChange = () => {
    onChangeValue(value);
    onChangeLabel(children);
  };

  return (
    <div {...restProps} onClick={() => onChange()}>
      {children}
    </div>
  );
};

DropdownItem.displayName = 'Dropdown.Item';
Dropdown.Item = DropdownItem;

export default Dropdown;
