export function reduceEmissionNumber(
  emissionNumber: number,
  reductionId: number
) {
  var reductionFactor = 0;
  switch (reductionId) {
    case 0:
      reductionFactor = 0.897;
      break;
    case 1:
      reductionFactor = 0.914;
      break;
    case 2:
      reductionFactor = 0.684;
      break;
    case 3:
      reductionFactor = 0.762;
      break;
    case 4:
      reductionFactor = 0.735;
      break;
    default:
      reductionFactor = 0.948
  }

  var reducedNumber = emissionNumber * reductionFactor;
  return roundTo(reducedNumber, 3);
}

export const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

export const calculatePercentageChange = (
  originalValue: number,
  simulatedValue: number
) => {
  const percentageChange =
    ((originalValue - simulatedValue) / originalValue) * 100;
  return parseFloat(percentageChange.toFixed(1)).toLocaleString();
};
