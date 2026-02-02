import { TooltipProps } from './Tooltip.type';
import { useRef, useState } from 'react';
import usePortal from '../hooks/usePortal';

/**
 * 범용 Tooltip 컴포넌트
 *
 * @example
 * <Tooltip popover="안녕하세요" direction="top">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export const Tooltip = ({ direction = 'top', popover, children, key, gap = 0, autoFlip = true }: TooltipProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const targetRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);

  const { portal, rootDom } = usePortal({
    content: popover,
    key,
    visible,
    targetRef,
    popoverRef,
    direction,
    gap,
    autoFlip,
  });

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={targetRef}>
      {children}
      {rootDom && visible && portal}
    </span>
  );
};
