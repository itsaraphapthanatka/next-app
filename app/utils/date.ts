// utils/date.ts
export function formatMonthYear(
    month?: string | number,
    year?: string | number,
    locale = "en-US",            // เปลี่ยนเป็น "th-TH" ได้
    monthStyle: "short" | "long" = "short"
  ) {
    if (month == null || year == null) return "";
    const m = Number(month), y = Number(year);
    if (!Number.isInteger(m) || m < 1 || m > 12 || !Number.isInteger(y)) {
      return `${month}-${year}`;
    }
    const d = new Date(Date.UTC(y, m - 1, 1));
    return new Intl.DateTimeFormat(locale, { month: monthStyle, year: "numeric" }).format(d);
  }
  