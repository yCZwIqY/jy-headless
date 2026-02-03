import React, { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';
import type {
  AutocompleteInputProps,
  AutocompleteItem,
  AutocompleteOptionProps,
  AutocompleteOptionsProps,
  AutocompleteProps,
} from './Autocomplete.type';

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;

  selectedValue: string | null;
  setSelectedValue: (v: string | null) => void;

  query: string;
  setQuery: (v: string) => void;

  disabled?: boolean;

  inputRef: React.RefObject<HTMLInputElement | null>;

  // a11y ids
  listboxId: string;

  // active is index in "filtered items"
  activeIndex: number;
  setActiveIndex: (v: number) => void;

  // filtered items (virtualization uses this)
  filtered: AutocompleteItem[];

  // for aria-live
  statusText: string;

  // commit selection by filtered index
  commitByIndex: (index: number) => void;

  // close helper
  close: () => void;
};

const AutocompleteContext = createContext<Ctx | null>(null);
const useAutocomplete = () => {
  const ctx = useContext(AutocompleteContext);
  if (!ctx) throw new Error('Autocomplete components must be used within <Autocomplete>');
  return ctx;
};

const defaultFilter = (item: AutocompleteItem, query: string) =>
  item.label.toLowerCase().includes(query.trim().toLowerCase());

/**
 * Root
 */
const AutocompleteContainer = ({
                                 value,
                                 onChange,
                                 inputValue,
                                 onInputChange,
                                 disabled,
                                 filterFn = defaultFilter,
                                 children,
                               }: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  // controlled/uncontrolled query
  const [internalQuery, setInternalQuery] = useState('');
  const query = inputValue ?? internalQuery;
  const setQuery = (v: string) => {
    onInputChange?.(v);
    if (inputValue === undefined) setInternalQuery(v);
  };

  const listboxId = useId();

  // NOTE:
  // - virtualization을 제대로 하려면 options data(items)가 Root에 필요하지만,
  //   compound API 유지를 위해 Options에서 items를 주입받아 Root에서 filtered를 만들기 어렵다.
  // 그래서 Root에서는 "filtered"를 Options에서 제공할 수 있게 설계하면 복잡해짐.
  // ✅ 해결: Options에 items를 주면 Root가 접근할 수 있도록 "itemsRef"를 둔다.
  const itemsRef = useRef<AutocompleteItem[]>([]);
  const setItems = (items: AutocompleteItem[]) => {
    itemsRef.current = items;
  };

  const filtered = useMemo(() => {
    const src = itemsRef.current ?? [];
    if (!query.trim()) return src;
    return src.filter((it) => filterFn(it, query));
  }, [query, filterFn]);

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const commitByIndex = (index: number) => {
    const item = filtered[index];
    if (!item || item.disabled) return;
    onChange(item.value);
    setQuery(item.label);
    close();
  };

  // 외부 value 변경 시 input label 동기화
  useEffect(() => {
    if (!value) return;
    const found = itemsRef.current.find((i) => i.value === value);
    if (found) setQuery(found.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const statusText = useMemo(() => {
    if (!open) return '';
    const n = filtered.length;
    if (n === 0) return 'No results.';
    if (n === 1) return '1 result available.';
    return `${n} results available.`;
  }, [open, filtered.length]);

  return (
    <AutocompleteContext.Provider
      value={{
        open,
        setOpen,
        selectedValue: value,
        setSelectedValue: onChange,
        query,
        setQuery,
        disabled,
        inputRef,
        listboxId,
        activeIndex,
        setActiveIndex,
        filtered,
        statusText,
        commitByIndex,
        close,
      }}
    >
      {/* Options가 items를 Root에 주입 */}
      <ItemsBridge onItems={setItems} />
      {children}
    </AutocompleteContext.Provider>
  );
};

/**
 * Options에서 items를 주입해주기 위한 브릿지(보이지 않는 컴포넌트)
 * - Options가 items prop을 받으면, 내부에서 window.__ 같은 걸 쓰지 않고 Root ref에 주입
 */
const ItemsBridgeContext = createContext<((items: AutocompleteItem[]) => void) | null>(null);

const ItemsBridge = ({ onItems }: { onItems: (items: AutocompleteItem[]) => void }) => {
  return <ItemsBridgeContext.Provider value={onItems} />;
};

const useItemsBridge = () => useContext(ItemsBridgeContext);

/**
 * Input (Combobox Trigger)
 * - 포커스는 input 유지
 * - aria-activedescendant로 active option을 알려줌
 */
const Input = ({ onKeyDown, onFocus, onChange, ...props }: AutocompleteInputProps) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    disabled,
    listboxId,
    activeIndex,
    setActiveIndex,
    filtered,
    commitByIndex,
    close,
    inputRef,
  } = useAutocomplete();

  const activeId = activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined;

  const move = (delta: number) => {
    if (!filtered.length) return;
    setOpen(true);
    setActiveIndex(activeIndex < 0 ? 0 : (activeIndex + delta + filtered.length) % filtered.length);
  };

  const pageMove = (deltaPages: number) => {
    if (!filtered.length) return;
    setOpen(true);
    // 10개 단위 이동(관례). 필요하면 props로 빼도 됨
    const jump = 10 * deltaPages;
    setActiveIndex(Math.max(0, Math.min(filtered.length - 1, (activeIndex < 0 ? 0 : activeIndex) + jump)));
  };

  return (
    <>
      <input
        ref={inputRef}
        role='combobox'
        aria-autocomplete='list'
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={activeId}
        disabled={disabled}
        value={query}
        onFocus={(e) => {
          if (!disabled) {
            setOpen(true);
            setActiveIndex(filtered.length ? 0 : -1);
          }
          onFocus?.(e);
        }}
        onChange={(e) => {
          if (disabled) return;
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(0);
          onChange?.(e);
        }}
        onKeyDown={(e) => {
          if (disabled) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              move(1);
              break;
            case 'ArrowUp':
              e.preventDefault();
              move(-1);
              break;
            case 'Home':
              e.preventDefault();
              setOpen(true);
              setActiveIndex(filtered.length ? 0 : -1);
              break;
            case 'End':
              e.preventDefault();
              setOpen(true);
              setActiveIndex(filtered.length ? filtered.length - 1 : -1);
              break;
            case 'PageDown':
              e.preventDefault();
              pageMove(1);
              break;
            case 'PageUp':
              e.preventDefault();
              pageMove(-1);
              break;
            case 'Enter':
              if (open && activeIndex >= 0) {
                e.preventDefault();
                commitByIndex(activeIndex);
              }
              break;
            case 'Escape':
              e.preventDefault();
              close();
              break;
            case 'Tab':
              // 관례: 탭 이동 시 팝오버 닫기
              close();
              break;
          }

          onKeyDown?.(e);
        }}
        {...props}
      />
      {/* aria-live: 결과 개수 안내 */}
      <span
        aria-live='polite'
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}
      >
        {open ? `${filtered.length} results.` : ''}
      </span>
    </>
  );
};

/**
 * Options
 * - portal
 * - outside click close
 * - virtualization (items + renderItem provided)
 */
const Options = ({
                   items,
                   renderItem,
                   itemHeight = 36,
                   maxVisibleItems = 8,
                   overscan = 3,
                   children,
                   ...props
                 }: AutocompleteOptionsProps) => {
  const bridge = useItemsBridge();
  const {
    open,
    setOpen,
    close,
    inputRef,
    listboxId,
    filtered,
    activeIndex,
    setActiveIndex,
    commitByIndex,
  } = useAutocomplete();

  // items 주입(가상화 모드)
  useEffect(() => {
    if (items && bridge) bridge(items);
  }, [items, bridge]);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerWidth = inputRef.current?.getBoundingClientRect().width;

  // outside click
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (inputRef.current?.contains(t) || popoverRef.current?.contains(t)) return;
      close();
    };

    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, close, inputRef]);

  // scroll container ref for virtualization
  const scrollRef = useRef<HTMLDivElement>(null);

  // active option이 항상 보이게 스크롤 보정
  useEffect(() => {
    if (!open) return;
    if (!scrollRef.current) return;
    if (activeIndex < 0) return;

    const top = activeIndex * itemHeight;
    const bottom = top + itemHeight;

    const viewTop = scrollRef.current.scrollTop;
    const viewBottom = viewTop + scrollRef.current.clientHeight;

    if (top < viewTop) scrollRef.current.scrollTop = top;
    else if (bottom > viewBottom) scrollRef.current.scrollTop = bottom - scrollRef.current.clientHeight;
  }, [open, activeIndex, itemHeight]);

  // virtualization range
  const total = filtered.length;
  const viewportCount = Math.min(maxVisibleItems, Math.max(1, total));
  const viewportHeight = viewportCount * itemHeight;

  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(total, Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan);

  const visible = filtered.slice(startIndex, endIndex);

  const { portal } = usePortal({
    visible: open,
    targetRef: inputRef,
    popoverRef,
    direction: 'bottom',
    gap: 4,
    content: (
      <div
        ref={popoverRef}
        style={{ width: triggerWidth }}
        {...props}
      >
        {/* ✅ 가상화 모드 */}
        {items && renderItem ? (
          <div
            id={listboxId}
            role='listbox'
            ref={scrollRef}
            style={{ maxHeight: viewportHeight, overflow: 'auto', position: 'relative' }}
            onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
          >
            <div style={{ height: total * itemHeight, position: 'relative' }}>
              {visible.map((item, i) => {
                const index = startIndex + i; // filtered index
                const isActive = index === activeIndex;
                const isSelected = item.value === (undefined as any); // selection 표시를 더 강하게 원하면 ctx.selectedValue 비교해서 쓰면 됨

                return (
                  <div
                    key={item.value}
                    id={`${listboxId}-opt-${index}`}
                    role='option'
                    aria-selected={isSelected}
                    aria-disabled={item.disabled}
                    data-active={isActive}
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => {
                      // 클릭 시 input blur 방지(중요)
                      e.preventDefault();
                    }}
                    onClick={() => commitByIndex(index)}
                    style={{
                      position: 'absolute',
                      top: index * itemHeight,
                      left: 0,
                      right: 0,
                      height: itemHeight,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {renderItem(item)}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ✅ children 모드(비가상화) */
          <div id={listboxId}
               role='listbox'>
            {children}
          </div>
        )}
      </div>
    ),
  });

  return open ? portal : null;
};

/**
 * Option (children 모드 전용 / small list)
 * - a11y option role/ids만 최소 보장
 * - 가상화는 여기엔 적용하지 않음
 */
const Option = ({ value, label, disabled, children, ...props }: AutocompleteOptionProps) => {
  const {
    listboxId,
    filtered,
    query,
    open,
    setOpen,
    setQuery,
    setSelectedValue,
    activeIndex,
    setActiveIndex,
  } = useAutocomplete();

  // children 모드에서 필터링은 “간단 버전”
  const visible = useMemo(() => {
    if (!query.trim()) return true;
    return label.toLowerCase().includes(query.trim().toLowerCase());
  }, [label, query]);

  const index = useMemo(() => {
    // filtered는 items 모드에서만 의미있음.
    // children 모드는 간단히 -1 처리(aria-activedescendant는 items 모드가 권장)
    return -1;
  }, []);

  if (!visible) return null;

  return (
    <div
      role="option"
      aria-disabled={disabled}
      aria-selected={false}
      tabIndex={-1}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        if (disabled) return;
        setSelectedValue(value);
        setQuery(label);
        setOpen(false);
        setActiveIndex(-1);
      }}
      {...props}
    >
      {children ?? label}
    </div>
  );
};

const Autocomplete = Object.assign(AutocompleteContainer, {
  Input,
  Options,
  Option,
});

export default Autocomplete;
