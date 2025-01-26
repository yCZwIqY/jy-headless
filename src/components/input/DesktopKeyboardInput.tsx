import React, { CSSProperties, useEffect, useState } from 'react';

interface KeyRow {
  code: string;
  label: string;
  key: string;
  shiftLabel?: string | null;
  kor?: string | null;
  korShift?: string | null;
}

interface KeyRowValue {
  code: string;
  label: string;
}

const functionRow: KeyRow[][] = [
  [
    { code: 'Escape', label: 'Esc', key: 'Escape' },
    { code: null, label: '', key: '' },
  ],
  [
    { code: 'F1', label: 'F1', key: 'F1' },
    { code: 'F2', label: 'F2', key: 'F2' },
    { code: 'F3', label: 'F3', key: 'F3' },
    { code: 'F4', label: 'F4', key: 'F4' },
    { code: null, label: '', key: '' },
  ],
  [
    { code: 'F5', label: 'F5', key: 'F5' },
    { code: 'F6', label: 'F6', key: 'F6' },
    { code: 'F7', label: 'F7', key: 'F7' },
    { code: 'F8', label: 'F8', key: 'F8' },
    { code: null, label: '', key: '' },
  ],
  [
    { code: 'F9', label: 'F9', key: 'F9' },
    { code: 'F10', label: 'F10', key: 'F10' },
    { code: 'F11', label: 'F11', key: 'F11' },
    { code: 'F12', label: 'F12', key: 'F12' },
    { code: null, label: '', key: '' },
  ],
  [
    { code: 'PrintScreen', label: 'Print Screen', key: 'PrintScreen' },
    { code: 'ScrollLock', label: 'Scroll Lock', key: 'ScrollLock' },
    { code: 'Pause', label: 'Pause', key: 'Pause' },
  ],
];

const numberRow: KeyRow[] = [
  { code: 'Backquote', label: '~', shiftLabel: '¡', key: '`' },
  { code: 'Digit1', label: '1', shiftLabel: '!', key: '1' },
  { code: 'Digit2', label: '2', shiftLabel: '@', key: '2' },
  { code: 'Digit3', label: '3', shiftLabel: '#', key: '3' },
  { code: 'Digit4', label: '4', shiftLabel: '$', key: '4' },
  { code: 'Digit5', label: '5', shiftLabel: '%', key: '5' },
  { code: 'Digit6', label: '6', shiftLabel: '^', key: '6' },
  { code: 'Digit7', label: '7', shiftLabel: '&', key: '7' },
  { code: 'Digit8', label: '8', shiftLabel: '*', key: '8' },
  { code: 'Digit9', label: '9', shiftLabel: '(', key: '9' },
  { code: 'Digit0', label: '0', shiftLabel: ')', key: '0' },
  { code: 'Minus', label: '-', shiftLabel: '_', key: '-' },
  { code: 'Equal', label: '=', shiftLabel: '+', key: '=' },
  { code: 'Backspace', label: 'Backspace', key: 'Backspace' },
];

const qwertyRow: KeyRow[] = [
  { code: 'Tab', label: 'Tab', key: 'Tab' },
  { code: 'KeyQ', label: 'q', shiftLabel: 'Q', kor: 'ㅂ', korShift: 'ㅃ', key: 'q' },
  { code: 'KeyW', label: 'w', shiftLabel: 'W', kor: 'ㅈ', korShift: 'ㅉ', key: 'w' },
  { code: 'KeyE', label: 'e', shiftLabel: 'E', kor: 'ㄷ', korShift: 'ㄸ', key: 'e' },
  { code: 'KeyR', label: 'r', shiftLabel: 'R', kor: 'ㄱ', korShift: 'ㄲ', key: 'r' },
  { code: 'KeyT', label: 't', shiftLabel: 'T', kor: 'ㅅ', korShift: 'ㅆ', key: 't' },
  { code: 'KeyY', label: 'y', shiftLabel: 'Y', kor: 'ㅛ', korShift: 'ㅕ', key: 'y' },
  { code: 'KeyU', label: 'u', shiftLabel: 'U', kor: 'ㅕ', korShift: 'ㅕ', key: 'u' },
  { code: 'KeyI', label: 'i', shiftLabel: 'I', kor: 'ㅑ', korShift: 'ㅑ', key: 'i' },
  { code: 'KeyO', label: 'o', shiftLabel: 'O', kor: 'ㅐ', korShift: 'ㅒ', key: 'o' },
  { code: 'KeyP', label: 'p', shiftLabel: 'P', kor: 'ㅔ', korShift: 'ㅖ', key: 'p' },
  { code: 'BracketLeft', label: '[', shiftLabel: '{', kor: null, korShift: null, key: '[' },
  { code: 'BracketRight', label: ']', shiftLabel: '}', kor: null, korShift: null, key: ']' },
  { code: 'Backslash', label: '\\', shiftLabel: '|', kor: null, korShift: null, key: '\\' },
];

const homeRow: KeyRow[] = [
  { code: 'CapsLock', label: 'Caps Lock', kor: null, korShift: null, key: 'CapsLock' },
  { code: 'KeyA', label: 'a', shiftLabel: 'A', kor: 'ㅁ', korShift: 'ㅁ', key: 'a' },
  { code: 'KeyS', label: 's', shiftLabel: 'S', kor: 'ㄴ', korShift: 'ㄴ', key: 's' },
  { code: 'KeyD', label: 'd', shiftLabel: 'D', kor: 'ㅇ', korShift: 'ㅇ', key: 'd' },
  { code: 'KeyF', label: 'f', shiftLabel: 'F', kor: 'ㄹ', korShift: 'ㄹ', key: 'f' },
  { code: 'KeyG', label: 'g', shiftLabel: 'G', kor: 'ㅎ', korShift: 'ㅎ', key: 'g' },
  { code: 'KeyH', label: 'h', shiftLabel: 'H', kor: 'ㅗ', korShift: 'ㅗ', key: 'h' },
  { code: 'KeyJ', label: 'j', shiftLabel: 'J', kor: 'ㅓ', korShift: 'ㅓ', key: 'j' },
  { code: 'KeyK', label: 'k', shiftLabel: 'K', kor: 'ㅏ', korShift: 'ㅏ', key: 'k' },
  { code: 'KeyL', label: 'l', shiftLabel: 'L', kor: 'ㅣ', korShift: 'ㅣ', key: 'l' },
  { code: 'Semicolon', label: ';', shiftLabel: ':', kor: null, korShift: null, key: ';' },
  { code: 'Quote', label: "'", shiftLabel: '"', kor: null, korShift: null, key: "'" },
  { code: 'Enter', label: 'Enter', kor: null, korShift: null, key: 'Enter' },
];

const bottomRow: KeyRow[] = [
  { code: 'ShiftLeft', label: 'Shift', kor: null, key: 'Shift' },
  { code: 'KeyZ', label: 'z', shiftLabel: 'Z', kor: 'ㅋ', key: 'z' },
  { code: 'KeyX', label: 'x', shiftLabel: 'X', kor: 'ㅌ', key: 'x' },
  { code: 'KeyC', label: 'c', shiftLabel: 'C', kor: 'ㅊ', key: 'c' },
  { code: 'KeyV', label: 'v', shiftLabel: 'V', kor: 'ㅍ', key: 'v' },
  { code: 'KeyB', label: 'b', shiftLabel: 'B', kor: 'ㅠ', key: 'b' },
  { code: 'KeyN', label: 'n', shiftLabel: 'N', kor: 'ㅜ', key: 'n' },
  { code: 'KeyM', label: 'm', shiftLabel: 'M', kor: 'ㅡ', key: 'm' },
  { code: 'Comma', label: ',', shiftLabel: '<', kor: null, key: ',' },
  { code: 'Period', label: '.', shiftLabel: '>', kor: null, key: '.' },
  { code: 'Slash', label: '/', shiftLabel: '?', kor: null, key: '/' },
  { code: 'ShiftRight', label: 'Shift', kor: null, key: 'Shift' },
];

const spaceRow: KeyRow[] = [
  { code: 'ControlLeft', label: 'Ctrl', key: 'Control' },
  { code: 'MetaLeft', label: 'Win', key: 'Meta' },
  { code: 'AltLeft', label: 'Alt', key: 'Alt' },
  { code: 'Space', label: 'Space', key: ' ' },
  { code: 'AltRight', label: 'Alt', key: 'Alt' },
  { code: 'Fn', label: 'Fn', key: 'Fn' },
  { code: 'ContextMenu', label: 'Menu', key: 'ContextMenu' },
  { code: 'ControlRight', label: 'Ctrl', key: 'Control' },
];

type KeyboardLayout = 'full-size' | 'tenkeyless' | 'compact-96';

interface DesktopKeyboardInputProps {
  type?: KeyboardLayout;
  hasFunction?: boolean;
  hasNumpad?: boolean;
  cellStyle?: CSSProperties;
  cellClassName?: string;
  activeCellStyle?: CSSProperties;
  activeCellClassName?: string;
  style?: CSSProperties;
  className?: string;
  resetStyle?: boolean;
  isKor?: boolean;
  onKeyDown?: (e) => void;
  onKeyUp?: (e) => void;
  cellSize?: string;
}

const DesktopKeyboardInput = ({
  type = 'full-size',
  hasFunction = true,
  hasNumpad = true,
  cellStyle = {},
  cellClassName = '',
  activeCellStyle = {},
  activeCellClassName = '',
  style = {},
  className = '',
  onKeyDown,
  onKeyUp,
}: DesktopKeyboardInputProps) => {
  const [inputKey, setInputKey] = useState([]);
  const [isShift, setIsShift] = useState(false);
  const [isHangulMode, setIsHangulMode] = useState(false);

  const getKeyFromEvent = (keyCode: string): KeyRowValue => {
    let row: KeyRow | undefined = null;

    const allRows = [
      ...functionRow.flat(),
      ...numberRow,
      ...qwertyRow,
      ...homeRow,
      ...bottomRow,
      ...spaceRow,
    ];

    row = allRows.find((row) => row.code === keyCode);
    return {
      code: row.code ?? '',
      label: getLabel(row) ?? '',
    };
  };

  const getLabel = (key) => {
    if (isHangulMode) {
      if (isShift) {
        return key.korShift || key.kor || key.shiftLabel || key.label;
      }
      return key.kor || key.label;
    }

    if (isShift) {
      return key.shiftLabel || key.label;
    }
    return key.label;
  };

  useEffect(() => {
    const keyDown = (e) => {
      e.preventDefault();
      setInputKey((prevState) => [...prevState, e.code]);
      if (e.key === 'Shift') setIsShift(true);
      onKeyDown?.(getKeyFromEvent(e.code));
    };

    const keyUp = (e) => {
      e.preventDefault();
      if (e.key === 'HangulMode') {
        setIsHangulMode((prev) => !prev);
      }
      setInputKey((prevState) => prevState.filter((it) => it !== e.code));
      if (e.key === 'Shift') setIsShift(false);
      onKeyUp?.(getKeyFromEvent(e.code));
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [onKeyDown, onKeyUp, isShift, isHangulMode]);

  const renderRow = (row: KeyRow[], rowType: string) => {
    const getCellStyle = (key) => {
      if (key.code === null) return;
      const isActive =
        inputKey.map((it) => it?.toUpperCase()).includes(key.code?.toUpperCase()) ||
        (inputKey.includes('HangulMode') && key.code === 'AltRight');
      let gridColumn = '';
      switch (key.code) {
        case 'Space':
          gridColumn = '4/12';
          break;
        case 'ShiftRight':
          gridColumn = '13/15';
          break;
        case 'Backspace':
          gridColumn = '14/16';
          break;
        case 'Tab':
        case 'ShiftLeft':
        case 'CapsLock':
          gridColumn = '1/3';
          break;
        case 'Backslash':
          gridColumn = '15/17';
          break;
        case 'Enter':
          gridColumn = '14/16';
          break;
        default:
          break;
      }

      return {
        style: { gridColumn, ...(isActive ? activeCellStyle : cellStyle) },
        className: isActive ? activeCellClassName : cellClassName,
      };
    };

    const onMouseDown = (key) => {
      if (!key.code) return;
      setInputKey([key.code]);
      if (['ShiftRight', 'ShiftLeft'].includes(key.code)) setIsShift(true);
      onKeyDown?.(getKeyFromEvent(key.code));
    };

    const onMouseUp = (key) => {
      if (!key.code) return;
      if (key.code === 'AltRight') {
        setIsHangulMode((prev) => !prev);
      }
      setInputKey((prevState) => prevState.filter((it) => it !== key.code));
      if (['ShiftRight', 'ShiftLeft'].includes(key.code)) setIsShift(false);
      onKeyUp?.(getKeyFromEvent(key.code));
    };

    return row.map((key, idx) => (
      <div
        key={`${key.code}-${idx}`}
        onMouseDown={() => onMouseDown(key)}
        onMouseUp={() => onMouseUp(key)}
        {...getCellStyle(key)}
      >
        {getLabel(key)}
      </div>
    ));
  };

  return (
    <div style={style} className={className}>
      {['full-size', 'tenkeyless'].includes(type) && hasFunction && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(20, 1fr)`, gap: '2px' }}>
          {renderRow(functionRow.flat(), 'function')}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '2px' }}>
        {renderRow(numberRow, 'number')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '2px' }}>
        {renderRow(qwertyRow, 'qwerty')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '2px' }}>
        {renderRow(homeRow, 'home')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: '2px' }}>
        {renderRow(bottomRow, 'bottom')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '2px' }}>
        {renderRow(spaceRow, 'space')}
      </div>
    </div>
  );
};

export default DesktopKeyboardInput;
