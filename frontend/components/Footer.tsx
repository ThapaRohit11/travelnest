const quickLinks = ["Home", "Hotels", "About Us", "Login"];

const contactItems = [
  "+977-1-4234567",
  "info@travelnest.com.np",
  "Kathmandu, Nepal",
];

function LogoMark() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded border border-sky-500 bg-sky-50/10">
      <span className="grid h-3.5 w-3.5 grid-cols-2 grid-rows-2 gap-[2px]">
        <span className="rounded-[2px] bg-sky-400" />
        <span className="rounded-[2px] bg-sky-500" />
        <span className="rounded-[2px] bg-sky-500" />
        <span className="rounded-[2px] bg-sky-300" />
      </span>
    </span>
  );
}

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0e1729] px-6 py-6 text-slate-300 sm:px-8">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-sm">
        <div className="grid gap-8 md:grid-cols-4">
          <section className="space-y-3">
            <a href="#" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-semibold tracking-tight text-white">
                TravelNest
              </span>
            </a>
            <p className="max-w-[220px] text-sm leading-6 text-slate-400">
              Your perfect stay in Nepal awaits. Discover the best hotels across the country.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold text-white">Contact</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-slate-500">☎</span>
                <span>{contactItems[0]}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-500">✉</span>
                <span>{contactItems[1]}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-500">⌖</span>
                <span>{contactItems[2]}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold text-white">Follow Us</h2>
            <div className="flex items-center gap-3">
              <SocialIcon label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M13.5 8H15V5h-1.5C11.57 5 10 6.57 10 8.5V10H8v3h2v6h3v-6h2.5l.5-3H13V8.75c0-.41.34-.75.75-.75Z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M18.9 7.3c.01.17.01.34.01.51 0 5.23-3.98 11.26-11.26 11.26-2.23 0-4.31-.65-6.06-1.76.31.04.62.05.95.05 1.85 0 3.55-.63 4.9-1.68a3.97 3.97 0 0 1-3.7-2.75c.25.04.5.07.76.07.37 0 .74-.05 1.08-.14a3.96 3.96 0 0 1-3.18-3.89v-.05c.55.31 1.18.5 1.86.52a3.96 3.96 0 0 1-1.22-5.28c2.04 2.5 5.09 4.14 8.53 4.31a3.96 3.96 0 0 1 6.75-3.61c.94-.18 1.83-.53 2.63-1.01a3.99 3.99 0 0 1-1.75 2.19 7.87 7.87 0 0 0 2.28-.63 8.5 8.5 0 0 1-1.98 2.05Z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <rect x="5" y="5" width="14" height="14" rx="4" />
                  <circle cx="12" cy="12" r="3.2" />
                  <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
            </div>
          </section>
        </div>

        <div className="mt-6 border-t border-white/8 pt-4 text-center text-sm text-slate-400">
          © 2026 TravelNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
