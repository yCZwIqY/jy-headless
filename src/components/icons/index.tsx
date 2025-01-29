import CloseIcon from './CloseIcon';
import CallIcon from './CallIcon';
import HomeIcon from './HomeIcon';
import SearchIcon from './SearchIcon';
import DownArrowIcon from './DownArrowIcon';
import UpArrowIcon from './UpArrowIcon';
import { CSSProperties } from 'react';
import ImageIcon from './ImageIcon';
import ImagePlusIcon from './ImagePlusIcon';
export {
  CloseIcon,
  CallIcon,
  HomeIcon,
  SearchIcon,
  DownArrowIcon,
  UpArrowIcon,
  ImageIcon,
  ImagePlusIcon,
};

export interface IconProps {
  color?: string;
  size?: string;
  fill?: string;
  bgColor?: string;
  style?: CSSProperties;
}
