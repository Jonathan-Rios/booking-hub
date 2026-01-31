import { Plus } from "lucide-react";
import { Header } from "./components";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen sm:p-8 flex flex-col gap-5">
      <Header />

      <div className="flex flex-col gap-5 p-3">
        <Button
          onClick={() => {
            //TODO: Open add booking modal
          }}
          className="sm:self-end bg-app-secondary hover:bg-app-primary text-white"
        >
          <Plus className="size-4" />

          <span>Add Booking</span>
        </Button>

        <div className="text-body text-primary-text">It's working!</div>
      </div>
    </div>
  );
}

export default App;
