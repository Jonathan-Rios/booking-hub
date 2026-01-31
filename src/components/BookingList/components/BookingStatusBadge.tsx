import { BookingStatus, type IBookingStatus } from "@/types/booking";
import { Badge } from "../../ui/badge";
import { cn } from "@/lib/utils";

interface IBookingStatusBadgeProps {
  status: IBookingStatus;
}

const statusConfig: Record<
  IBookingStatus,
  { label: string; className: string }
> = {
  confirmed: {
    label: BookingStatus.Confirmed,
    className:
      "bg-app-secondary/15 text-app-secondary border-app-secondary/20 capitalize",
  },
  pending: {
    label: BookingStatus.Pending,
    className: "bg-amber-100 text-amber-700 border-amber-200 capitalize",
  },
  cancelled: {
    label: BookingStatus.Cancelled,
    className:
      "bg-destructive/15 text-destructive border-destructive/20 capitalize",
  },
};

export function BookingStatusBadge({ status }: IBookingStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
