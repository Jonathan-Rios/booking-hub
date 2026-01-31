export function Header() {
  return (
    <header className="flex flex-col gap-5">
      <div className="relative h-16 sm:h-20 mt-4">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-app-primary sm:rounded-sm" />

        <div className="absolute -left-1 top-1/2 -translate-y-1/2 bg-white py-2 pr-4 sm:pr-7 rounded-r-full">
          <h1 className="text-title sm:text-lead font-bold text-app-primary pl-4">
            Booking Management System
          </h1>
        </div>
      </div>
    </header>
  );
}
