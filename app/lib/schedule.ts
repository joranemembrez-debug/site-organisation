import { WEEK, DEFAULT_SETTINGS, type WeekSettings } from "@/app/data/week";

const MO = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];

/** Lundi de la semaine courante, à minuit. */
export function getMonday(): Date {
  const d = new Date();
  const dow = d.getDay();
  const m = new Date(d);
  m.setDate(d.getDate() - ((dow + 6) % 7));
  m.setHours(0, 0, 0, 0);
  return m;
}

/** Index du jour courant : Lundi = 0 … Dimanche = 6. */
export function todayIdx(): number {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

/** Date du i-ème jour de la semaine courante. */
export function dayDate(i: number): Date {
  const m = getMonday();
  m.setDate(m.getDate() + i);
  return m;
}

/** Clé date stable (AAAA-MM-JJ) en heure locale, pour le stockage des cases cochées. */
export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Libellé « 9 juin – 15 juin 2026 ». */
export function weekLabel(): string {
  const mon = getMonday();
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  return `${mon.getDate()} ${MO[mon.getMonth()]} – ${sun.getDate()} ${MO[sun.getMonth()]} ${sun.getFullYear()}`;
}

export type Category = "dog" | "sport" | "pilates" | "transport" | "work" | "neutral";

/** Catégorie d'un event (pour la pastille de couleur), déduite du texte. */
export function catDot(title: string, sub: string): Category {
  const t = `${title} ${sub}`.toLowerCase();
  if (/laïka|balade/.test(t)) return "dog";
  if (/pilates|yoga/.test(t)) return "pilates";
  if (/cardio|sport|elliptique|vélo|tapis|outdoor|randonnée/.test(t)) return "sport";
  if (/r91|train|gare|vouvry|prilly|à pied/.test(t)) return "transport";
  if (/travail|deep work/.test(t)) return "work";
  return "neutral";
}

/** Chips d'un jour selon la config TT/LB. */
export function getChips(i: number, cfg: WeekSettings): string[] {
  const day = WEEK[i];
  if (day.weekend) return day.chips ?? [];
  const chips: string[] = [];
  chips.push(cfg.tt[i] ? "Télétravail" : "Bureau");
  if (!cfg.tt[i]) chips.push("Salle de sport");
  chips.push("Pilates midi");
  if (cfg.lb[i]) chips.push("Laïka boulot");
  return chips;
}

export { DEFAULT_SETTINGS };
