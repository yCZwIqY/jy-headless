import { HTMLProps, ReactNode } from 'react';

export type SelectSingleValue = string | number;

export interface SelectProps {
  value: string[];
  onChange: (v: string[]) => void;
  multiple?: boolean;
  children: ReactNode;
}

export interface SelectOptionsProps extends HTMLProps<HTMLDivElement> {
}

export interface SelectOptionProps extends HTMLProps<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

export interface SelectTriggerProps extends HTMLProps<HTMLDivElement> {
}