import React, { HTMLAttributes, ReactNode } from 'react';
import DownArrowIcon from '../icons/DownArrowIcon';

interface AccordionProps extends HTMLAttributes<HTMLDetailsElement> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Accordion = ({ children, isOpen, setIsOpen, ...restProps }: AccordionProps) => {
  return (
    <details
      data-testid="accordion"
      open={isOpen}
      {...restProps}
      onToggle={(e) => {
        const newState = (e.target as HTMLDetailsElement).open;
        setIsOpen(newState);
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
