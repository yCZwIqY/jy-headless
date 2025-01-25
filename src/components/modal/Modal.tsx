import React, {
  CSSProperties,
  DetailedReactHTMLElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Button, { ButtonProps } from '../button/Button';
import ModalContext from './ModalContext';

interface ModalProps {
  opener: ReactNode;
  children: ReactNode;
  targetSelector?: string;
}

interface ModalComposition {
  Overlay?: React.FC<ModalOverlayProps>;
  Closer?: React.FC<ButtonProps>;
}

const Modal: React.FC<ModalProps> & ModalComposition = ({
  opener,
  children,
  targetSelector = '#root',
}: ModalProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onHandleShow = () => {
    setIsShow(true);
  };
  return (
    <ModalContext.Provider value={{ isShow, setIsShow }}>
      {React.isValidElement(opener) &&
        React.cloneElement(opener as DetailedReactHTMLElement<ButtonProps, HTMLElement>, {
          onClick: onHandleShow,
        })}
      {isShow &&
        document.querySelector(targetSelector) &&
        createPortal(children, document.querySelector(targetSelector) as HTMLElement)}
    </ModalContext.Provider>
  );
};

interface ModalOverlayProps {
  backgroundColor?: string;
  zIndex?: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const ModalOverlay = ({
  backgroundColor = 'rgba(0,0,0,0.5)',
  children,
  style,
  className,
  zIndex = 999,
}: ModalOverlayProps) => {
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex,
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ModalCloseButton = ({ ...props }: ButtonProps) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalCloseButton must be used within a ModalContext.Provider');
  }
  const { setIsShow } = context;

  return <Button {...props} onClick={() => setIsShow(false)} />;
};

Modal.Overlay = ModalOverlay;
Modal.Closer = ModalCloseButton;
export default Modal;
