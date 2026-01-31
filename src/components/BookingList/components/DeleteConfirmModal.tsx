import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { IBooking } from "@/types/booking";
import { AlertTriangle } from "lucide-react";

interface IDeleteConfirmDialogProps {
  booking: IBooking | null;
  onClose: () => void;
}

export function DeleteConfirmDialog({
  booking,
  onClose,
}: IDeleteConfirmDialogProps) {
  return (
    <AlertDialog open={!!booking} onOpenChange={onClose}>
      <AlertDialogContent className="sm:w-sm">
        <div className="bg-destructive/10 mx-auto flex size-12 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive size-6" />
        </div>

        <AlertDialogTitle className="text-primary-text text-center">
          Delete Booking?
        </AlertDialogTitle>

        <AlertDialogDescription className="text-secondary-text space-y-2 text-center">
          <p>
            Are you sure you want to delete the booking for{" "}
            <span className="text-primary-text font-medium">
              {booking?.guestName}
            </span>
            ?
          </p>
          <p className="text-sm">This action cannot be undone.</p>
        </AlertDialogDescription>

        <AlertDialogFooter className="gap-4 sm:justify-center">
          <AlertDialogCancel
            variant="outline-tertiary"
            onClick={onClose}
            className="w-full sm:w-1/2"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // TODO: Handle delete action
            }}
            variant="filled-primary"
            className="w-full sm:w-1/2"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
