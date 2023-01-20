import { atom, selector } from 'recoil';
import {
  HouseData,
  FetchHouseData,
  FetchFilteredHouseDate,
} from '~/types/house';
import {
  calculateCostToWon,
  calculateEstimateTime,
} from '~/utils/functions/house';
import { initialHouseData } from '~/utils/house';
import { researchStateAtom } from './research';

export const fetchHouseStateAtom = atom<FetchHouseData>({
  key: 'fetchHouseStateAtomKey',
  default: { ...initialHouseData },
});

export const houseStateSelector = selector<HouseData>({
  key: 'houseStateSelectorKey',
  get: ({ get }) => {
    const houseRecoilState = get(fetchHouseStateAtom);
    const researchRecoilState = get(researchStateAtom);
    const { cost } = houseRecoilState;
    const { cash, saving, rate } = researchRecoilState;

    const estimateTime = calculateEstimateTime({
      budget: +cash,
      saving: +saving,
      rate: +rate,
      targetPrice: cost,
    });
    const won = calculateCostToWon(cost);

    return {
      ...houseRecoilState,
      estimateTime,
      won,
    };
  },
});

export const fetchFilteredHouseAtom = atom<FetchFilteredHouseDate[]>({
  key: 'filteredHouseStateKey',
  default: [],
});
