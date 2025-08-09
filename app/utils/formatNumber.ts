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

export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatNumberParser(value: string): string {
  return value.replace(/,/g, "");
}




