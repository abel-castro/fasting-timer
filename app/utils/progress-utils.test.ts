import { calculatePercentage } from "./progress-utils";

describe('calculatePercentage', () => {
  it('should return "0%" when maxValue is 0', () => {
    const result = calculatePercentage(0, 10);
    expect(result).toBe('0%');
  });

  it('should return the correct percentage when maxValue is not 0', () => {
    const result = calculatePercentage(100, 50);
    expect(result).toBe('50.00%');
  });

  it('should handle decimal values correctly', () => {
    const result = calculatePercentage(3, 1);
    expect(result).toBe('33.33%');
  });

  it('should handle negative values as positive', () => {
    const result = calculatePercentage(-10, -5);
    expect(result).toBe('50.00%');
  });
});
