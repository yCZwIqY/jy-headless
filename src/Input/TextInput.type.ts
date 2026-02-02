import { ChangeEvent, CompositionEvent, HTMLProps } from 'react';

/**
 * 고급 기능을 제공하는 TextInput 컴포넌트 props
 *
 * 기능:
 * - validation
 * - formatting/parsing
 * - debounce/throttle
 * - IME(한글 입력) 대응
 * - 공백 제어
 */
export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  /**
   * 입력값 검증 함수
   *
   * return:
   * - true → 유효
   * - false → 유효하지 않음
   * - string → 에러 메시지
   *
   * @example
   * validator={(v) => v.length > 3 || "최소 3자 이상"}
   */
  validator?: (value: string) => boolean | string;

  /**
   * 검증 결과 콜백
   */
  onValidate?: (isValid: boolean, error?: string) => void;

  /**
   * 표시용 값 포맷팅
   *
   * ex) 숫자 천단위 콤마
   */
  format?: (value: string) => string;

  /**
   * 실제 값으로 변환
   *
   * ex) 콤마 제거
   */
  parse?: (value: string) => string;

  /**
   * 입력을 막을 패턴
   *
   * @example 숫자만 허용
   * disallowPattern={/[^0-9]/g}
   */
  disallowPattern?: RegExp;

  /**
   * 공백 제거 방식
   *
   * - true → 전체 trim
   * - 'leading' → 앞 공백만
   * - 'trailing' → 뒤 공백만
   * - 'both' → 양쪽
   */
  trimWhitespace?: boolean | 'leading' | 'trailing' | 'both';

  /**
   * IME 입력 시작 이벤트
   *
   * 한글/중국어 입력 시 중요
   */
  onCompositionStart?: (e: CompositionEvent<HTMLInputElement>) => void;

  /**
   * IME 입력 종료 이벤트
   */
  onCompositionEnd?: (e: CompositionEvent<HTMLInputElement>) => void;

  /**
   * IME 입력 중 이벤트
   */
  onCompositionUpdate?: (e: CompositionEvent<HTMLInputElement>) => void;

  /**
   * debounce 지연(ms)
   *
   * @example 300
   */
  debounceMs?: number;

  /**
   * throttle 지연(ms)
   */
  throttleMs?: number;

  /**
   * debounce 후 값 변경 콜백
   */
  onDebouncedChange?: (value: string) => void;

  /**
   * throttle 후 값 변경 콜백
   */
  onThrottledChange?: (value: string) => void;

  /**
   * 기본 onChange override
   *
   * ⚠️ 일반 HTML onChange와 동일
   */
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}
