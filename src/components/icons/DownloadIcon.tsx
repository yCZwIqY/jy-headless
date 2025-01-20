import {IconProps} from "../types.ts";

const DownloadIcon = ({color = 'black', size, width, height, fill}: IconProps) => {
    return <svg viewBox="0 0 24 24" fill={fill || 'none'} width={size ?? width} height={size ?? height}
                xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M12 16L12 8" stroke={color} strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
            <path d="M9 13L11.913 15.913V15.913C11.961 15.961 12.039 15.961 12.087 15.913V15.913L15 13" stroke={color}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 15L3 16L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 16L21 15"
                  stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>
}

export default DownloadIcon