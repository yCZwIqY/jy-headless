import {ButtonHTMLAttributes} from "react";
import {BaseProps} from "../types.ts";

export interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {}

const CommonButton = ({
                          children,
                          additionalClass,
                          className,
                          size = 'md',
                          ...rest
                      }: CommonButtonProps) => {

    const sizeClass = () => {
      switch (size) {
          case 'sm':
              return 'text-sm py-2 px-3 shadow-md'
          case 'md':
              return 'text-md py-3 px-7 shadow-md'
          case 'lg':
              return 'text-lg py-3 px-10 shadow-lg'
      }
    }

    return <button {...rest}
                   className={className
                       ? className
                       : `${sizeClass()} rounded-md font-bold bg-white hover:bg-gray-100 active:gray-200
                          active:shadow-inner disabled:shadow-none disabled:bg-gray-200 disabled:text-gray-400
                          ${additionalClass}`}>
        {children}
    </button>
}
export default CommonButton;