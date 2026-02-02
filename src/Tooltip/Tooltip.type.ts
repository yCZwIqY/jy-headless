import { ReactNode } from 'react';
import { Direction } from '../hooks';

export interface TooltipProps {
  /** 툴팁을 띄울 대상 요소 */
  children: ReactNode;

  /** 툴팁에 표시될 내용 */
  popover: ReactNode;

  /** 툴팁이 나타날 방향 */
  direction: Direction;

  /** 특정 DOM 타겟 ID (선택) */
  targetId?: string;

  /** 포털로 렌더링할 DOM 노드 */
  domNode?: Element;

  /** React key 값 */
  key?: string;

  /** 타겟과 툴팁 사이 간격(px) */
  gap?: number;

  /** 화면 밖으로 나가면 자동 반전 여부 */
  autoFlip?: boolean;
}
