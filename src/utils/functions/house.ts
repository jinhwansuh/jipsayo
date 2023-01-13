import { HouseData } from '~/types/house';

interface CalculateEstimateTimeType {
  budget: number;
  saving: number;
  rate: number;
  targetPrice: number;
}

/**
 *
 * @returns 'OO년 OO개월'(string) | false: 이미 가격보다 많음
 */
export const calculateEstimateTime = ({
  budget,
  saving,
  rate,
  targetPrice,
}: CalculateEstimateTimeType): HouseData['estimateTime'] => {
  if (budget >= targetPrice) {
    return false;
  }

  let target = targetPrice - budget;
  let nextSaving = saving;
  let yearMoney = saving * 12;
  let month = 0;
  let year = 0;

  while (target > 0) {
    if (yearMoney <= target) {
      target -= yearMoney;
      nextSaving *= (100 + rate) / 100;
      yearMoney = nextSaving * 12;
      year++;
    } else {
      month = Math.ceil(target / nextSaving);
      if (month >= 12) {
        year++;
        month -= 12;
      }
      break;
    }
  }

  if (year > 0 && month > 0) return `${year}년 ${month}개월`;
  if (month === 0) return `${year}년`;
  return `${month}개월`;
};

/**
 *
 * @param cost number
 * @returns OO억 OO만원
 */
export const calculateCostToWon = (cost: number): string => {
  const stringCost = cost.toString();
  let prev = '';
  let index = 1;
  const array = [];

  for (let i = stringCost.length - 1; i >= 0; i--) {
    if (index > 4) {
      array.push(prev);
      index = 1;
      prev = '';
    }
    prev = stringCost[i] + prev;
    index++;
  }
  array.push(prev);

  const UNIT = ['만원', '억', '조'];

  return array.reduce((acc, curr, index) => curr + UNIT[index] + ' ' + acc, '');
};
