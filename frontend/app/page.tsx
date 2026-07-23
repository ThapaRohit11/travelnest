import Footer from "@/components/Footer";
import Header from "@/components/Header";

const featuredHotels = [
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
];

const benefits = [
  {
    title: "Secure Booking",
    description: "Your payment and data are completely secure with us",
    icon: (
      <path d="M12 3 5.5 6v5c0 4.5 2.7 7.9 6.5 10 3.8-2.1 6.5-5.5 6.5-10V6L12 3Zm0 4.1c1.5 0 2.8 1.2 2.8 2.8s-1.3 2.8-2.8 2.8-2.8-1.2-2.8-2.8 1.3-2.8 2.8-2.8Zm0 9.3c-1.6 0-3-.7-4.1-1.8.9-1.3 2.4-2.1 4.1-2.1s3.2.8 4.1 2.1A5.9 5.9 0 0 1 12 16.4Z" />
    ),
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer service for your convenience",
    icon: (
      <path d="M12 4a8 8 0 1 0 8 8h-2.2A5.8 5.8 0 1 1 12 6.2V4Zm0 3.4 1.2 2.5 2.8.4-2 2 .5 2.8L12 13.8 9.5 15l.5-2.8-2-2 2.8-.4L12 7.4Z" />
    ),
  },
  {
    title: "Best Price",
    description: "Guaranteed best prices for all hotel bookings",
    icon: (
      <path d="M11.1 2.8 3 10.9l6.1 6.3L18.4 9l-7.3-6.2Zm5.3 6.3-5.2 5.2-2.7-2.8 5.2-5.1 2.7 2.7ZM19 14.8l1.8 1.8-4.2 4.2-1.8-1.8 4.2-4.2Z" />
    ),
  },
  {
    title: "Trusted by Thousands",
    description: "Join thousands of happy travelers across Nepal",
    icon: (
      <path d="m12 21-1.1-1c-3.8-3.4-6.3-5.8-6.3-8.8A4.7 4.7 0 0 1 9.3 6c1.3 0 2.6.6 3.4 1.7A4.3 4.3 0 0 1 16 6c2.6 0 4.7 2 4.7 4.8 0 3-2.5 5.4-6.3 8.8L12 21Z" />
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section
          className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-slate-900 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,15,28,0.46), rgba(8,15,28,0.46)), url('https://images.unsplash.com/photo-1513214577409-38d6c8d2aaf0?auto=format&fit=crop&w=1600&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
          <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect Stay in Nepal
            </h1>
            <p className="mt-5 text-base text-white/90 sm:text-lg">
              Discover amazing hotels across the beautiful landscapes of Nepal
            </p>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Featured Hotels
              </h2>
              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                Handpicked hotels for an unforgettable experience
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredHotels.map((hotel) => (
                <article
                  key={hotel.name}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                >
                  <div
                    className="relative h-44 bg-slate-200"
                    style={{
                      backgroundImage: `url('${hotel.image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      ★ Featured
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <span className="text-blue-500">⌖</span>
                      {hotel.location}
                    </p>

                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Starting from</p>
                        <p className="text-xl font-bold text-blue-600">{hotel.price}</p>
                      </div>
                      <a
                        href="#"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-slate-100/80 px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-[1200px] text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Why Choose TravelNest?
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Your trusted partner for hotel bookings in Nepal
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      {benefit.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
