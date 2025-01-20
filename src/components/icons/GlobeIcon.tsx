import {IconProps} from "../types.ts";

const GlobeIcon = ({color = 'black', size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" fill={fill || 'none'} width={size ?? width} height={size ?? height}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke={color} strokeWidth="2"></path>
            <path
                d="M3.5 11H6C7.10457 11 8 11.8954 8 13V13C8 14.1046 8.89543 15 10 15V15C11.1046 15 12 15.8954 12 17V20.5"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path
                d="M8 4V5C8 6.10457 8.89543 7 10 7H10.1459C11.1699 7 12 7.83011 12 8.8541V8.8541C12 9.55638 12.3968 10.1984 13.0249 10.5125L13.1056 10.5528C13.6686 10.8343 14.3314 10.8343 14.8944 10.5528L14.9751 10.5125C15.6032 10.1984 16 9.55638 16 8.8541V8.8541C16 7.83011 16.8301 7 17.8541 7H19.5"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M16 19.5V17C16 15.8954 16.8954 15 18 15H20" stroke={color} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default GlobeIcon