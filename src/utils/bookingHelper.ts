import type { IBooking } from "@/types/booking";

/**
 * Check if two date ranges overlap
 * @param startA Start date of range A
 * @param endA End date of range A
 * @param startB Start date of range B
 * @param endB End date of range B
 */
export function hasDateOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
): boolean {
  return startA < endB && endA > startB;
}

/**
 * Find bookings that overlap with the given date range
 * @param bookings List of bookings to check
 * @param startDate Start date of the range to check
 * @param endDate End date of the range to check
 * @param excludeId Optional booking ID to exclude from the check
 */
export function findOverlappingBookings(
  bookings: IBooking[],
  startDate: Date,
  endDate: Date,
  excludeId?: string,
): IBooking[] {
  return bookings.filter((booking) => {
    if (excludeId && booking.id === excludeId) return false;
    return hasDateOverlap(
      startDate,
      endDate,
      booking.startDate,
      booking.endDate,
    );
  });
}
