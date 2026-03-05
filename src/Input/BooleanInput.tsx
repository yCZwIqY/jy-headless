import { CSSProperties, ChangeEvent, forwardRef, useEffect, useMemo, useState } from 'react';
import { BooleanInputProps } from './BooleanInput.type';

const DEFAULT_SWITCH_WIDTH = 40;
const DEFAULT_SWITCH_HEIGHT = 22;
const DEFAULT_THUMB_SIZE = 18;
const DEFAULT_SWITCH_PADDING = 2;

export const BooleanInput = forwardRef<HTMLInputElement, BooleanInputProps>(
  (
    {
      variant = 'checkbox',
      switchWidth = DEFAULT_SWITCH_WIDTH,
      switchHeight = DEFAULT_SWITCH_HEIGHT,
      thumbSize = DEFAULT_THUMB_SIZE,
      label,
      checked,
      defaultChecked,
      disabled,
      onChange,
      style,
      ...props
    },
    ref,
  ) => {
    const isSwitch = variant === 'switch';
    const isControlled = typeof checked === 'boolean';
    const [innerChecked, setInnerChecked] = useState(Boolean(defaultChecked));

    useEffect(() => {
      if (isControlled) {
        setInnerChecked(Boolean(checked));
      }
    }, [checked, isControlled]);

    const effectiveChecked = isControlled ? Boolean(checked) : innerChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInnerChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const switchStyle = useMemo(() => {
      const safeWidth = Math.max(thumbSize + DEFAULT_SWITCH_PADDING * 2, switchWidth);
      const safeHeight = Math.max(thumbSize + DEFAULT_SWITCH_PADDING * 2, switchHeight);
      const travelDistance = safeWidth - thumbSize - DEFAULT_SWITCH_PADDING * 2;

      return {
        root: {
          position: 'relative',
          width: safeWidth,
          height: safeHeight,
          borderRadius: safeHeight,
          backgroundColor: effectiveChecked ? '#2e7d32' : '#b0b8c1',
          opacity: disabled ? 0.55 : 1,
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
          ...style,
        } as CSSProperties,
        thumb: {
          position: 'absolute',
          top: DEFAULT_SWITCH_PADDING,
          left: DEFAULT_SWITCH_PADDING,
          width: thumbSize,
          height: thumbSize,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transform: effectiveChecked ? `translateX(${travelDistance}px)` : 'translateX(0)',
          transition: 'transform 0.2s ease',
        } as CSSProperties,
      };
    }, [disabled, effectiveChecked, style, switchHeight, switchWidth, thumbSize]);

    if (!isSwitch) {
      return (
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <input
            ref={ref}
            type='checkbox'
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            style={style}
            {...props}
          />
          {label && <span>{label}</span>}
        </label>
      );
    }

    return (
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span style={switchStyle.root}>
          <input
            ref={ref}
            type='checkbox'
            role='switch'
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            style={{
              position: 'absolute',
              inset: 0,
              margin: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            {...props}
          />
          <span aria-hidden style={switchStyle.thumb} />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  },
);

BooleanInput.displayName = 'BooleanInput';
