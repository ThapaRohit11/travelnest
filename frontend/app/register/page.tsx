"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveStoredUserProfile } from "@/lib/user-storage";

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center text-blue-600">
      {children}
    </span>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
  icon,
  defaultValue,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-transparent transition focus-within:border-blue-500 focus-within:ring-blue-100">
        <FieldIcon>{icon}</FieldIcon>
        <input
          type={type}
          placeholder={placeholder}
          value={defaultValue}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-14 w-full bg-transparent pr-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      setErrorMessage("Full name, email, and phone number are required.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please enter and confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    saveStoredUserProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    });

    setErrorMessage("");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7fbff_0%,#edf4ff_40%,#f3f7fb_100%)]">
      <Header />

      <main className="px-6 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto flex max-w-[420px] flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-600 text-blue-600 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 21v-6h6v6" />
                <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              TravelNest
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-3 text-base text-slate-500">Join TravelNest today</p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full rounded-[28px] bg-white p-7 text-left shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-slate-200 sm:p-10"
          >
            <div className="space-y-6">
              <InputField
                label="Full Name"
                placeholder="John Doe"
                defaultValue={fullName}
                onChange={setFullName}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
                  </svg>
                }
              />

              <InputField
                label="Email Address"
                placeholder="your@email.com"
                type="email"
                defaultValue={email}
                onChange={setEmail}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />

              <InputField
                label="Phone Number"
                placeholder="9876543212"
                defaultValue={phoneNumber}
                onChange={setPhoneNumber}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <path d="M5.5 4.5h3l1.5 4-2 1.5c1 2.1 2.9 4 5 5l1.5-2 4 1.5v3c0 1-1 2-2 2C10.7 19.5 4.5 13.3 4.5 6.5c0-1 1-2 1-2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />

              <InputField
                label="Password"
                placeholder="••••••••"
                type="password"
                defaultValue={password}
                onChange={setPassword}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <rect x="5" y="10" width="14" height="9" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                  </svg>
                }
              />

              <InputField
                label="Confirm Password"
                placeholder="••••••••"
                type="password"
                defaultValue={confirmPassword}
                onChange={setConfirmPassword}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <rect x="5" y="10" width="14" height="9" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                    <path d="m9 14 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
            </div>

            <button
              type="submit"
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700"
            >
              Create Account
            </button>

            {errorMessage ? (
              <p className="mt-4 text-center text-sm font-medium text-red-600">
                {errorMessage}
              </p>
            ) : null}

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}