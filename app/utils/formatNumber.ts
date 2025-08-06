export function formatNumberShort(value: number): string {
  if (value >= 1_000_000_000) {
    return trimTrailingZeros(value / 1_000_000_000) + "B";
  }
  if (value >= 1_000_000) {
    return trimTrailingZeros(value / 1_000_000) + "M";
  }
  if (value >= 1_000) {
    return trimTrailingZeros(value / 1_000) + "K";
  }
  return value.toString();
}

function trimTrailingZeros(num: number): string {
  return num.toFixed(2).replace(/\.?0+$/, "").replace(/(\.\d)0$/, "$1");
}
