import { PopoverProps } from './Popover.type';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';

export const Popover = ({ direction = 'top', popover, children, key, gap = 0 }: PopoverProps) => {
  const rootDom = useMemo(() => document.body, [document]);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const portal = usePortal({
    content: (
      <span
        ref={popoverRef}
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {popover}
      </span>
    ),
    key,
  });

  const getPopoverPosition = useCallback(
    (targetRect: DOMRect, popoverRect: DOMRect) => {
      let top =
        (direction.startsWith('top')
          ? targetRect.top - popoverRect.height
          : direction.startsWith('bottom')
            ? targetRect.top + targetRect.height
            : targetRect.top + targetRect.height / 2 - popoverRect.height / 2) + gap;
      let left = direction.endsWith('left')
        ? targetRect.left - popoverRect.width
        : (direction.endsWith('right')
            ? targetRect.left + targetRect.width
            : targetRect.left + targetRect.width / 2 - popoverRect.width / 2) + gap;

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
      {rootDom && visible && portal}
    </span>
  );
};
