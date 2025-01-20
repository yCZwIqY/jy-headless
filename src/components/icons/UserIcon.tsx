import {IconProps} from "../types.ts";

const UserIcon = ({color = 'black', size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" width={size ?? width} height={size ?? height} fill={fill || 'none'}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="User / User_02">
                <path id="Vector"
                      d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
                      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
        </g>
    </svg>
}

export default UserIcon