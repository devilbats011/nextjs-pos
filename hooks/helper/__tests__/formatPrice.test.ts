import {formatPrice} from '../helper';

describe('formatPrice', () => {
  it('formats a number with two decimal places', () => {
    const result = formatPrice(10);
    expect(result).toBe('RM 10.00');
  });

  it('formats a string number with two decimal places', () => {
    const result = formatPrice('22.3');
    expect(result).toBe('RM 22.30');
  });

  it('formats a string with an integer value', () => {
    const result = formatPrice('50');
    expect(result).toBe('RM 50.00');
  });

  it('handles large decimal numbers', () => {
    const result = formatPrice(100.999);
    expect(result).toBe('RM 101.00');
  });

  it('handles zero correctly', () => {
    const result = formatPrice(0);
    expect(result).toBe('RM 0.00');
  });
});
