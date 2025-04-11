import type { ButtonProps } from '../../types';
import useDebouncing from '../../hooks/useDebouncing';
const Button = ({
  onClick,
  loading = false,
  readOnly = false,
  disabled = false,
  useDebounce = false,
  timeout = 300,
  children,
  ...props
}: ButtonProps) => {
  const handleClick = onClick && useDebounce ? useDebouncing(onClick, timeout || 300) : onClick;
  return (
    <button onClick={handleClick} disabled={disabled || loading || readOnly} {...props}>
      {children}
    </button>
  );
};

export default Button;
