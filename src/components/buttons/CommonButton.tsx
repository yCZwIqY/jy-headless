import {ButtonHTMLAttributes} from "react";
import {BaseProps} from "../types.ts";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {

}

const CommonButton = ({children, additionalClass, className, ...rest}: CommonButtonProps) => {
    return <button {...rest}
                   className={className
                       ? className
                       : `shadow-md py-3 px-5 rounded-md font-bold bg-white hover:bg-gray-100
                          active:bg-gray-200 active:shadow-inner
                          disabled:shadow-none disabled:bg-gray-200 disabled:text-gray-400
                          ${additionalClass}`}>
        {children}
    </button>
}
export default CommonButton;