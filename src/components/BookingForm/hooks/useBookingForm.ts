import { useBookings } from "@/context/BookingContext";
import { bookingSchema, type TBookingSchema } from "../schemas/bookingSchema";
import { BookingStatus, type IBooking } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface IUseBookingFormProps {
  bookingToEdit: IBooking | null;
  onClose: () => void;
}

export function useBookingForm({
  bookingToEdit,
  onClose,
}: IUseBookingFormProps) {
  const { addBooking, updateBooking } = useBookings();

  const isEditingBooking = !!bookingToEdit;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TBookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: "",
      email: "",
      propertyName: "",
      status: BookingStatus.Pending,
      startDate: undefined,
      endDate: undefined,
    },
  });

  // Reset form quando abrir para edição
  useEffect(() => {
    if (bookingToEdit) {
      reset(bookingToEdit);
    } else {
      reset();
    }
  }, [bookingToEdit, reset]);

  function onSubmit(data: TBookingSchema) {
    if (bookingToEdit) {
      updateBooking(bookingToEdit.id, data);
    } else {
      addBooking(data);
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
  };
}
