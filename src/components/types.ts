export type Size = 'sm' | 'md' | 'lg'
export interface BaseProps {
    additionalClass?: string;
    size?: Size;
}

export interface IconProps {
    color?: string;
    size?: string;
    width?: string;
    height?: string;
    fill?: string;
}