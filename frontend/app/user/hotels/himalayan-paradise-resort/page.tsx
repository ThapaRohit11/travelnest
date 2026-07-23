import Link from "next/link";
import Footer from "@/components/Footer";
import UserHeader from "@/components/UserHeader";

const amenities = [
  "Free WiFi",
  "Pool",
  "Parking",
  "Restaurant",
  "Mountain View",
];

const highlights = [
  "Free cancellation up to 24 hours before check-in",
  "No prepayment needed - pay at the property",
  "Instant booking confirmation",
];

const extras = ["Flexible booking dates", "All group sizes welcome"];

export default function HimalayanParadiseResortPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <UserHeader />

      <main className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-[1280px]">
          <div
            className="h-[240px] rounded-[22px] bg-slate-200 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:h-[320px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:p-8">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Himalayan Paradise Resort
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span className="text-blue-500">⌖</span>
                Pokhara, Nepal
              </p>

              <div className="mt-7">
                <h2 className="text-lg font-bold text-slate-900">About This Property</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  Luxury resort with stunning mountain views and world-class amenities.
                </p>
              </div>

              <div className="mt-7">
                <h2 className="text-lg font-bold text-slate-900">Amenities & Services</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl bg-[#eef5ff] px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        {amenity === "Free WiFi" ? "⌁" : amenity === "Pool" ? "≋" : amenity === "Parking" ? "▣" : amenity === "Restaurant" ? "⌂" : "△"}
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="rounded-[22px] bg-[#1f5cff] p-6 text-white shadow-[0_16px_34px_rgba(31,92,255,0.30)] sm:p-7">
              <p className="text-sm text-white/70">Price per night</p>
              <div className="mt-2 text-4xl font-extrabold tracking-tight">NPR 8,500</div>

              <Link
                href="/user/hotels/himalayan-paradise-resort/booking"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-bold text-blue-600 shadow-[0_8px_18px_rgba(15,23,42,0.14)] transition-colors hover:bg-blue-50"
              >
                Reserve Now
              </Link>

              <ul className="mt-10 space-y-4 text-sm leading-6 text-white/90">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg text-emerald-300">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/15 pt-6">
                <ul className="space-y-3 text-sm text-white/85">
                  {extras.map((extra) => (
                    <li key={extra} className="flex items-center gap-3">
                      <span className="text-white/75">◌</span>
                      <span>{extra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}