import { createContext } from 'react';

interface AccordionContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AccordionContext = createContext<AccordionContextType>({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

export default AccordionContext;
