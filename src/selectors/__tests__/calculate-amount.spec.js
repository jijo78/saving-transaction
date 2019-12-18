import { calculateTotalExpenditure } from '../calculate-amount';

describe('cleanCommaString', () => {
  it('should return param untouched when not an array, or array does not contain numbers', () => {
    expect(calculateTotalExpenditure('')).toEqual('');
    expect(calculateTotalExpenditure(['q', 'b', 'c'])).toEqual(['q', 'b', 'c']);
    expect(calculateTotalExpenditure([1, 2, 3, 'v'])).toEqual([1, 2, 3, 'v']);

    expect(calculateTotalExpenditure('123456, 1235467')).toEqual('123456, 1235467');
    expect(calculateTotalExpenditure({ val: '123546, 23634, 226277' })).toEqual({
      val: '123546, 23634, 226277'
    });
  });

  it('should return one value with if param is array of numbers, same if array ', () => {
    expect(calculateTotalExpenditure([1, 2, 3, 4])).toEqual('10.00');
  });
});
