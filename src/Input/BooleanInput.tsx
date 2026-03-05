import { CSSProperties, ChangeEvent, forwardRef, useEffect, useMemo, useState } from 'react';
import { BooleanInputProps } from './BooleanInput.type';

const DEFAULT_SWITCH_WIDTH = 40;
const DEFAULT_SWITCH_HEIGHT = 22;
const DEFAULT_THUMB_SIZE = 18;
const DEFAULT_SWITCH_PADDING = 2;
const DEFAULT_SWITCH_ACTIVE_COLOR = '#5f5f5f';
const DEFAULT_SWITCH_INACTIVE_COLOR = '#c3c3c3';
const DEFAULT_SWITCH_THUMB_COLOR = '#ffffff';

const HIDDEN_INPUT_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  margin: 0,
  opacity: 0,
  width: '100%',
  height: '100%',
};

export const BooleanInput = forwardRef<HTMLInputElement, BooleanInputProps>(
  (
    {
      variant = 'checkbox',
      switchWidth = DEFAULT_SWITCH_WIDTH,
      switchHeight = DEFAULT_SWITCH_HEIGHT,
      thumbSize = DEFAULT_THUMB_SIZE,
      switchActiveColor = DEFAULT_SWITCH_ACTIVE_COLOR,
      switchInactiveColor = DEFAULT_SWITCH_INACTIVE_COLOR,
      switchThumbColor = DEFAULT_SWITCH_THUMB_COLOR,
      switchThumb,
      label,
      checkboxInput,
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

    const customCheckboxNode = useMemo(() => {
      if (typeof checkboxInput === 'function') {
        return checkboxInput({
          checked: effectiveChecked,
          disabled: Boolean(disabled),
        });
      }
      return checkboxInput;
    }, [checkboxInput, disabled, effectiveChecked]);

    const customSwitchThumbNode = useMemo(() => {
      if (typeof switchThumb === 'function') {
        return switchThumb({
          checked: effectiveChecked,
          disabled: Boolean(disabled),
        });
      }
      return switchThumb;
    }, [disabled, effectiveChecked, switchThumb]);

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
          backgroundColor: effectiveChecked ? switchActiveColor : switchInactiveColor,
          opacity: disabled ? 0.55 : 1,
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
          ...style,
        } as CSSProperties,
        thumb: {
          position: 'absolute',
          top: DEFAULT_SWITCH_PADDING,
          left: DEFAULT_SWITCH_PADDING,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: thumbSize,
          height: thumbSize,
          transform: effectiveChecked ? `translateX(${travelDistance}px)` : 'translateX(0)',
          transition: 'transform 0.2s ease',
        } as CSSProperties,
        defaultThumbInner: {
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: switchThumbColor,
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        } as CSSProperties,
      };
    }, [
      disabled,
      effectiveChecked,
      style,
      switchActiveColor,
      switchHeight,
      switchInactiveColor,
      switchThumbColor,
      switchWidth,
      thumbSize,
    ]);

    if (!isSwitch) {
      if (customCheckboxNode) {
        return (
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <input
                ref={ref}
                type='checkbox'
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={handleChange}
                style={HIDDEN_INPUT_STYLE}
                {...props}
              />
              <span aria-hidden>{customCheckboxNode}</span>
            </span>
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
              ...HIDDEN_INPUT_STYLE,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            {...props}
          />
          <span aria-hidden style={switchStyle.thumb}>
            {customSwitchThumbNode ? (
              <span
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  height: '100%',
                }}
              >
                {customSwitchThumbNode}
              </span>
            ) : (
              <span style={switchStyle.defaultThumbInner} />
            )}
          </span>
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  },
);

BooleanInput.displayName = 'BooleanInput';
