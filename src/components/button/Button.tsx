import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import Spinner from "../spinner/Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    spinner?: ReactNode;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           prefixElement,
                                           suffixElement,
                                           children,
                                           loading = false,
                                           spinner = <Spinner color={'black'} size={'9px'}/>,
                                           style,
                                           ...restProps
                                       }) => {
    return <button {...restProps} style={{
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "4px",
        paddingLeft: "4px",
        ...style,
    }}>
        {prefixElement}
        {loading ? spinner : children}
        {suffixElement}
    </button>;
};

export default Button;
