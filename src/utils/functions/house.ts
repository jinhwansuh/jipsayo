import { HouseData } from '~/types/house';

interface CalculateEstimateTimeType {
  budget: number;
  saving: number;
  rate: number;
  targetPrice: number;
}

/**
 *
 * @returns [number 개월, number 월] | false 이미 가격보다 많음
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
    if (yearMoney < target) {
      target -= yearMoney;
      nextSaving *= (100 + rate) / 100;
      yearMoney *= nextSaving * 12;
      year += 1;
    } else {
      month = Math.round(target / nextSaving);
      break;
    }
  }

  return [year, month];
};
