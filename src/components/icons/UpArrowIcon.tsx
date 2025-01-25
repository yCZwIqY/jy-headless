import { IconProps } from './index';
import React from 'react';

const UpArrowIcon = ({
  color = '#000',
  size = '1em',
  bgColor = 'transparent',
  fill = 'none',
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      style={{ backgroundColor: bgColor }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWdth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
      </g>
    </svg>
  );
};
export default UpArrowIcon;
// COLLECTION: Boxicons Filled Icons
// LICENSE: CC Attribution License
// AUTHOR: boxicons
// https://www.svgrepo.com/svg/334957/up-arrow
