import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus, type IBooking } from "@/types/booking";
import { Controller } from "react-hook-form";
import { InputText } from "./components/InputText";
import { useBookingForm } from "./hooks/useBookingForm";

const statusOptions = [
  { value: BookingStatus.Confirmed, label: "Confirmed" },
  { value: BookingStatus.Pending, label: "Pending" },
  { value: BookingStatus.Cancelled, label: "Cancelled" },
] as const;

interface IBookingFormProps {
  open: boolean;
  onClose: () => void;
  bookingToEdit: IBooking | null;
}

export function BookingForm({
  open,
  onClose,
  bookingToEdit,
}: IBookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    isEditingBooking,
  } = useBookingForm({ bookingToEdit, onClose, isFormOpen: open });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-5 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditingBooking ? "Edit Booking" : "New Booking"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isEditingBooking
              ? "Edit the booking details below"
              : "Fill in the details to create a new booking"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="guestName" className="text-secondary-text">
                Guest Name
              </Label>
              <InputText
                id="guestName"
                placeholder="Enter guest name"
                error={errors.guestName?.message}
                {...register("guestName")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-secondary-text">
                Email
              </Label>
              <InputText
                id="email"
                type="email"
                placeholder="guest@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="propertyName" className="text-secondary-text">
              Property Name
            </Label>
            <InputText
              id="propertyName"
              placeholder="Enter property name"
              error={errors.propertyName?.message}
              {...register("propertyName")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Start Date"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={isEditingBooking ? undefined : new Date()}
                  placeholder="Select start date"
                  error={errors.startDate?.message}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="End Date"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={isEditingBooking ? undefined : new Date()}
                  placeholder="Select end date"
                  error={errors.endDate?.message}
                />
              )}
            />
          </div>

          {isEditingBooking && (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="status">Status</Label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          )}

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline-tertiary"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="filled-secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {isEditingBooking ? "Update Booking" : "Create Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
