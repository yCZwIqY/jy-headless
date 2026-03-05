import { InputHTMLAttributes } from 'react';

/**
 * BooleanInput 컴포넌트 props
 *
 * - checkbox: 기본 체크박스 형태
 * - switch: 토글 스위치 형태
 */
export interface BooleanInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * 렌더링 형태
   *
   * @default 'checkbox'
   */
  variant?: 'checkbox' | 'switch';

  /**
   * 라벨 텍스트
   */
  label?: string;

  /**
   * 스위치 트랙 너비(px)
   *
   * @default 40
   */
  switchWidth?: number;

  /**
   * 스위치 트랙 높이(px)
   *
   * @default 22
   */
  switchHeight?: number;

  /**
   * 스위치 thumb 크기(px)
   *
   * @default 18
   */
  thumbSize?: number;
}
