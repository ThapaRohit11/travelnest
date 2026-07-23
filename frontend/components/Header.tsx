import Link from "next/link";

const navItems = ["Home", "About", "Login"];

function LogoMark() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded border border-sky-500 bg-sky-50">
      <span className="grid h-3.5 w-3.5 grid-cols-2 grid-rows-2 gap-[2px]">
        <span className="rounded-[2px] bg-sky-600" />
        <span className="rounded-[2px] bg-sky-600" />
        <span className="rounded-[2px] bg-sky-600" />
        <span className="rounded-[2px] bg-sky-300" />
      </span>
    </span>
  );
}

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            TravelNest
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-8 text-sm text-slate-500">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : item === "About" ? "/#about" : "/login"}
              className="font-medium transition-colors hover:text-slate-900"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
