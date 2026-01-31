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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "@/types/booking";

const statusOptions = [
  { value: BookingStatus.Confirmed, label: "Confirmed" },
  { value: BookingStatus.Pending, label: "Pending" },
  { value: BookingStatus.Cancelled, label: "Cancelled" },
] as const;

interface IBookingFormProps {
  open: boolean;
  onClose: () => void;
  isEditingBooking: boolean;
}

export function BookingForm({
  open,
  onClose,
  isEditingBooking,
}: IBookingFormProps) {
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

        <form onSubmit={() => {}} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="guestName">Guest Name</Label>
              <Input id="guestName" placeholder="Enter guest name" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="guest@example.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input id="propertyName" placeholder="Enter property name" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DatePicker
              onChange={() => {}}
              label="Start Date"
              value={new Date()}
              minDate={new Date()}
              placeholder="Select start date"
            />

            <DatePicker
              label="End Date"
              value={new Date()}
              onChange={() => {}}
              minDate={new Date()}
              placeholder="Select end date"
            />
          </div>

          {isEditingBooking && (
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>

              <Select>
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
            <Button type="submit">
              {isEditingBooking ? "Update Booking" : "Create Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
