import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';
import { SelectOptionProps, SelectOptionsProps, SelectProps, SelectTriggerProps } from './Select.type';

/**
 * Select 내부 상태 공유용 Context
 */
type SelectContextValue = {
  /** 드롭다운 열림 여부 */
  open: boolean;

  /** 드롭다운 열기/닫기 */
  setOpen: (v: boolean) => void;

  /** 현재 선택된 값들 */
  value: string[];

  /** 값 토글 */
  toggleValue: (v: string) => void;

  /** 다중 선택 여부 */
  multiple: boolean;

  /** Trigger DOM ref */
  triggerRef: React.RefObject<HTMLDivElement | null>;

  /** Option DOM refs 목록 */
  optionRefs: React.MutableRefObject<HTMLDivElement[]>;

  /** 현재 포커스된 옵션 index */
  focusedIndex: number | null;

  /** 포커스 index 설정 */
  setFocusedIndex: Dispatch<SetStateAction<number>>;
};

const SelectContext = createContext<SelectContextValue | null>(null);

/**
 * Select Context 접근 훅
 *
 * @throws Select 외부에서 사용할 경우 에러
 */
export const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used within <Select>');
  return ctx;
};

/**
 * Select 루트 컨테이너
 *
 * - 상태 관리 담당
 * - Context Provider 역할
 */
const SelectContainer = ({ value, onChange, multiple = false, children }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const toggleValue = (v: string) => {
    if (!multiple) {
      onChange([v]);
      setOpen(false);
      return;
    }

    onChange(
      value.includes(v)
        ? value.filter(i => i !== v)
        : [...value, v],
    );
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        toggleValue,
        multiple,
        triggerRef,
        optionRefs,
        focusedIndex,
        setFocusedIndex,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

/**
 * Select 트리거 버튼
 *
 * - 클릭 시 Options 열림
 * - 최초 포커스를 첫 옵션으로 이동
 */
const Trigger = (props: SelectTriggerProps) => {
  const { open, setOpen, triggerRef, setFocusedIndex } = useSelectContext();

  return (
    <div
      ref={triggerRef}
      role={'button'}
      aria-expanded={open}
      onClick={(e) => {
        setOpen(!open);
        setFocusedIndex(0);
        props.onClick?.(e);
      }}
      {...props}
    />
  );
};

/**
 * Options 드롭다운 영역
 *
 * 기능:
 * - 외부 클릭 시 닫힘
 * - ESC 키 닫기
 * - ↑ ↓ 키 포커스 이동
 * - portal 렌더링
 */
const Options = ({ children, ...props }: SelectOptionsProps) => {
  const { open, triggerRef, setOpen, setFocusedIndex, optionRefs } = useSelectContext();
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerWidth =
    triggerRef.current?.getBoundingClientRect().width;


  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, setOpen, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        setOpen(false);
        setFocusedIndex(-1);
      }

      if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => prev - 1 < 0 ? optionRefs.current.length - 1 : prev - 1);
      }

      if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => prev + 1 >= optionRefs.current.length ? 0 : prev + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      optionRefs.current = [];
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [open]);

  const { portal } = usePortal({
    visible: open,
    targetRef: triggerRef,
    popoverRef,
    direction: 'bottom',
    gap: 4,
    content: (
      <div ref={popoverRef}
           style={{ width: triggerWidth }} {...props}>
        {children}
      </div>
    ),
  });

  return open ? portal : null;
};

/**
 * 개별 선택 옵션
 *
 * 기능:
 * - 선택 상태 표시
 * - 포커스 관리
 * - disabled 지원
 */
const Option = ({ value, disabled, children, ...props }: SelectOptionProps) => {
  const { value: selected, toggleValue, optionRefs, focusedIndex } = useSelectContext();
  const isSelected = selected.includes(value);
  const [index, setIndex] = useState<number | null>(null);
  const isFocused = useMemo(() => focusedIndex === index, [focusedIndex, index]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && index === null) {
      setIndex(optionRefs.current.length);
      optionRefs.current[optionRefs.current.length] = ref.current;
    }
  }, []);

  useEffect(() => {
    ref.current?.setAttribute('data-focused', String(focusedIndex === index));
    if (focusedIndex === index) {
      ref.current?.focus();
    }
  }, [focusedIndex, index]);

  return (
    <div
      ref={ref}
      role='option'
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-focused={isFocused}
      onClick={() => {
        if (!disabled) toggleValue(value);
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Compound Select 컴포넌트
 *
 * 사용 예시:
 *
 * @example
 * <Select value={value} onChange={setValue}>
 *   <Select.Trigger>열기</Select.Trigger>
 *   <Select.Options>
 *     <Select.Option value="a">A</Select.Option>
 *     <Select.Option value="b">B</Select.Option>
 *   </Select.Options>
 * </Select>
 */
const Select = Object.assign(SelectContainer, {
  Trigger,
  Options,
  Option,
});

export default Select;
