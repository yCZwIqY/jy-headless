import React, { ChangeEvent, FocusEvent, forwardRef, useMemo, useRef, useState } from 'react';
import { TextInputProps } from './TextInput.type';
import { useDebounce, useThrottle } from '../hooks';

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(value);
      else (ref as React.MutableRefObject<T>).current = value;
    });
  };
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [isComposing, setIsComposing] = useState(false);
    const innerRef = useRef<HTMLInputElement>(null);

    const combinedRef = useMemo(() => mergeRefs<HTMLInputElement | null>(innerRef as any, ref as any), [ref]);

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
      if (maxLength && !isComposing && e.target.value.length > maxLength) return;

      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(e.target.value)) return;
      }

      if (disallowPattern && !disallowPattern.test(e.target.value)) return;

      if (debounceMs && onDebouncedChange) debouncedChange(e.target.value);
      if (throttleMs && onThrottledChange) throttledChange(e.target.value);

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
      if (trimWhitespace && innerRef.current) {
        const trimmedValue = e.target.value.trim();
        if (trimmedValue !== e.target.value) {
          innerRef.current.value = trimmedValue;

          const syntheticEvent = {
            ...e,
            target: innerRef.current,
            currentTarget: innerRef.current,
            type: 'change',
          } as any as ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
        }
      }

      onBlur?.(e);
    };

    return (
      <input
        ref={combinedRef as any}
        {...props}
        onBlur={handleBlur}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    );
  },
);

TextInput.displayName = 'TextInput';
export default TextInput;
