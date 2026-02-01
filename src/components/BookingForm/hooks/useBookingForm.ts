import { useBookings } from "@/context/BookingContext";
import { bookingSchema, type TBookingSchema } from "../schemas/bookingSchema";
import { BookingStatus, type IBooking } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type DefaultValues } from "react-hook-form";
import { useEffect } from "react";
import { findOverlappingBookings } from "@/utils/bookingHelper";
import { toast } from "sonner";

interface IUseBookingFormProps {
  bookingToEdit: IBooking | null;
  onClose: () => void;
  isFormOpen: boolean;
}

export function useBookingForm({
  bookingToEdit,
  onClose,
  isFormOpen,
}: IUseBookingFormProps) {
  const { bookings, addBooking, updateBooking } = useBookings();

  const isEditingBooking = !!bookingToEdit;

  const defaultValues: DefaultValues<TBookingSchema> = {
    guestName: "",
    email: "",
    propertyName: "",
    status: BookingStatus.Pending,
    startDate: undefined,
    endDate: undefined,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TBookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const startDate = useWatch({ control, name: "startDate" });

  useEffect(() => {
    if (!isFormOpen) return;

    if (bookingToEdit) {
      reset(bookingToEdit);
    } else {
      reset(defaultValues);
    }
  }, [bookingToEdit, reset, isFormOpen]);

  function onSubmit(data: TBookingSchema) {
    const overlapping = findOverlappingBookings(
      bookings,
      data.startDate,
      data.endDate,
      bookingToEdit?.id,
    );

    if (overlapping.length > 0) {
      toast.error("Date conflict detected", {
        description: `This booking overlaps with "${overlapping[0].propertyName}" (${overlapping[0].guestName})`,
      });
      return;
    }

    if (bookingToEdit) {
      updateBooking(bookingToEdit.id, data);
      toast.success("Booking updated successfully");
    } else {
      addBooking(data);
      toast.success("Booking created successfully");
    }
    onClose();
  }

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    isEditingBooking,
    startDate,
  };
}
