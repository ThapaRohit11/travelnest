export type UserProfile = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

const USER_PROFILE_KEY = "travelnest:user-profile";

const fallbackProfile: UserProfile = {
  fullName: "Rohit Thapa",
  email: "thapa@gmail.com",
  phoneNumber: "9876543212",
};

export function getStoredUserProfile(): UserProfile {
  if (typeof window === "undefined") {
    return fallbackProfile;
  }

  const storedProfile = window.localStorage.getItem(USER_PROFILE_KEY);

  if (!storedProfile) {
    return fallbackProfile;
  }

  try {
    const parsedProfile = JSON.parse(storedProfile) as Partial<UserProfile>;

    return {
      fullName: parsedProfile.fullName?.trim() || fallbackProfile.fullName,
      email: parsedProfile.email?.trim() || fallbackProfile.email,
      phoneNumber:
        parsedProfile.phoneNumber?.trim() || fallbackProfile.phoneNumber,
    };
  } catch {
    return fallbackProfile;
  }
}

export function saveStoredUserProfile(profile: UserProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export function clearStoredUserProfile() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_PROFILE_KEY);
}

export function profileIsComplete(profile: UserProfile) {
  return Boolean(
    profile.fullName.trim() && profile.email.trim() && profile.phoneNumber.trim()
  );
}