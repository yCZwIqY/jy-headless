import React, {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FC<InputProps> = ({className, ...restProps}) => {
    return <div className={className}>
        <input {...restProps}/>
    </div>
}

export default Input;