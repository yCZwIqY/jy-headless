import {IconProps} from "../types.ts";

const HomeIcon = ({color, size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" width={size ?? width} height={size ?? height} fill={fill || 'none'}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M19 9L19 17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21L14 21L10 21L9 21C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17L5 9"
                stroke={color} strokeWidth="2" strokeLinejoin="round"></path>
            <path d="M3 11L7.5 7L10.6713 4.18109C11.429 3.50752 12.571 3.50752 13.3287 4.18109L16.5 7L21 11"
                  stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M10 21V17C10 15.8954 10.8954 15 12 15V15C13.1046 15 14 15.8954 14 17V21" stroke={color}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default HomeIcon