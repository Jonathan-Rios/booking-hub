import { bookingExamples } from "@/mockData";
import { BookingCard } from "./components/BookingCard";
import { CalendarX } from "lucide-react";

export function BookingList() {
  const bookings = bookingExamples; // TODO: Replace with real data

  if (bookings.length === 0) {
    return (
      <div className="border-muted-foreground/25 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
        <div className="bg-muted rounded-full p-4">
          <CalendarX className="text-primary-text size-8" />
        </div>
        <div className="flex flex-col items-center gap-1 p-4 sm:p-0">
          <h3 className="text-title text-primary-text">No bookings found</h3>
          <p className="text-secondary-text text-center">
            Create your first booking to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
