import { TextInputProps } from './TextInput.type';

/**
 * 숫자 전용 입력 컴포넌트 props
 *
 * TextInput을 기반으로 하며,
 * 숫자 입력에 특화된 기능을 제공합니다.
 */
export interface NumberInputProps extends TextInputProps {
  /**
   * 최대 허용 값
   *
   * 초과 시:
   * - 입력 제한
   * - 또는 validation 에러 처리 가능
   *
   * @example
   * max={100}
   */
  max?: number;

  /**
   * 천 단위 구분자 사용 여부
   *
   * true일 경우:
   * 10000 → 10,000
   *
   * 내부 값은 parse 단계에서 콤마 제거 권장
   *
   * @default false
   */
  useThousandsSeparator?: boolean;
}
