import { BookingStatus, type IBooking } from "@/types/booking";

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

interface IFindOverlappingBookingsParams {
  bookings: IBooking[];
  startDate: Date;
  endDate: Date;
  propertyName: string;
  excludeId?: string;
}

/**
 * Find bookings that overlap with a given date range and property name.
 * Ignores the booking being edited and cancelled bookings
 * @param params.bookings List of bookings to check
 * @param params.startDate Start date of the range to check
 * @param params.endDate End date of the range to check
 * @param params.propertyName Property name to check overlaps for (only same property conflicts)
 * @param params.excludeId Optional booking ID to exclude from the check
 * @returns Array of overlapping bookings (excludes cancelled bookings)
 */
export function findOverlappingBookings({
  bookings,
  startDate,
  endDate,
  propertyName,
  excludeId,
}: IFindOverlappingBookingsParams): IBooking[] {
  return bookings.filter((booking) => {
    if (excludeId && booking.id === excludeId) {
      return false;
    }

    if (booking.status === BookingStatus.Cancelled) {
      return false;
    }

    if (booking.propertyName !== propertyName) {
      return false;
    }

    return hasDateOverlap(
      startDate,
      endDate,
      booking.startDate,
      booking.endDate,
    );
  });
}
