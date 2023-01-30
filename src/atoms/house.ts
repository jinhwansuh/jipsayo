import { atom, selector } from 'recoil';
import {
  HouseData,
  FetchHouseData,
  FetchFilteredHouseDate,
} from '~/types/house';
import {
  calculateCostToWon,
  calculateEstimateTime,
  calculateEstimateTimeArray,
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
      budget: Number(cash),
      saving: Number(saving),
      rate: Number(rate),
      targetPrice: cost,
    });
    const won = calculateCostToWon(cost);
    const estimateTimeArray = calculateEstimateTimeArray({
      budget: Number(cash),
      saving: Number(saving),
      rate: Number(rate),
      targetPrice: cost,
    });

    return {
      ...houseRecoilState,
      estimateTime,
      won,
      estimateTimeArray,
    };
  },
});

export const fetchFilteredHouseAtom = atom<FetchFilteredHouseDate[]>({
  key: 'fetchFilteredHouseAtomKey',
  default: [],
});

export const filteredHouseSelector = selector<FetchFilteredHouseDate[]>({
  key: 'filteredHouseSelectorKey',
  get: ({ get }) => {
    const filteredHouseRecoilState = get(fetchFilteredHouseAtom);
    const researchRecoilState = get(researchStateAtom);

    return filteredHouseRecoilState.map((houseRecoilState) => {
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
    });
  },
});
