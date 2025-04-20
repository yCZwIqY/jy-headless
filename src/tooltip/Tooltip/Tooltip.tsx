import { CSSProperties, useContext, useEffect, useState } from 'react';
import { TooltipContext, TooltipProps } from '../../types/tooltip';

const TooltipRoot = ({ children, style, position = 'top', space = 8, ...props }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<CSSProperties>({});

  useEffect(() => {
    if (!showTooltip) return;

    const positionStyles: CSSProperties = {
      zIndex: 1000,
    };

    switch (position) {
      case 'top':
        positionStyles.bottom = `calc(100% + ${space}px)`;
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        positionStyles.top = `calc(100% + ${space}px)`;
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'left':
        positionStyles.right = `calc(100% + ${space}px)`;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
      case 'right':
        positionStyles.left = `calc(100% + ${space}px)`;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
      default:
        break;
    }

    setTooltipPosition(positionStyles);
  }, [showTooltip, position]);

  const onMouseOver = () => setShowTooltip(true);
  const onMouseLeave = () => setShowTooltip(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block', // 자식 크기에 영향 안 받도록
        ...style,
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <TooltipContext.Provider value={{ show: showTooltip, tooltipPosition }}>
        {children}
      </TooltipContext.Provider>
    </div>
  );
};
const TooltipLabel = ({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip.* 컴포넌트는 Tooltip 내에서만 사용해야 합니다.');
  }

  const { show, tooltipPosition } = context;

  const labelStyle: CSSProperties = {
    position: 'absolute',
    visibility: show ? 'visible' : 'hidden',
    ...tooltipPosition,
    ...style,
  };

  return (
    <div style={labelStyle} {...props}>
      {children}
    </div>
  );
};

const Tooltip = Object.assign(TooltipRoot, {
  Label: TooltipLabel,
});

export default Tooltip;
