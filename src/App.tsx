import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { BookingList } from "./components/BookingList";
import { Header } from "./components/Header";
import { BookingForm } from "./components/BookingForm";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { useBookingDialogs } from "./hooks/useBookingDialogs";
import { useBookings } from "./context/BookingContext";

function App() {
  const {
    isFormOpen,
    bookingToEdit,
    bookingToRemove,
    openCreateForm,
    openEditForm,
    closeForm,
    openRemoveDialog,
    closeRemoveDialog,
  } = useBookingDialogs();

  const { deleteBooking } = useBookings();

  function handleConfirmRemove() {
    if (bookingToRemove) {
      deleteBooking(bookingToRemove.id);
      closeRemoveDialog();
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-5 sm:p-8">
      <Header />

      <div className="flex flex-col gap-5 p-5 sm:p-0">
        <Button
          onClick={openCreateForm}
          className="bg-app-secondary hover:bg-app-tertiary text-white sm:self-end"
        >
          <Plus className="size-4" />

          <span>Add Booking</span>
        </Button>

        <BookingList onEdit={openEditForm} onRemove={openRemoveDialog} />
      </div>

      <BookingForm
        open={isFormOpen}
        onClose={closeForm}
        isEditingBooking={!!bookingToEdit}
      />

      <DeleteConfirmDialog
        booking={bookingToRemove}
        onClose={closeRemoveDialog}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}

export default App;
