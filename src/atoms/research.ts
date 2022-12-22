import { atom } from 'recoil';
import { initialAddress, initialResearch } from '~/utils/house';

export const researchFirstState = atom({
  key: 'researchFirstStateKey',
  default: initialResearch,
});
export const researchSecondState = atom({
  key: 'researchSecondStateKey',
  default: initialAddress,
});

export const researchIndexState = atom({
  key: 'researchIndexStateKey',
  default: {
    first: false,
    second: false,
  },
});
