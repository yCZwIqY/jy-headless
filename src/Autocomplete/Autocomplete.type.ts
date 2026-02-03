import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface AutocompleteProps {
  /** 선택된 값 (Option value) */
  value: string | null;
  /** 선택 값 변경 */
  onChange: (v: string | null) => void;

  /** 입력값(검색어) controlled로 쓰고 싶을 때 */
  inputValue?: string;
  /** 입력값 변경 */
  onInputChange?: (v: string) => void;

  /** 비활성화 */
  disabled?: boolean;

  /** children: Autocomplete.Input / Autocomplete.Options / Autocomplete.Option */
  children: ReactNode;
}

export interface AutocompleteInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface AutocompleteOptionsProps extends HTMLAttributes<HTMLDivElement> {}

export interface AutocompleteOptionProps extends HTMLAttributes<HTMLDivElement> {
  /** 실제 선택되는 값 */
  value: string;
  /** 검색/표시에 사용할 텍스트 */
  label: string;
  /** 비활성화 */
  disabled?: boolean;
}
