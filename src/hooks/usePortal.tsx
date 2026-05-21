import {
  Key,
  ReactNode,
  ReactPortal,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type Position = { top: number; left: number };

export type Direction =
  | 'top-left'
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
  rootId?: string;
  fallbackToBody?: boolean;
};

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
  gap: number,
): Position => {
  const top =
    (dir.startsWith('top')
      ? targetRect.top - popoverRect.height
      : dir.startsWith('bottom')
        ? targetRect.top + targetRect.height
        : targetRect.top + targetRect.height / 2 - popoverRect.height / 2) - gap;

  const left = dir.endsWith('left')
    ? targetRect.left - popoverRect.width - gap
    : dir.endsWith('right')
      ? targetRect.left + targetRect.width + gap
      : targetRect.left + targetRect.width / 2 - popoverRect.width / 2;

  return { top, left };
};

const isOutOfViewport = (pos: Position, popoverRect: DOMRect): boolean => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return (
    pos.top < 0 ||
    pos.left < 0 ||
    pos.top + popoverRect.height > viewportHeight + window.scrollY ||
    pos.left + popoverRect.width > viewportWidth + window.scrollX
  );
};

const resolvePortalRoot = (rootId?: string, fallbackToBody = true): HTMLElement | null => {
  if (typeof document === 'undefined') return null;

  if (rootId) {
    const root = document.getElementById(rootId);
    if (root instanceof HTMLElement) return root;
  }

  return fallbackToBody ? document.body : null;
};

const usePortalRoot = (rootId?: string, fallbackToBody = true) => {
  const [rootDom, setRootDom] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootDom(resolvePortalRoot(rootId, fallbackToBody));
  }, [rootId, fallbackToBody]);

  return rootDom;
};

const usePopoverPosition = ({
  visible,
  targetRef,
  popoverRef,
  direction,
  gap,
  customPosition,
  autoFlip,
}: {
  visible: boolean;
  targetRef?: RefObject<HTMLElement | null>;
  popoverRef?: RefObject<HTMLElement | null>;
  direction: Direction;
  gap: number;
  customPosition?: Position;
  autoFlip: boolean;
}) => {
  const [position, setPosition] = useState<Position>(customPosition || { top: 0, left: 0 });
  const [finalDirection, setFinalDirection] = useState<Direction>(direction);

  useLayoutEffect(() => {
    if (!visible) {
      setFinalDirection(direction);
      return;
    }

    if (!targetRef?.current || !popoverRef?.current) {
      setFinalDirection(direction);

      if (customPosition) {
        setPosition(customPosition);
      }
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let calculatedPosition = getPopoverPosition(targetRect, popoverRect, direction, gap);
    let currentDirection = direction;

    if (autoFlip && isOutOfViewport(calculatedPosition, popoverRect)) {
      const oppositeDir = getOppositeDirection(direction);
      const oppositePosition = getPopoverPosition(targetRect, popoverRect, oppositeDir, gap);

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
  }, [visible, targetRef, popoverRef, direction, gap, customPosition, autoFlip]);

  return { position, finalDirection };
};

const getWrappedPortalContent = ({
  content,
  targetRef,
  popoverRef,
  position,
}: {
  content: ReactNode;
  targetRef?: RefObject<HTMLElement | null>;
  popoverRef: RefObject<HTMLElement | null>;
  position: Position;
}) => {
  if (!targetRef) {
    return content;
  }

  return (
    <span
      ref={popoverRef as RefObject<HTMLSpanElement | null>}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {content}
    </span>
  );
};

export const usePortal = ({
  content,
  key,
  visible = true,
  targetRef,
  popoverRef,
  direction = 'top',
  gap = 0,
  position: customPosition,
  autoFlip = true,
  rootId,
  fallbackToBody = true,
}: UsePortalProps) => {
  const internalPopoverRef = useRef<HTMLElement | null>(null);
  const resolvedPopoverRef = popoverRef ?? internalPopoverRef;
  const rootDom = usePortalRoot(rootId, fallbackToBody);
  const { position, finalDirection } = usePopoverPosition({
    visible,
    targetRef,
    popoverRef: resolvedPopoverRef,
    direction,
    gap,
    customPosition,
    autoFlip,
  });

  const wrappedContent = getWrappedPortalContent({
    content,
    targetRef,
    popoverRef: resolvedPopoverRef,
    position,
  });

  const portal: ReactPortal | null = visible && rootDom ? createPortal(wrappedContent, rootDom, key) : null;

  return { portal, rootDom, finalDirection };
};
