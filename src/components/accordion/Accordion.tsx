import React, { HTMLAttributes, ReactNode, useContext } from 'react';
import Button from '../button/Button';
import AccordionContext from './AccordionContext';
import DownArrowIcon from '../icons/DownArrowIcon';

interface AccordionComposition {
  Summary?: React.FC<SummaryProps>;
  Detail?: React.FC<DetailProps>;
}

interface AccordionProps extends HTMLAttributes<HTMLDetailsElement> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Accordion: React.FC<AccordionProps> & AccordionComposition = ({
  children,
  isOpen,
  setIsOpen,
  ...restProps
}: AccordionProps) => {
  return (
    <details
      open={isOpen}
      {...restProps}
      onToggle={(e) => {
        setIsOpen(e.newState === 'open');
      }}
    >
      {children}
    </details>
  );
};

interface SummaryProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

const AccordionSummary = ({ icon = <DownArrowIcon />, children, ...restProps }: SummaryProps) => {
  return (
    <summary style={{ all: 'unset' }} {...restProps}>
      {icon}
      {children}
    </summary>
  );
};

interface DetailProps extends HTMLAttributes<HTMLDivElement> {}

const AccordionDetail = ({ children, ...restProps }: DetailProps) => {
  return <div {...restProps}>{children}</div>;
};

Accordion.Summary = AccordionSummary;
Accordion.Detail = AccordionDetail;
export default Accordion;
