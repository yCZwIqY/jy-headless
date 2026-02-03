import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import usePortal from '../hooks/usePortal';
import {
  AutocompleteInputProps,
  AutocompleteOptionProps,
  AutocompleteOptionsProps,
  AutocompleteProps,
} from './Autocomplete.type';

type RegisteredOption = {
  value: string;
  label: string;
  disabled?: boolean;
  ref: HTMLDivElement;
};

type AutocompleteContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;

  /** 선택된 option value */
  selectedValue: string | null;
  setSelectedValue: (v: string | null) => void;

  /** input에 보여주는 텍스트(검색어) */
  query: string;
  setQuery: (v: string) => void;

  disabled?: boolean;

  inputRef: React.RefObject<HTMLInputElement | null>;
  optionRefs: React.MutableRefObject<HTMLDivElement[]>;
  options: React.MutableRefObject<RegisteredOption[]>;

  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;

  /** 필터링 후 보이는 옵션 인덱스 목록(원본 options 기준 index) */
  visibleIndexes: number[];
  setVisibleIndexes: Dispatch<SetStateAction<number[]>>;
};

const AutocompleteContext = createContext<AutocompleteContextValue | null>(null);

const useAutocompleteContext = () => {
  const ctx = useContext(AutocompleteContext);
  if (!ctx) throw new Error('Autocomplete components must be used within <Autocomplete>');
  return ctx;
};

/**
 * Root
 */
const AutocompleteContainer = ({
                                 value,
                                 onChange,
                                 inputValue,
                                 onInputChange,
                                 disabled,
                                 children,
                               }: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);
  const options = useRef<RegisteredOption[]>([]);

  // query: controlled/uncontrolled 모두 지원
  const [internalQuery, setInternalQuery] = useState('');
  const query = inputValue ?? internalQuery;
  const setQuery = (v: string) => {
    onInputChange?.(v);
    if (inputValue === undefined) setInternalQuery(v);
  };

  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  const setSelectedValue = (v: string | null) => {
    onChange(v);
  };

  // 선택된 value가 외부에서 바뀌었을 때, label 찾아서 input에 반영(가능하면)
  useEffect(() => {
    if (!value) return;
    const found = options.current.find((o) => o.value === value);
    if (found) setQuery(found.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <AutocompleteContext.Provider
      value={{
        open,
        setOpen,
        selectedValue: value,
        setSelectedValue,
        query,
        setQuery,
        disabled,
        inputRef,
        optionRefs,
        options,
        focusedIndex,
        setFocusedIndex,
        visibleIndexes,
        setVisibleIndexes,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};

/**
 * Input (Trigger)
 */
const Input = ({ onFocus, onChange, onKeyDown, ...props }: AutocompleteInputProps) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    disabled,
    inputRef,
    setFocusedIndex,
    visibleIndexes,
  } = useAutocompleteContext();

  return (
    <input
      ref={inputRef}
      role="combobox"
      aria-expanded={open}
      aria-autocomplete="list"
      disabled={disabled}
      value={query}
      onFocus={(e) => {
        if (!disabled) {
          setOpen(true);
          // 포커스는 첫 visible option으로
          setFocusedIndex(visibleIndexes.length ? 0 : -1);
        }
        onFocus?.(e);
      }}
      onChange={(e) => {
        if (disabled) return;
        setQuery(e.target.value);
        setOpen(true);
        onChange?.(e);
      }}
      onKeyDown={(e) => {
        if (disabled) return;

        // Input에서 키보드 제어
        if (e.key === 'Escape') {
          setOpen(false);
          setFocusedIndex(-1);
          (e.target as HTMLInputElement).blur();
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= visibleIndexes.length ? 0 : next;
          });
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? visibleIndexes.length - 1 : next;
          });
        }

        onKeyDown?.(e);
      }}
      {...props}
    />
  );
};

/**
 * Options (Dropdown)
 */
const Options = ({ children, ...props }: AutocompleteOptionsProps) => {
  const {
    open,
    setOpen,
    inputRef,
    optionRefs,
    focusedIndex,
    setFocusedIndex,
    visibleIndexes,
  } = useAutocompleteContext();

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerWidth = inputRef.current?.getBoundingClientRect().width;

  // 외부 클릭 닫기
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (inputRef.current?.contains(target) || popoverRef.current?.contains(target)) return;

      setOpen(false);
      setFocusedIndex(-1);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open, setOpen, setFocusedIndex, inputRef]);

  // Options 영역에서 Enter로 선택될 수 있게(문서 keydown)
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (focusedIndex < 0) return;

      // 현재 포커스된 visible option DOM을 클릭 처리
      const dom = optionRefs.current[visibleIndexes[focusedIndex]];
      dom?.click();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, focusedIndex, visibleIndexes, optionRefs]);

  const { portal } = usePortal({
    visible: open,
    targetRef: inputRef,
    popoverRef,
    direction: 'bottom',
    gap: 4,
    content: (
      <div ref={popoverRef} style={{ width: triggerWidth }} role="listbox" {...props}>
        {children}
      </div>
    ),
  });

  return open ? portal : null;
};

/**
 * Option
 *
 * - 최초 mount 시 options registry에 등록
 * - query 변경 시 visibleIndexes 계산
 * - focusedIndex 변경 시 해당 option focus
 */
const Option = ({ value, label, disabled, children, ...props }: AutocompleteOptionProps) => {
  const {
    selectedValue,
    setSelectedValue,
    query,
    setQuery,
    setOpen,
    options,
    optionRefs,
    focusedIndex,
    visibleIndexes,
    setVisibleIndexes,
    setFocusedIndex,
  } = useAutocompleteContext();

  const ref = useRef<HTMLDivElement>(null);
  const [registeredIndex, setRegisteredIndex] = useState<number | null>(null);

  const isSelected = selectedValue === value;

  // 등록
  useEffect(() => {
    if (!ref.current) return;
    if (registeredIndex !== null) return;

    const idx = options.current.length;
    options.current.push({ value, label, disabled, ref: ref.current });
    optionRefs.current[idx] = ref.current;
    setRegisteredIndex(idx);

    return () => {
      // 간단히 초기화(Options unmount 시에도 optionRefs reset 되는 구조를 쓰면 더 깔끔)
      // 여기서는 복잡도 줄이려고 제거 로직은 생략
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터링: query가 바뀌면 visibleIndexes 업데이트
  useEffect(() => {
    const q = query.trim().toLowerCase();

    const next = options.current
                        .map((o, idx) => ({ o, idx }))
                        .filter(({ o }) => (q ? o.label.toLowerCase().includes(q) : true))
                        .map(({ idx }) => idx);

    setVisibleIndexes(next);

    // query가 바뀌면 포커스는 첫 번째 visible로
    setFocusedIndex(next.length ? 0 : -1);
  }, [query, options, setVisibleIndexes, setFocusedIndex]);

  // 포커스 반영 (focusedIndex는 "visible list 기준", 그래서 변환 필요)
  const isFocused = useMemo(() => {
    if (registeredIndex === null) return false;
    const visiblePos = visibleIndexes.indexOf(registeredIndex);
    return visiblePos === focusedIndex;
  }, [focusedIndex, registeredIndex, visibleIndexes]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute('data-focused', String(isFocused));
    if (isFocused) ref.current.focus();
  }, [isFocused]);

  // 현재 옵션이 필터에서 제외되면 렌더링 X
  const shouldRender = useMemo(() => {
    if (registeredIndex === null) return true; // mount 초기에 깜빡임 방지
    return visibleIndexes.includes(registeredIndex);
  }, [registeredIndex, visibleIndexes]);

  if (!shouldRender) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-selected={isSelected}
      data-focused={isFocused}
      onClick={() => {
        if (disabled) return;

        setSelectedValue(value);
        setQuery(label);
        setOpen(false);
      }}
      {...props}
    >
      {children ?? label}
    </div>
  );
};

/**
 * Compound Autocomplete
 */
const Autocomplete = Object.assign(AutocompleteContainer, {
  Input,
  Options,
  Option,
});

export default Autocomplete;
