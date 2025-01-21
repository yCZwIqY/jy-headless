import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: React.FC<ButtonProps> = ({ children, ...restProps }) => {
    return <button {...restProps}>{children}</button>;
};

export default Button;
