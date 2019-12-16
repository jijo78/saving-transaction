export const calculateTotalExpenditure = array => {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
};
