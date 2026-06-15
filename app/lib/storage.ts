import { DEFAULT_SETTINGS, type WeekSettings } from "@/app/data/week";

// Couche de persistance — Phase 1 : localStorage.
// En Phase 2, on remplacera ces fonctions par des appels Supabase
// sans toucher aux composants.

const SETTINGS_KEY = "weekSettings";

export function loadSettings(): WeekSettings {
  if (typeof window === "undefined") return structuredClone(DEFAULT_SETTINGS);
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    return raw ? (JSON.parse(raw) as WeekSettings) : structuredClone(DEFAULT_SETTINGS);
  } catch {
    return structuredClone(DEFAULT_SETTINGS);
  }
}

export function saveSettings(cfg: WeekSettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(cfg));
}

export function loadDone(dateKey: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(`done_${dateKey}`);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function saveDone(dateKey: string, done: Set<string>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`done_${dateKey}`, JSON.stringify([...done]));
}
