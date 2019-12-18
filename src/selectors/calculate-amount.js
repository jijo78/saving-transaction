export const calculateTotalExpenditure = value => {
  // check if the is an array of integers, the some method checks if array values are numbers
  if (Array.isArray(value) && !value.some(isNaN)) {
    return value.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
  }
  return value;
};
