import { HOURS, type OpeningHours } from "@/config/site";

const TZ = "Europe/London";
export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current weekday and minutes-since-midnight in London, regardless of the visitor's timezone. */
export function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: SHORT_DAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function hoursForDay(day: number): OpeningHours | undefined {
  return HOURS.find((h) => h.days.includes(day));
}

export function isOpenDay(day: number): boolean {
  return Boolean(hoursForDay(day)?.open);
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "18:30" → "6:30pm", "09:00" → "9am" */
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

export function hoursLabel(h: OpeningHours): string {
  return h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Closed";
}

export interface OpenState {
  open: boolean;
  label: string;
}

export function getOpenState(date = new Date()): OpenState {
  const { day, minutes } = londonNow(date);
  const today = hoursForDay(day);
  if (today?.open && today.close) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { open: true, label: `Open now · until ${formatTime(today.close)}` };
    }
    if (minutes < toMinutes(today.open)) {
      return { open: false, label: `Closed · opens ${formatTime(today.open)} today` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const h = hoursForDay(next);
    if (h?.open) {
      const when = i === 1 ? "tomorrow" : DAY_NAMES[next];
      return { open: false, label: `Closed · opens ${when} ${formatTime(h.open)}` };
    }
  }
  return { open: false, label: "Closed" };
}

/** Short summary for the SSR fallback, e.g. "Mon–Sat". */
export function openDaysSummary(): string {
  const days = HOURS.filter((h) => h.open).flatMap((h) => h.days);
  if (days.length === 6 && !days.includes(0)) return "Open Mon – Sat";
  if (days.length === 5 && !days.includes(0) && !days.includes(6)) return "Open Mon – Fri";
  return "Opening hours";
}
