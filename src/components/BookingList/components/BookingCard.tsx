import type { IBooking } from "@/types/booking";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatDateRange } from "@/utils/dateHelper";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { useMemo } from "react";

interface IBookingCardProps {
  booking: IBooking;
  onEdit: (booking: IBooking) => void;
  onRemove: (booking: IBooking) => void;
}

export function BookingCard({ booking, onEdit, onRemove }: IBookingCardProps) {
  const formattedDateRange = useMemo(
    () => formatDateRange(booking.startDate, booking.endDate),
    [booking.startDate, booking.endDate],
  );

  return (
    <Card className="py-0">
      <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-7">
        <div className="flex flex-col gap-3 sm:gap-2">
          <div className="flex flex-col text-xs">
            <h3 className="text-title">{booking.guestName}</h3>

            <p className="text-body text-secondary-text">{booking.email}</p>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row">
            <span className="text-label">Property Name:</span>
            <p className="text-body">{booking.propertyName}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 self-stretch sm:gap-2">
          <div className="flex flex-col gap-1 sm:flex-row">
            <span className="text-label">Status:</span>
            <BookingStatusBadge status={booking.status} />
          </div>

          <div className="flex flex-col gap-1 sm:flex-row">
            <span className="text-label">Date Range:</span>
            <p className="text-body">{formattedDateRange}</p>
          </div>
        </div>

        <div className="ml-auto flex w-full flex-col gap-3 sm:w-auto lg:flex-row">
          <Button
            variant="outline-primary"
            className="w-full min-w-24 sm:w-auto"
            size="sm"
            onClick={() => {
              onEdit(booking);
            }}
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            variant="outline-tertiary"
            size="sm"
            onClick={() => {
              onRemove(booking);
            }}
            className="w-full min-w-24 sm:w-auto"
          >
            <Trash2 className="size-3.5" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
