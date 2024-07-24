export function calculatePercentage(
  maxValue: number,
  currentValue: number
): string {
  if (maxValue === 0) {
    return "0%"; // To handle division by zero
  }
  const percentage = (currentValue / maxValue) * 100;
  return `${percentage.toFixed(2)}%`;
}
