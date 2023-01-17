import { RefObject, useCallback, useEffect, useState } from 'react';
import { fetchDaumPostAPI } from '~/utils/functions/research';
import { initialAddress } from '~/utils/house';

interface Props {
  searchFrameRef: RefObject<HTMLDivElement>;
}

const useDaumPost = ({ searchFrameRef }: Props) => {
  const [addressState, setAddressState] =
    useState<typeof initialAddress>(initialAddress);
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    const searchFrame = searchFrameRef.current;
  }, []);

  const frameOpenClick = useCallback(() => {
    setAddressState(initialAddress);
    setIsComplete(false);
    setIsNoData(false);
    fetchDaumPostAPI({
      setAddressState,
      setIsOpen,
      setIsComplete,
      searchFrameRef,
    });
    setIsOpen(true);
  }, []);

  const frameCloseClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    frameOpenClick,
    isOpen,
    addressState,
    isComplete,
    frameCloseClick,
    isNoData,
  };
};

export default useDaumPost;
