import { Key, ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

type UsePortalProps = {
  content: ReactNode;
  key?: Key | null;
};

const usePortal = ({ content, key }: UsePortalProps) => {
  const rootDom = useMemo(() => document.body, [document]);
  return createPortal(content, rootDom, key);
};

export default usePortal;
