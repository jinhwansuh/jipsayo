import { atom } from 'recoil';
import { initialAddress, initialResearch } from '~/utils/house';

export const researchState = atom({
  key: 'researchStateKey',
  default: { ...initialAddress, ...initialResearch },
});

export const researchIndexState = atom({
  key: 'researchIndexStateKey',
  default: {
    first: false,
    second: false,
  },
});
