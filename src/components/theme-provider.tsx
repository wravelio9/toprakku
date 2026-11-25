"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Preference = "system" | "light" | "dark";
type Resolved = "light" | "dark";

type ThemeContextValue = {
  preference: Preference;
  resolved: Resolved;
  toggle: () => void;
};

const THEME_STORAGE_KEY = "toprakku-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<Preference>("system");
  const [resolved, setResolved] = useState<Resolved>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: Preference = "system";

    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") saved = stored;
      } catch {
        // Abaikan penyimpanan tema yang tidak tersedia.
      }
      setPreference(saved);
      setResolved(
        document.documentElement.dataset.theme === "dark" ? "dark" : "light",
      );
    }, 0);

    const handleChange = () => {
      try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") return;
      } catch {
        // Abaikan penyimpanan tema yang tidak tersedia.
      }
      const next: Resolved = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setResolved(next);
    };

    media.addEventListener("change", handleChange);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener("change", handleChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Resolved = resolved === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setResolved(next);
    setPreference(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Abaikan penyimpanan tema yang tidak tersedia.
    }
  }, [resolved]);

  return (
    <ThemeContext.Provider value={{ preference, resolved, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme harus dipakai di dalam ThemeProvider");
  return context;
}
