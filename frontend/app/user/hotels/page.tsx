import Footer from "@/components/Footer";
import Link from "next/link";
import UserHeader from "@/components/UserHeader";

const hotelCards = [
  {
    name: "Himalayan Paradise Resort",
    location: "Pokhara",
    price: "NPR 8,500",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kathmandu Grand Hotel",
    location: "Kathmandu",
    price: "NPR 6,500",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Everest View Lodge",
    location: "Namche Bazaar",
    price: "NPR 4,500",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Lakeside Retreat",
    location: "Pokhara",
    price: "NPR 5,500",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21035?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Chitwan Wildlife Resort",
    location: "Chitwan",
    price: "NPR 7,500",
    image:
      "https://images.unsplash.com/photo-1540555699805-6d31f3a1fce8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bhaktapur Heritage Hotel",
    location: "Bhaktapur",
    price: "NPR 5,000",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa5007649e9?auto=format&fit=crop&w=1200&q=80",
  },
];

const filters = [
  {
    label: "Location",
    placeholder: "Search by location",
  },
  {
    label: "Price Range",
    placeholder: "",
  },
];

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <UserHeader />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explore Hotels in Nepal
          </h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
            <aside className="self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5">
                    <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold tracking-tight">Filters</h2>
              </div>

              <div className="mt-6 space-y-5">
                {filters.map((filter) => (
                  <label key={filter.label} className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-600">
                      {filter.label}
                    </span>
                    <input
                      type="text"
                      placeholder={filter.placeholder}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                ))}
              </div>
            </aside>

            <section id="hotels" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {hotelCards.map((hotel) => (
                <article
                  key={hotel.name}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                >
                  <div
                    className="relative h-40 bg-slate-200"
                    style={{
                      backgroundImage: `url('${hotel.image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                  </div>

                  <div className="p-4">
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
                      {hotel.name}
                    </h3>
                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <span className="text-blue-500">⌖</span>
                      {hotel.location}
                    </p>

                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Starting from</p>
                        <p className="text-3xl font-extrabold leading-none text-blue-600">
                          {hotel.price}
                        </p>
                      </div>
                      {hotel.name === "Himalayan Paradise Resort" ? (
                        <Link
                          href="/user/hotels/himalayan-paradise-resort"
                          className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold leading-tight text-white transition-colors hover:bg-blue-700"
                        >
                          View
                          <br />
                          Details
                        </Link>
                      ) : (
                        <span className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold leading-tight text-white transition-colors hover:bg-blue-700">
                          View
                          <br />
                          Details
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}