import { Dispatch, RefObject, SetStateAction } from 'react';
import { SearchAddressData, SearchResize } from '~/types/research';
import { initialAddress } from '../house';

interface IFetchDaumPostAPI {
  setAddressState: Dispatch<SetStateAction<typeof initialAddress>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsComplete: Dispatch<SetStateAction<boolean>>;
  searchFrameRef: RefObject<HTMLDivElement>;
}

export const fetchDaumPostAPI = ({
  setAddressState,
  setIsOpen,
  setIsComplete,
  searchFrameRef,
}: IFetchDaumPostAPI) => {
  return new daum.Postcode({
    oncomplete: function (data: SearchAddressData) {
      const {
        userSelectedType,
        roadAddress,
        jibunAddress,
        bname,
        buildingName,
        apartment,
        zonecode,
        autoJibunAddress,
        address,
      } = data;

      let extraAddr = '';

      if (userSelectedType === 'R') {
        if (bname !== '' && /[동|로|가]$/g.test(bname)) {
          extraAddr += bname;
        }
        if (buildingName !== '' && apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + buildingName : buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }

        setAddressState((prev) => ({
          ...prev,
          roadAddress,
          zonecode,
          userSelectedType,
          jibunAddress: autoJibunAddress,
          extraAddr,
          buildingName,
        }));
      } else {
        setAddressState((prev) => ({
          ...prev,
          userSelectedType,
          jibunAddress,
          roadAddress: address,
          zonecode,
          buildingName,
        }));
      }

      setIsOpen(() => false);
      setIsComplete(() => true);
    },

    onresize: function (size: SearchResize) {
      searchFrameRef.current!.style.height = size.height + 'px';
    },
    width: '100%',
    height: '100%',
  }).embed(searchFrameRef.current);
};
