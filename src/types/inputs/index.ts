import { ChangeEvent, CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { DivAttribute } from '../common';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffixElement?: ReactElement | ReactNode;
  prefixElement?: ReactElement | ReactNode;
  wrapperStyle?: CSSProperties;
  wrapperClass?: string[];
  timeout?: number;
  showLimit?: boolean;
  maxLength?: number;
  onThrottledChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ImageInputContextData {
  id?: string;
  previewUrl?: string;
  dragOver?: boolean;
}

export type ImageType =
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'svg'
  | 'bmp'
  | 'webp'
  | 'heic'
  | 'heif'
  | 'tiff'
  | 'x-icon'
  | 'vn';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  accepts?: ImageType[];
  draggable?: boolean;
  onChange?: (file: File) => void;
  value?: File;
}

export interface CheckboxProps<T> extends Omit<DivAttribute<T>, 'onChange'> {
  values: T[];
  onChange: (newValue: T[]) => void;
  max?: number;
}

export interface CheckboxItemProps<T> extends DivAttribute<T> {
  value: T;
}

export interface CheckboxContextData<T> {
  onToggle: (newValue: T, isCheck: boolean) => void;
  values: T[];
}
