"use client";

import Header from "@/components/Header";
import { saveStoredUserProfile, getStoredUserProfile } from "@/lib/user-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  type,
  icon,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  value?: string;
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
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-14 w-full bg-transparent pr-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState("");

  const handleUserLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userEmail.trim() || !userPassword.trim()) {
      setUserErrorMessage("Email and password are required.");
      return;
    }

    const storedProfile = getStoredUserProfile();

    saveStoredUserProfile({
      ...storedProfile,
      email: userEmail.trim(),
    });

    setUserErrorMessage("");
    router.push("/user");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7fbff_0%,#edf4ff_40%,#f3f7fb_100%)]">
      <Header />

      <main className="px-6 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto flex max-w-[480px] flex-col items-center text-center">
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

          {isAdminLogin ? (
            <>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Admin Login
              </h1>
              <p className="mt-3 text-base text-slate-500">
                Access the TravelNest dashboard
              </p>

              <form className="mt-10 w-full rounded-[28px] border border-slate-200 bg-white p-7 text-left shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:p-10">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M12 3 4 7v5c0 4.9 3.2 9.3 8 11 4.8-1.7 8-6.1 8-11V7l-8-4Z" />
                      <path d="M9 12h6" strokeLinecap="round" />
                      <path d="M12 9v6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                      Admin Portal
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Manage bookings, hotels, and customer activity.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <InputField
                    label="Admin Email"
                    placeholder="admin@travelnest.com"
                    type="email"
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  />

                  <InputField
                    label="Admin Password"
                    placeholder="••••••••"
                    type="password"
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                        <rect x="5" y="10" width="14" height="9" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                      </svg>
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700"
                >
                  Sign In as Admin
                </button>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setIsAdminLogin(false)}
                    className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                  >
                    Back to user login
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Welcome Back
              </h1>
              <p className="mt-3 text-base text-slate-500">Sign in to your account</p>

              <form
                onSubmit={handleUserLogin}
                className="mt-10 w-full rounded-[28px] bg-white p-7 text-left shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-slate-200 sm:p-10"
              >
                <div className="space-y-6">
                  <InputField
                    label="Email Address"
                    placeholder="your@email.com"
                    type="email"
                    value={userEmail}
                    onChange={setUserEmail}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  />

                  <InputField
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                    value={userPassword}
                    onChange={setUserPassword}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                        <rect x="5" y="10" width="14" height="9" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                      </svg>
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-colors hover:bg-blue-700"
                >
                  Sign In
                </button>

                {userErrorMessage ? (
                  <p className="mt-4 text-center text-sm font-medium text-red-600">
                    {userErrorMessage}
                  </p>
                ) : null}

                <p className="mt-6 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="font-medium text-blue-600 hover:text-blue-700">
                    Sign up
                  </a>
                </p>

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => setIsAdminLogin(true)}
                    className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                  >
                    Admin Login
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
}