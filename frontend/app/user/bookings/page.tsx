import Footer from "@/components/Footer";
import UserHeader from "@/components/UserHeader";

const bookings = [
  {
    name: "Himalayan Paradise Resort",
    status: "Confirmed",
    statusClass: "bg-emerald-100 text-emerald-700",
    dates: "2026-06-15 to 2026-06-18",
    guests: "2 Guests",
    price: "NPR 25,500",
    canCancel: true,
  },
  {
    name: "Kathmandu Grand Hotel",
    status: "Confirmed",
    statusClass: "bg-emerald-100 text-emerald-700",
    dates: "2026-05-20 to 2026-05-23",
    guests: "1 Guests",
    price: "NPR 19,500",
    canCancel: true,
  },
  {
    name: "Everest View Lodge",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-700",
    dates: "2026-07-10 to 2026-07-15",
    guests: "3 Guests",
    price: "NPR 22,500",
    canCancel: false,
  },
];

function InfoChip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-14 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
      <span className="text-blue-600">{icon}</span>
      <span className="leading-5">{children}</span>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <UserHeader />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-[22px] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.12)] sm:p-6 lg:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Bookings
          </h1>

          <div className="mt-6 space-y-4">
            {bookings.map((booking) => (
              <article
                key={booking.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        {booking.name}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.statusClass}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[120px_120px_120px]">
                      <InfoChip
                        icon={
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M4 9h16" />
                            <path d="M8 3v4M16 3v4" strokeLinecap="round" />
                          </svg>
                        }
                      >
                        {booking.dates}
                      </InfoChip>

                      <InfoChip
                        icon={
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <circle cx="9" cy="8" r="3" />
                            <path d="M3.5 20a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
                            <path d="M17 11a3 3 0 1 0-1.5-5.6" strokeLinecap="round" />
                          </svg>
                        }
                      >
                        {booking.guests}
                      </InfoChip>

                      <InfoChip icon={<span className="text-lg font-bold">NPR</span>}>
                        <span className="text-lg font-extrabold text-blue-600">
                          {booking.price.replace("NPR ", "")}
                        </span>
                      </InfoChip>
                    </div>
                  </div>

                  {booking.canCancel ? (
                    <button className="h-12 shrink-0 rounded-xl border-2 border-red-500 px-6 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50">
                      Cancel Booking
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}