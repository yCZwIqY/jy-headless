import {IconProps} from "../types.ts";

const UnLockIcon = ({color, size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" width={size ?? width} height={size ?? height} fill={fill || 'none'}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M12 14V16M8.11972 5.02477C8.55509 3.28699 10.1272 2 12 2C14.2091 2 16 3.79086 16 6V9M7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9H7C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21Z"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default UnLockIcon