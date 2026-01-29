import { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import { TextInputProps } from './TextInput.type';
import { useDebounce, useThrottle } from '../hooks';

const TextInput = ({
  maxLength,
  onChange,
  pattern,
  onValidate,
  validator,
  onCompositionStart,
  onCompositionEnd,
  disallowPattern,
  trimWhitespace,
  debounceMs,
  throttleMs,
  onDebouncedChange,
  onThrottledChange,
  onBlur,
  ...props
}: TextInputProps) => {
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedChange = useDebounce(
    (value: string) => onDebouncedChange?.(value),
    debounceMs || 0,
  );

  const throttledChange = useThrottle(
    (value: string) => onThrottledChange?.(value),
    throttleMs || 0,
  );

  const handleCompositionStart = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(true);
    onCompositionStart?.(e);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    onCompositionEnd?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && !isComposing && e.target.value.length > maxLength) {
      return;
    }

    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(e.target.value)) return;
    }
    if (disallowPattern && !disallowPattern.test(e.target.value)) return;

    if (debounceMs && onDebouncedChange) {
      debouncedChange(e.target.value);
    }

    if (throttleMs && onThrottledChange) {
      throttledChange(e.target.value);
    }

    if (validator) {
      const result = validator(e.target.value);
      const isValid = typeof result === 'boolean' ? result : true;
      const error = typeof result === 'string' ? result : undefined;
      onValidate?.(isValid, error);

      if (!isValid) return;
    }

    onChange?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (trimWhitespace && inputRef?.current) {
      const trimmedValue = e.target.value.trim();

      if (trimmedValue !== e.target.value) {
        inputRef.current.value = trimmedValue;

        const syntheticEvent = {
          ...e,
          target: inputRef.current,
          currentTarget: inputRef.current,
          type: 'change',
        } as any as ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
      }
    }

    onBlur?.(e);
  };

  return (
    <input
      ref={inputRef}
      {...props}
      onBlur={handleBlur}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
    />
  );
};

export default TextInput;
