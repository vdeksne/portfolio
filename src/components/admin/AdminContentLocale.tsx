"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_ADMIN_CONTENT_LOCALE } from "@/components/admin/constants";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "admin-content-locale";

function isLocale(v: string): v is Locale {
  return v === "en" || v === "lv";
}

type AdminContentLocaleValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const AdminContentLocaleContext = createContext<AdminContentLocaleValue | null>(
  null,
);

export function AdminContentLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_ADMIN_CONTENT_LOCALE);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw && isLocale(raw)) setLocaleState(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return (
    <AdminContentLocaleContext.Provider value={value}>
      {children}
    </AdminContentLocaleContext.Provider>
  );
}

export function useAdminContentLocale(): AdminContentLocaleValue {
  const ctx = useContext(AdminContentLocaleContext);
  if (!ctx) {
    throw new Error("useAdminContentLocale must be used inside AdminContentLocaleProvider");
  }
  return ctx;
}
