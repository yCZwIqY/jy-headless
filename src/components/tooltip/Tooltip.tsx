import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  tooltip: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ tooltip, children, position = 'top', style, ...restProps }) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [tooltipRef.current, tooltipVisible]);

  const onMouseOver = () => {
    setTooltipVisible(true);
  };

  const onMouseLeave = () => {
    setTooltipVisible(false);
  };

  const tooltipContainerStyle = {
    position: 'absolute',
    top: position === 'top' ? `-${tooltipHeight}px` : position === 'bottom' ? '100%' : '50%',
    left: position === 'left' ? `-${tooltipWidth}px` : position === 'right' ? '100%' : '50%',
    transform:
      position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 999,
    width: 'fit-content',
    height: 'fit-content',
  };

  return (
    <span onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} style={{ position: 'relative' }}>
      <span {...restProps}>{children}</span>
      {tooltipVisible && (
        <span ref={tooltipRef} style={tooltipContainerStyle}>
          {tooltip}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
