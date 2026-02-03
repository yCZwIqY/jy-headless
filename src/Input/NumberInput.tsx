import { NumberInputProps } from './NumberInput.type';
import { ChangeEvent } from 'react';
import { TextInput } from './TextInput';

/**
 * 숫자 전용 Input 컴포넌트
 *
 * - 숫자만 입력 가능 (콤마는 내부적으로 제거 후 처리)
 * - max: 최대값 제한 (초과 시 자동으로 max로 보정)
 * - useThousandsSeparator: 천단위 콤마 자동 포맷팅
 * - 실제 onChange로 넘어가는 값은:
 *   - useThousandsSeparator=true → 콤마가 포함된 문자열
 *   - false → 순수 숫자 문자열
 *
 * @example
 * // 1) 기본 숫자 입력
 * <NumberInput
 *   placeholder="숫자 입력"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 2) 최대값 제한
 * <NumberInput
 *   max={100}
 *   placeholder="최대 100"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 3) 천단위 콤마 포맷
 * <NumberInput
 *   useThousandsSeparator
 *   placeholder="금액 입력"
 *   onChange={(e) => console.log(e.target.value)} // 10000 → "10,000"
 * />
 *
 * @example
 * // 4) max + 천단위 콤마 같이 사용
 * <NumberInput
 *   max={1000000}
 *   useThousandsSeparator
 *   placeholder="최대 1,000,000"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // 5) React Hook Form 등과 함께 사용할 때
 * // - 저장 시에는 콤마 제거 후 숫자로 변환하는 게 일반적
 * <NumberInput
 *   useThousandsSeparator
 *   onChange={(e) => {
 *     const numeric = Number(e.target.value.replace(/,/g, ''));
 *     console.log(numeric);
 *   }}
 * />
 */

export const NumberInput = ({ max, useThousandsSeparator, onChange, ...props }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');

    if (rawValue && isNaN(Number(rawValue))) return;

    let finalValue = rawValue;
    if (max && Number(rawValue) > max) {
      finalValue = String(max);
    }

    if (useThousandsSeparator && finalValue) {
      const formattedValue = Number(finalValue).toLocaleString();
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formattedValue,
        },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    } else {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: finalValue,
        },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    }
  };

  return <TextInput {...props} onChange={handleChange} />;
};