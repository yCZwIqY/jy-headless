import { CompositionEvent, HTMLProps } from 'react';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  validator?: (value: string) => boolean | string;
  onValidate?: (isValid: boolean, error?: string) => void;
  format?: (value: string) => string;
  parse?: (value: string) => string;
  disallowPattern?: RegExp;
  trimWhitespace?: boolean | 'leading' | 'trailing' | 'both';
  onCompositionStart?: (e: CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd?: (e: CompositionEvent<HTMLInputElement>) => void;
  onCompositionUpdate?: (e: CompositionEvent<HTMLInputElement>) => void;
  debounceMs?: number;
  throttleMs?: number;
  onDebouncedChange?: (value: string) => void;
  onThrottledChange?: (value: string) => void;
}
