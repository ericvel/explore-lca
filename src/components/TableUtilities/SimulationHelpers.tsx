export function reduceEmissionNumber(emissionNumber: number) {
  var reducedNumber = emissionNumber * 0.7;
  return roundTo(reducedNumber, 3);
}

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};
