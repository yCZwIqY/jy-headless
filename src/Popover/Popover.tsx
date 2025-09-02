import { HoverProps } from './Popover.type';
import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export const Popover = ({ children, direction, popover, domNode, rootId, key }: HoverProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const rootDom = domNode ?? document.getElementById(rootId ?? 'root');
  const targetRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);

  const getPopoverPosition = useCallback(
    (targetRect: DOMRect, popoverRect: DOMRect) => {
      let top = 0;
      let left = 0;

      switch (direction) {
        case 'top-left':
          top = targetRect.top - popoverRect.height;
          left = targetRect.left;
          break;
        case 'top-center':
        case 'top':
          top = targetRect.top - popoverRect.height;
          left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
          break;
        case 'top-right':
          top = targetRect.top - popoverRect.height;
          left = targetRect.right - popoverRect.width;
          break;
        case 'left':
          top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
          left = targetRect.left - popoverRect.width;
          break;
        case 'right':
          top = targetRect.top + (targetRect.height - popoverRect.height) / 2;
          left = targetRect.right;
          break;
        case 'bottom-left':
          top = targetRect.bottom;
          left = targetRect.left;
          break;
        case 'bottom-center':
        case 'bottom':
          top = targetRect.bottom;
          left = targetRect.left + (targetRect.width - popoverRect.width) / 2;
          break;
        case 'bottom-right':
          top = targetRect.bottom;
          left = targetRect.right - popoverRect.width;
          break;
        default:
          break;
      }

      return { top, left };
    },
    [direction],
  );

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  useLayoutEffect(() => {
    if (visible && targetRef.current && popoverRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const { top, left } = getPopoverPosition(targetRect, popoverRect);
      setPosition({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [visible, popover, getPopoverPosition]);

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={targetRef}>
      {children}
      {rootDom &&
        visible &&
        createPortal(
          <span
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {popover}
          </span>,
          rootDom,
          key,
        )}
    </span>
  );
};
