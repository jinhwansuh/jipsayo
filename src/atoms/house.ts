import { atom, selector } from 'recoil';
import { HouseData, FetchHouseData } from '~/types/house';
import {
  calculateCostToWon,
  calculateEstimateTime,
} from '~/utils/functions/house';
import { initialHouseData } from '~/utils/house';
import { researchState } from './research';

export const fetchHouseState = atom<FetchHouseData>({
  key: 'fetchHouseStateKey',
  default: { ...initialHouseData },
});

export const houseState = selector<HouseData>({
  key: 'houseStateKey',
  get: ({ get }) => {
    const houseRecoilState = get(fetchHouseState);
    const researchRecoilState = get(researchState);
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

export const filteredHouseState = atom<HouseData[]>({
  key: 'filteredHouseStateKey',
  default: [],
});
