import { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffixElement?: ReactElement | ReactNode;
  prefixElement?: ReactElement | ReactNode;
  wrapperStyle?: CSSProperties;
  wrapperClass?: string[];
  useThrottle?: boolean;
  timeout?: number;
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
