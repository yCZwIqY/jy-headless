import {IconProps} from "../types.ts";

const SaveIcon = ({color = 'black', size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" width={size ?? width} height={size ?? height} fill={fill || 'none'}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M8 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H9M8 20V14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14V20M8 20H16M16 20H18C19.1046 20 20 19.1046 20 18V8.82843C20 8.29799 19.7893 7.78929 19.4142 7.41421L16.5858 4.58579C16.2107 4.21071 15.702 4 15.1716 4H15M15 4V7C15 7.55228 14.5523 8 14 8H10C9.44772 8 9 7.55228 9 7V4M15 4H9"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default SaveIcon