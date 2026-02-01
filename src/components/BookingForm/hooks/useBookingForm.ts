import { useBookings } from "@/context/BookingContext";
import { bookingSchema, type TBookingSchema } from "../schemas/bookingSchema";
import { BookingStatus, type IBooking } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type DefaultValues } from "react-hook-form";
import { useEffect } from "react";
import { findOverlappingBookings } from "@/utils/bookingHelper";
import { toast } from "sonner";
import { formatDateRange } from "@/utils/dateHelper";

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
    formState: { errors, isSubmitting, isDirty },
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

  function validateBookingOverlap(data: TBookingSchema): boolean {
    if (data.status === BookingStatus.Cancelled) {
      return true;
    }

    const overlapping = findOverlappingBookings({
      bookings,
      startDate: data.startDate,
      endDate: data.endDate,
      propertyName: data.propertyName,
      excludeId: bookingToEdit?.id,
    });

    if (overlapping.length > 0) {
      const conflictingBooking = overlapping[0];
      const period = formatDateRange(
        conflictingBooking.startDate,
        conflictingBooking.endDate,
      );
      toast.error("Date conflict detected", {
        description: `Overlaps with "${conflictingBooking.propertyName}" by ${conflictingBooking.guestName}. Period: ${period}`,
      });
      return false;
    }

    return true;
  }

  function onSubmit(data: TBookingSchema) {
    if (!validateBookingOverlap(data)) {
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

  function handleAccidentalClose(e: Event) {
    if (isDirty) {
      e.preventDefault();
      toast.warning("You have unsaved changes", {
        description: "Please save or cancel your changes before closing.",
      });
    }
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
    handleAccidentalClose,
  };
}
