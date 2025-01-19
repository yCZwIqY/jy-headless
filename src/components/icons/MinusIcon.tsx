import {IconProps} from "../types.ts";

const MinusIcon = ({color, size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill={fill || 'none'} width={size ?? width}
                height={size ?? height} stroke="#000000" strokeWidth="0.5">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill="#000000" fill-rule="evenodd" d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z"></path>
        </g>
    </svg>
}

export default MinusIcon