import { format, parseISO } from "date-fns";

/**
 * Formats a date to "MMM dd, yyyy" Ex: "Jan 01, 2024"
 * @param date Date or date string to format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM dd, yyyy");
}

/** Formats a date range to "MMM dd, yyyy - MMM dd, yyyy" Ex: "Jan 01, 2024 - Jan 05, 2024"
 * @param startDate Start date of the range
 * @param endDate End date of the range
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
