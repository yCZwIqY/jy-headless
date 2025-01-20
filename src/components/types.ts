import {ButtonHTMLAttributes} from "react";

export type Size = 'sm' | 'md' | 'lg'
export type Variants = 'primary' | 'secondary' | 'tertiary'
export interface BaseProps {
    size?: Size;
    variant: Variants;
    loading?: boolean;
    spinColor?: string;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
    isCircular?: boolean
}
export interface IconProps {
    color?: string;
    size?: string;
    width?: string;
    height?: string;
    fill?: string;
    className?: string;
}