export function formatNumberShort(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
    }
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
    }
    return value.toString();
  }
  