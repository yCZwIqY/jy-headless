import {IconProps} from "../types.ts";

const SearchIcon = ({color, size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 20 20" width={size ?? width} height={size ?? height} xmlns="http://www.w3.org/2000/svg"
                fill={fill || 'none'}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill={color} fillRule="evenodd"
                  d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"></path>
        </g>
    </svg>
}

export default SearchIcon