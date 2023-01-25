import { atom } from 'recoil';
import { initialAddress, initialResearch } from '~/utils/house';

export const researchStateAtom = atom({
  key: 'researchStateAtomKey',
  default: { ...initialAddress, ...initialResearch },
});

export const researchIndexStateAtom = atom({
  key: 'researchIndexStateAtomKey',
  default: {
    first: false,
    second: false,
  },
});
