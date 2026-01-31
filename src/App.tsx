import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { BookingList } from "./components/BookingList";
import { Header } from "./components/Header";
import { useState } from "react";
import { BookingForm } from "./components/BookingList/components/BookingForm";

function App() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col gap-5 sm:p-8">
      <Header />

      <div className="flex flex-col gap-5 p-5 sm:p-0">
        <Button
          onClick={() => {
            setIsFormDialogOpen(true);
          }}
          className="bg-app-secondary hover:bg-app-tertiary text-white sm:self-end"
        >
          <Plus className="size-4" />

          <span>Add Booking</span>
        </Button>

        <BookingList />
      </div>

      <BookingForm
        open={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        isEditingBooking={false}
      />
    </div>
  );
}

export default App;
