import type { IBooking } from "./types/booking";
// TODO: remove mock data when developing with real data
export const bookingExamples: IBooking[] = [
  {
    id: "1",
    guestName: "John Doe 01",
    email: "john.doe1@example.com",
    startDate: new Date("2026-01-15"),
    endDate: new Date("2026-01-31"),
    status: "confirmed",
    createdAt: new Date(),
  },
  {
    id: "2",
    guestName: "John Doe 02",
    email: "john.doe2@example.com",
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-02-28"),
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "3",
    guestName: "John Doe 03",
    email: "john.doe3@example.com",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
    status: "cancelled",
    createdAt: new Date(),
  },
];
