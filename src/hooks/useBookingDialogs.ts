import { useState } from "react";
import type { IBooking } from "@/types/booking";

export function useBookingDialogs() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<IBooking | null>(null);
  const [bookingToRemove, setBookingToRemove] = useState<IBooking | null>(null);

  function openCreateForm() {
    setBookingToEdit(null);
    setIsFormOpen(true);
  }

  function openEditForm(booking: IBooking) {
    setBookingToEdit(booking);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setBookingToEdit(null);
  }

  function openRemoveDialog(booking: IBooking) {
    setBookingToRemove(booking);
  }

  function closeRemoveDialog() {
    setBookingToRemove(null);
  }

  return {
    isFormOpen,
    bookingToEdit,
    openCreateForm,
    openEditForm,
    closeForm,

    bookingToRemove,
    openRemoveDialog,
    closeRemoveDialog,
  };
}
