import {IconProps} from "../types.ts";

const RefreshIcon = ({color = 'black', size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" fill={fill || 'none'} width={size ?? width} height={size ?? height}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M20.9844 10H17M20.9844 10V6M20.9844 10L17.6569 6.34315C14.5327 3.21895 9.46734 3.21895 6.34315 6.34315C3.21895 9.46734 3.21895 14.5327 6.34315 17.6569C9.46734 20.781 14.5327 20.781 17.6569 17.6569C18.4407 16.873 19.0279 15.9669 19.4184 15"
                stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default RefreshIcon