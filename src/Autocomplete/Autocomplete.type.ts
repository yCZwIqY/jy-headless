import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export type AutocompleteItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface AutocompleteProps {
  value: string | null;
  onChange: (v: string | null) => void;

  inputValue?: string;
  onInputChange?: (v: string) => void;

  disabled?: boolean;

  /** 옵션 필터 커스터마이즈 */
  filterFn?: (item: AutocompleteItem, query: string) => boolean;

  children: ReactNode;
}

export interface AutocompleteInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** label 연결용 (없으면 aria-label 필수) */
  'aria-label'?: string;
}

export interface AutocompleteOptionsProps extends HTMLAttributes<HTMLDivElement> {
  /** ✅ 가상화 모드: 데이터 기반 */
  items?: AutocompleteItem[];
  /** 가상화 모드에서 항목 렌더 */
  renderItem?: (item: AutocompleteItem) => ReactNode;

  /** virtualization 옵션 */
  itemHeight?: number; // px
  maxVisibleItems?: number; // 화면에 최대 몇 개 보여줄지
  overscan?: number; // 위/아래 여분 렌더 수
}

export interface AutocompleteOptionProps extends HTMLAttributes<HTMLDivElement> {
  /** children 모드(비가상화) */
  value: string;
  label: string;
  disabled?: boolean;
}
