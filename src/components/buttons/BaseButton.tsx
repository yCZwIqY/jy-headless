import {ButtonProps} from "../types.ts";
import SpinnerIcon from "../icons/SpinnerIcon.tsx";

const BaseButton = ({
                        size,
                        variant,
                        children,
                        loading,
                        disabled,
                        className,
                        spinColor,
                        isCircular,
                        ...rest
                    }: ButtonProps) => {
    const sizeClass = () => {
        switch (size) {
            case 'sm':
                return `${isCircular ? 'w-16 h-16' : 'w-24 h-9'} text-sm py-2 px-4`;
            case 'md':
                return `${isCircular ? 'w-20 h-20' : 'w-36 h-12'} text-md py-3 px-7`;
            case 'lg':
                return `${isCircular ? 'w-28 h-28' : 'w-44 h-16'} text-lg py-4 px-10`;
            default:
                return `${isCircular ? 'w-20 h-20' : 'w-36 h-12'} text-md py-3 px-7`;
        }
    };

    const variantClass = () => {
        switch (variant) {
            case "primary":
                return 'text-primary-text bg-primary-base disabled:bg-primary-subdued hover:bg-primary-subdued active:bg-primary-highlight';
            case "secondary":
                return 'text-secondary-text bg-secondary-base disabled:bg-secondary-subdued hover:bg-secondary-subdued active:bg-secondary-highlight';
            case "tertiary":
                return 'text-tertiary-text bg-tertiary-base disabled:bg-tertiary-subdued hover:bg-tertiary-subdued active:bg-tertiary-highlight';
        }
    }

    return <button
        {...rest}
        disabled={loading || disabled}
        className={className
            ? className
            : `flex justify-center items-center ${isCircular ? 'rounded-full': 'rounded-md'} font-semibold ${variantClass()} ${sizeClass()} 
                   ${disabled ? 'cursor-not-allowed grayscale-[60%]' : loading ? 'cursor-wait' : 'cursor-pointer'}
                   `}>
        {loading ? (
            <SpinnerIcon size={'100%'} className={'animate-spin'} color={spinColor ?? 'white'}/>
        ) : (
            children
        )}
    </button>
}

export default BaseButton;