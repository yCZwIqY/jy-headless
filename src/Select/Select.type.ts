import { HTMLProps, ReactNode } from 'react';

/**
 * Select 루트 컴포넌트 props
 */
export interface SelectProps {
  /**
   * 선택된 값 목록
   *
   * - single 모드에서도 배열로 관리
   */
  value: string[];

  /**
   * 값 변경 시 호출
   */
  onChange: (v: string[]) => void;

  /**
   * 다중 선택 여부
   * @default false
   */
  multiple?: boolean;

  /**
   * Select.Trigger / Select.Options 등을 포함하는 children
   */
  children: ReactNode;
}


/**
 * Options 컨테이너 props
 */
export interface SelectOptionsProps extends HTMLProps<HTMLDivElement> {}

/**
 * 개별 Option props
 */
export interface SelectOptionProps extends HTMLProps<HTMLDivElement> {
  /**
   * 옵션의 실제 값
   */
  value: string;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 표시될 내용
   */
  children: ReactNode;
}

/**
 * Trigger 버튼 props
 */
export interface SelectTriggerProps extends HTMLProps<HTMLDivElement> {}