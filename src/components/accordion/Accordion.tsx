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

const AccordionSummary: React.FC<SummaryProps> = ({
  icon = <DownArrowIcon />,
  children,
  ...restProps
}: SummaryProps) => {
  return (
    <summary style={{ all: 'unset' }} {...restProps}>
      {icon}
      {children}
    </summary>
  );
};

interface DetailProps extends HTMLAttributes<HTMLDivElement> {}

const AccordionDetail: React.FC<DetailProps> = ({ children, ...restProps }: DetailProps) => {
  return <div {...restProps}>{children}</div>;
};

Accordion.Summary = AccordionSummary;
Accordion.Detail = AccordionDetail;
export default Accordion;
