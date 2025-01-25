import { createContext } from 'react';

interface ModalContextType {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType>({
  isShow: false,
  setIsShow: (value) => {},
});

export default ModalContext;
