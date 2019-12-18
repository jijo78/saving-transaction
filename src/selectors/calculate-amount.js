export const calculateTotalExpenditure = value => {
  if (Array.isArray(value) && !value.some(isNaN)) {
    return value.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
  }
  return value;
};
