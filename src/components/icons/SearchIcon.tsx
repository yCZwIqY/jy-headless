import {IconProps} from "./index";
import React from "react";

const SearchIcon: React.FC<IconProps> = ({
                                             color = "#000",
                                             size = '20px',
                                             bgColor = 'transparent',
                                             fill = 'none'
                                         }: IconProps) => {
    return <svg viewBox="0 0 24 24" width={size} height={size} fill={fill}
                style={{backgroundColor: bgColor}} xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="Interface / Search_Magnifying_Glass">
                <path id="Vector"
                      d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
        </g>
    </svg>
}
export default SearchIcon
// COLLECTION: Xnix Circular Interface Icons
// LICENSE: CC Attribution License
// AUTHOR: Ankush Syal
// https://www.svgrepo.com/svg/520583/call