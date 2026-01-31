import { createContext, useContext, useState, type ReactNode } from "react";
import type { IBooking } from "@/types/booking";

interface IBookingContextType {
  bookings: IBooking[];
  addBooking: (booking: Omit<IBooking, "id" | "createdAt">) => void;
  updateBooking: (id: string, booking: Partial<IBooking>) => void;
  deleteBooking: (id: string) => void;
}

const BookingContext = createContext<IBookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  function addBooking(data: Omit<IBooking, "id" | "createdAt">) {
    const newBooking: IBooking = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setBookings((prev) => [...prev, newBooking]);
  }

  function updateBooking(id: string, data: Partial<IBooking>) {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...data } : booking,
      ),
    );
  }

  function deleteBooking(id: string) {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  }

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBooking, deleteBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within BookingProvider");
  }
  return context;
}
