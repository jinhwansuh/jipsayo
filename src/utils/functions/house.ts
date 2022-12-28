import { HouseData } from '~/types/house';

interface CalculateEstimateTimeType {
  budget: number;
  saving: number;
  rate: number;
  targetPrice: number;
}

export const calculateEstimateTime = ({
  budget,
  saving,
  rate,
  targetPrice,
}: CalculateEstimateTimeType): HouseData['estimateTime'] => {
  if (budget >= targetPrice) {
    return false;
  }

  let target = targetPrice;
  let yearMoney = saving * 12;
  let months = 0;

  while (target >= 0) {
    if (yearMoney > target) {
      target -= yearMoney;
      yearMoney = yearMoney * ((100 + rate) / 100);
    } else {
      months += Math.round(target / yearMoney);
      target = 0;
    }
  }

  const year = Math.floor(months / 12);
  const month = months % 12;

  return [year, month];
};
