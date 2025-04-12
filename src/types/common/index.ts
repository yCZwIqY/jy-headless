import { HTMLAttributes } from 'react';

export interface DivAttribute<T> extends HTMLAttributes<HTMLDivElement> {
  value?: T;
}

export interface SpanAttribute<T> extends HTMLAttributes<HTMLSpanElement> {
  value?: T;
}
