import {IconProps} from "../types.ts";

const PlusIcon = ({color, size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 20 20" fill={fill || 'none'} width={size ?? width} height={size ?? height}
                xmlns="http://www.w3.org/2000/svg" stroke={color} strokeWidth="0.5">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill={color} fillRule="evenodd"
                  d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"></path>
        </g>
    </svg>
}

export default PlusIcon