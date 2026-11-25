import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import fr from "./fr.json";

export type Language = "en" | "fr";

const STORAGE_KEY = "tmu-dao-language";
const DICTIONARY: Record<string, string> = fr as Record<string, string>;

/** Collapse rendered whitespace so multi-line captions match their dictionary key. */
function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Drop emoji variation selectors so "⚠" and "⚠️" resolve to the same key. */
function stripVariationSelectors(value: string): string {
  return value.replace(/\uFE0F/g, "");
}

function lookup(value: string): string | undefined {
  const direct = DICTIONARY[value];
  if (direct !== undefined) return direct;

  const collapsed = normalize(value);
  const collapsedHit = DICTIONARY[collapsed];
  if (collapsedHit !== undefined) return collapsedHit;

  // Tolerate a warning sign written with or without its variation selector.
  const stripped = stripVariationSelectors(collapsed);
  if (stripped !== collapsed) {
    const strippedHit = DICTIONARY[stripped];
    if (strippedHit !== undefined) return strippedHit;
  }

  // Tolerate a trailing colon in either direction.
  if (collapsed.endsWith(":")) {
    const withoutColon = collapsed.slice(0, -1).trimEnd();
    const hit = DICTIONARY[withoutColon];
    if (hit !== undefined) return hit;
  } else {
    const withColon = `${collapsed}:`;
    const hit = DICTIONARY[withColon];
    if (hit !== undefined) return hit;
  }

  return undefined;
}

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** French value for an English string when one exists, otherwise the original. */
  t: (english: string) => string;
  /** Translate only the fixed words of a string, leaving numbers, amounts and percentages untouched. */
  tMixed: (english: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the in-memory choice still applies.
    }
  }, []);

  const t = useCallback(
    (english: string) => {
      if (language === "en") return english;
      return lookup(english) ?? english;
    },
    [language],
  );

  const tMixed = useCallback(
    (english: string) => {
      if (language === "en") return english;

      const whole = lookup(english);
      if (whole !== undefined) return whole;

      // Split on numbers, amounts and percentages so only the fixed words are translated.
      const parts = english.split(
        /(\$?\d[\d.,]*(?:\s?%|\s?[KMB])?|\d+(?:\.\d+)?%?)/g,
      );
      return parts
        .map((part) => {
          if (part === "") return part;
          if (/^\$?\d/.test(part)) return part;
          if (!/[A-Za-z]/.test(part)) return part;
          return lookup(part) ?? part;
        })
        .join("");
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t, tMixed }),
    [language, setLanguage, t, tMixed],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
