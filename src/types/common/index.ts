import { HTMLAttributes, ImgHTMLAttributes } from 'react';

export interface DivAttribute<T> extends HTMLAttributes<HTMLDivElement> {
  value?: T;
}

export interface SpanAttribute<T> extends HTMLAttributes<HTMLSpanElement> {
  value?: T;
}

export interface LabelAttribute extends HTMLAttributes<HTMLLabelElement> {}

export interface ImageAttribute extends ImgHTMLAttributes<HTMLImageElement> {}
