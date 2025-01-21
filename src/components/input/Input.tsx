import React, {CSSProperties, InputHTMLAttributes, ReactNode} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    clearable?: boolean;
    containerStyle?: CSSProperties;
    containerClassName?: string;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
}

const Input: React.FC<InputProps> = ({
                                         prefixElement,
                                         suffixElement,
                                         className,
                                         style,
                                         containerStyle,
                                         containerClassName,
                                         ...restProps
                                     }) => {

    return (
        <span
            className={containerClassName}
            style={{
                display: "inline-flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "4px",
                paddingLeft: "4px",
                ...containerStyle,
            }}
        >
            {prefixElement}
            <input
                {...restProps}
                className={className}
                style={{
                    outline: "none",
                    border: "none",
                    flex: 1,
                    ...style,
                }}
            />
            {suffixElement}
    </span>
    );
};

export default Input;
