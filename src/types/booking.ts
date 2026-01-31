export type IBookingStatus = "confirmed" | "pending" | "cancelled";

export const BookingStatus = {
  Confirmed: "confirmed",
  Pending: "pending",
  Cancelled: "cancelled",
} as const;

export interface IBooking {
  id: string;
  guestName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  status: IBookingStatus;
  createdAt: Date;
}

export type BookingFormData = Omit<IBooking, "id" | "createdAt">;
