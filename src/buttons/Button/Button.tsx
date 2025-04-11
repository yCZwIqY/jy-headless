import type { ButtonProps } from '../../types';
import { useRef } from 'react';

const Button = ({
  onClick,
  debounce = false,
  loading = false,
  readOnly = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const timer = useRef(0);
  const handleClick = (() => {
    if (!onClick) return;
    if (debounce) {
      return () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(onClick, 300);
      };
    }
    return onClick;
  })();

  return (
    <button onClick={handleClick} disabled={disabled || loading || readOnly} {...props}>
      {children}
    </button>
  );
};

export default Button;
