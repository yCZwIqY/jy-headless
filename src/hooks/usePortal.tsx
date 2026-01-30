import { Key, ReactNode, RefObject, useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type Position = { top: number; left: number };

export type Direction =
  'top-left'
  | 'top-center'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-center'
  | 'bottom-right';

type UsePortalProps = {
  content: ReactNode;
  key?: Key | null;
  visible?: boolean;
  targetRef?: RefObject<HTMLElement | null>;
  popoverRef?: RefObject<HTMLElement | null>;
  direction?: Direction;
  gap?: number;
  position?: Position;
  autoFlip?: boolean; // 자동 위치 조정 여부
};

const usePortal = ({
                     content,
                     key,
                     visible = true,
                     targetRef,
                     popoverRef,
                     direction = 'top',
                     gap = 0,
                     position: customPosition,
                     autoFlip = true,
                   }: UsePortalProps) => {
  const rootDom = useMemo(() => document.body, []);
  const [position, setPosition] = useState<Position>(customPosition || { top: 0, left: 0 });
  const [finalDirection, setFinalDirection] = useState<Direction>(direction);

  const getOppositeDirection = (dir: Direction): Direction => {
    if (dir.startsWith('top')) return dir.replace('top', 'bottom') as Direction;
    if (dir.startsWith('bottom')) return dir.replace('bottom', 'top') as Direction;
    if (dir === 'left') return 'right';
    if (dir === 'right') return 'left';
    return dir;
  };

  const getPopoverPosition = (
    targetRect: DOMRect,
    popoverRect: DOMRect,
    dir: Direction,
  ): Position => {
    let top =
      (dir.startsWith('top')
        ? targetRect.top - popoverRect.height
        : dir.startsWith('bottom')
          ? targetRect.top + targetRect.height
          : targetRect.top + targetRect.height / 2 - popoverRect.height / 2) - gap;

    let left = dir.endsWith('left')
      ? targetRect.left - popoverRect.width - gap
      : (dir.endsWith('right')
        ? targetRect.left + targetRect.width + gap
        : targetRect.left + targetRect.width / 2 - popoverRect.width / 2);

    return { top, left };
  };

  const isOutOfViewport = (pos: Position, popoverRect: DOMRect): boolean => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      pos.top < 0 || // 상단 밖
      pos.left < 0 || // 좌측 밖
      pos.top + popoverRect.height > viewportHeight + window.scrollY || // 하단 밖
      pos.left + popoverRect.width > viewportWidth + window.scrollX // 우측 밖
    );
  };

  useLayoutEffect(() => {
    if (visible && targetRef?.current && popoverRef?.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      // 원래 방향으로 위치 계산
      let calculatedPosition = getPopoverPosition(targetRect, popoverRect, direction);
      let currentDirection = direction;

      // autoFlip이 활성화되어 있고 화면 밖으로 나가면 반대 방향 시도
      if (autoFlip && isOutOfViewport(calculatedPosition, popoverRect)) {
        const oppositeDir = getOppositeDirection(direction);
        const oppositePosition = getPopoverPosition(targetRect, popoverRect, oppositeDir);

        // 반대 방향이 더 나으면 반대 방향 사용
        if (!isOutOfViewport(oppositePosition, popoverRect)) {
          calculatedPosition = oppositePosition;
          currentDirection = oppositeDir;
        }
      }

      setFinalDirection(currentDirection);
      setPosition({
        top: calculatedPosition.top + window.scrollY,
        left: calculatedPosition.left + window.scrollX,
      });
    } else if (customPosition) {
      setPosition(customPosition);
    }
  }, [visible, direction, gap, customPosition, autoFlip]);

  const wrappedContent = targetRef ? (
    <span
      ref={popoverRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {content}
    </span>
  ) : content;

  const portal = createPortal(wrappedContent, rootDom, key);

  return { portal, rootDom, finalDirection };
};

export default usePortal;