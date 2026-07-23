"use client";

import Footer from "@/components/Footer";
import UserHeader from "@/components/UserHeader";
import { getStoredUserProfile, profileIsComplete, saveStoredUserProfile } from "@/lib/user-storage";
import { useState } from "react";

function InputField({
  label,
  placeholder,
  defaultValue,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value ?? defaultValue}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-12 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function PasswordField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <input
          type="password"
          placeholder={placeholder}
          className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        <span className="text-slate-400">◦</span>
      </div>
    </label>
  );
}

export default function ProfilePage() {
  const storedProfile = getStoredUserProfile();
  const [fullName, setFullName] = useState(storedProfile.fullName);
  const [email, setEmail] = useState(storedProfile.email);
  const [phoneNumber, setPhoneNumber] = useState(storedProfile.phoneNumber);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveChanges = () => {
    const nextProfile = {
      fullName: fullName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    if (!profileIsComplete(nextProfile)) {
      setErrorMessage("Full name, email, and phone number cannot be empty.");
      setStatusMessage("");
      return;
    }

    saveStoredUserProfile(nextProfile);
    setErrorMessage("");
    setStatusMessage("Profile saved successfully.");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <UserHeader />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and security
          </p>

          <section className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-9 w-9">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                    <path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="pt-2">
                <h2 className="text-base font-bold text-slate-900">Rohit Thapa</h2>
                <p className="text-sm text-slate-500">thapa@gmail.com</p>
              </div>
            </div>

            <div className="my-6 border-t border-slate-100" />

            <section>
              <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>

              <div className="mt-5 max-w-[560px] space-y-4">
                <InputField label="Full Name" value={fullName} onChange={setFullName} />
                <InputField label="Email Address" value={email} onChange={setEmail} type="email" />
                <InputField label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />

                <button
                  onClick={handleSaveChanges}
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700"
                >
                  Save Changes
                </button>

                {errorMessage ? (
                  <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                ) : null}

                {statusMessage ? (
                  <p className="text-sm font-medium text-emerald-600">{statusMessage}</p>
                ) : null}
              </div>
            </section>

            <div className="my-6 border-t border-slate-100" />

            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <span className="text-lg">🔒</span>
                Change Password
              </h2>

              <div className="mt-5 max-w-[560px] space-y-4">
                <PasswordField label="Current Password" placeholder="Enter current password" />
                <PasswordField label="New Password" placeholder="Enter new password" />
                <PasswordField label="Confirm New Password" placeholder="Confirm new password" />

                <button className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </section>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}