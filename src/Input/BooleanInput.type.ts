import { InputHTMLAttributes, ReactNode } from 'react';

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
   * checkbox 커스텀 UI
   *
   * 값이 비어 있으면 기본 `<input type="checkbox" />`를 그대로 사용합니다.
   */
  checkboxInput?:
    | ReactNode
    | ((state: {
        checked: boolean;
        disabled: boolean;
      }) => ReactNode);

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

  /**
   * 스위치 활성 상태 배경색
   *
   * @default '#5f5f5f'
   */
  switchActiveColor?: string;

  /**
   * 스위치 비활성 상태 배경색
   *
   * @default '#c3c3c3'
   */
  switchInactiveColor?: string;

  /**
   * 스위치 기본 thumb 색상
   *
   * `switchThumb`이 없을 때 사용됩니다.
   *
   * @default '#ffffff'
   */
  switchThumbColor?: string;

  /**
   * 스위치 thumb 커스텀 UI
   *
   * 값이 비어 있으면 기본 원형 thumb를 사용합니다.
   */
  switchThumb?:
    | ReactNode
    | ((state: {
        checked: boolean;
        disabled: boolean;
      }) => ReactNode);
}
