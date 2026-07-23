"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearStoredUserProfile } from "@/lib/user-storage";

const navItems = [
  { label: "Home", href: "/user" },
  { label: "About", href: "/user#about" },
  { label: "Hotels", href: "/user/hotels" },
  { label: "Booking", href: "/user/bookings" },
  { label: "Profile", href: "/user/profile" },
];

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

export default function UserHeader() {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    clearStoredUserProfile();
    setShowLogoutDialog(false);
    router.push("/");
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 sm:px-8">
          <Link href="/user" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              TravelNest
            </span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-8 text-sm text-slate-500">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium transition-colors hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setShowLogoutDialog(true)}
              className="font-medium transition-colors hover:text-slate-900"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {showLogoutDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Logout Confirmation
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutDialog(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}