import { atom } from 'recoil';
import { HouseData } from '~/types/house';
import { initialHouseData } from '~/utils/house';

export const houseState = atom<HouseData>({
  key: 'houseStateKey',
  default: { ...initialHouseData },
});
