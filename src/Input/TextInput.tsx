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

/**
 * 범용 TextInput 컴포넌트
 *
 * - maxLength: (조합 입력 중이 아닐 때) 최대 길이 제한
 * - pattern: 정규식 문자열(매 입력마다 test 통과해야 반영)
 * - disallowPattern: "허용" 정규식(현재 구현은 test가 false면 return)
 * - validator: 값 검증 (boolean | error message string 반환 가능)
 * - trimWhitespace: blur 시 앞뒤 공백 제거 후 onChange 호출
 * - debounceMs / onDebouncedChange: 디바운스된 값 콜백
 * - throttleMs / onThrottledChange: 스로틀된 값 콜백
 *
 * @example
 * // 1) 기본 사용
 * <TextInput
 *   placeholder="이름을 입력하세요"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 2) maxLength + trimWhitespace (blur 시 공백 제거)
 * <TextInput
 *   maxLength={20}
 *   trimWhitespace
 *   placeholder="최대 20자, blur 시 공백 제거"
 *   onChange={(e) => console.log('change:', e.target.value)}
 * />
 *
 * @example
 * // 3) pattern(문자열)로 숫자만 허용
 * // - 입력값이 정규식에 매번 매칭되어야 반영됨
 * <TextInput
 *   pattern="^[0-9]*$"
 *   inputMode="numeric"
 *   placeholder="숫자만 입력"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 4) disallowPattern(정규식)로 "허용 규칙" 적용 (현재 구현 기준)
 * // - test가 false면 반영되지 않음
 * // - 예: 영문/숫자/언더스코어만 허용
 * <TextInput
 *   disallowPattern={/^[a-zA-Z0-9_]*$/}
 *   placeholder="영문/숫자/_ 만"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 5) validator + onValidate
 * // - validator가 false면 onChange가 호출되지 않음
 * // - 문자열 반환 시 그 문자열이 error로 넘어감
 * <TextInput
 *   placeholder="이메일"
 *   validator={(v) => {
 *     if (!v) return true; // 빈 값은 통과(원하면 false로 바꿔도 됨)
 *     const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 *     return ok || '이메일 형식이 아니에요';
 *   }}
 *   onValidate={(isValid, error) => {
 *     console.log('valid:', isValid, 'error:', error);
 *   }}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 6) debounce: 입력은 즉시 반영(onChange), 서버검색/자동완성은 디바운스로 처리
 * <TextInput
 *   placeholder="검색어 입력"
 *   debounceMs={300}
 *   onDebouncedChange={(value) => {
 *     // fetch(`/api/search?q=${encodeURIComponent(value)}`)
 *     console.log('debounced:', value);
 *   }}
 *   onChange={(e) => console.log('immediate:', e.target.value)}
 * />
 *
 * @example
 * // 7) throttle: 스크롤/리사이즈처럼 자주 쏘는 이벤트에 유용한 패턴
 * <TextInput
 *   placeholder="입력값 로깅(최대 200ms에 1번)"
 *   throttleMs={200}
 *   onThrottledChange={(value) => console.log('throttled:', value)}
 *   onChange={(e) => console.log('immediate:', e.target.value)}
 * />
 *
 * @example
 * // 8) IME(한글/일본어) 조합 이벤트 처리 예시
 * <TextInput
 *   placeholder="한글 입력"
 *   maxLength={10}
 *   onCompositionStart={() => console.log('compose start')}
 *   onCompositionEnd={() => console.log('compose end')}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 */

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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