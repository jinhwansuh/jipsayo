import { atom } from 'recoil';
import { initialAddress, initialResearch } from '~/utils/house';

export const researchFirstState = atom({
  key: 'researchFirstStateKey',
  default: initialAddress,
});
export const researchSecondState = atom({
  key: 'researchSecondStateKey',
  default: initialResearch,
});

export const researchIndexState = atom({
  key: 'researchIndexStateKey',
  default: {
    first: false,
    second: false,
  },
});
