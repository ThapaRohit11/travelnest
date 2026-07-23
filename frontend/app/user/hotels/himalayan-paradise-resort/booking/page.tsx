"use client";

import Footer from "@/components/Footer";
import UserHeader from "@/components/UserHeader";
import { getStoredUserProfile, profileIsComplete } from "@/lib/user-storage";
import { useMemo, useState } from "react";

export default function ResortBookingPage() {
  const storedProfile = getStoredUserProfile();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [fullName, setFullName] = useState(storedProfile.fullName);
  const [email, setEmail] = useState(storedProfile.email);
  const [phoneNumber, setPhoneNumber] = useState(storedProfile.phoneNumber);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const guestInfoComplete = useMemo(
    () => profileIsComplete({ fullName, email, phoneNumber }),
    [email, fullName, phoneNumber]
  );

  const canConfirmBooking =
    Boolean(checkInDate.trim()) &&
    Boolean(checkOutDate.trim()) &&
    Boolean(numberOfGuests.trim()) &&
    guestInfoComplete;

  const handleConfirmBooking = () => {
    if (!canConfirmBooking) {
      setErrorMessage("Fill all booking details and guest information before confirming.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("Booking details are complete.");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <UserHeader />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Complete Your Booking
          </h1>

          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Booking Details
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600">
                    <span className="text-blue-600">▣</span>
                    Check-in Date
                  </span>
                  <input
                    type="text"
                    value={checkInDate}
                    onChange={(event) => setCheckInDate(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600">
                    <span className="text-blue-600">▣</span>
                    Check-out Date
                  </span>
                  <input
                    type="text"
                    value={checkOutDate}
                    onChange={(event) => setCheckOutDate(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600">
                    <span className="text-blue-600">▦</span>
                    Number of Guests
                  </span>
                  <input
                    type="text"
                    value={numberOfGuests}
                    onChange={(event) => setNumberOfGuests(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Guest Information
                </h2>

                <div className="mt-5 space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600">
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600">
                      Email Address
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600">
                      Phone Number
                    </span>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={!canConfirmBooking}
                  className="mt-8 flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Confirm Booking
                </button>

                {errorMessage ? (
                  <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
                ) : null}

                {successMessage ? (
                  <p className="mt-4 text-sm font-medium text-emerald-600">
                    {successMessage}
                  </p>
                ) : null}
              </div>
            </section>

            <aside className="rounded-[18px] bg-[#1f5cff] p-6 text-white shadow-[0_16px_34px_rgba(31,92,255,0.30)] sm:p-7">
              <h2 className="text-xl font-bold tracking-tight">Booking Summary</h2>

              <div
                className="mt-5 h-28 rounded-xl bg-slate-200"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />

              <div className="mt-5 text-xl font-bold leading-tight">
                Himalayan Paradise Resort
              </div>
              <p className="mt-2 text-sm text-white/80">Pokhara, Nepal</p>

              <div className="mt-8 space-y-4 border-t border-white/15 pt-5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/80">Price per night</span>
                  <span className="font-bold">NPR 8,500</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/80">Number of nights</span>
                  <span className="font-bold">0</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5">
                <span className="text-base font-semibold">Total Amount</span>
                <span className="text-2xl font-extrabold">NPR 0</span>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}