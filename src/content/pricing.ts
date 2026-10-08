/**
 * Service plans for the pricing page and homepage.
 * TODO(client): confirm plan prices, intervals and inclusions.
 */

export interface ServicePlan {
  id: "interim" | "full" | "major";
  name: string;
  price: number;
  interval: string;
  /** One line for compact cards */
  short: string;
  featured?: boolean;
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "interim",
    name: "Interim",
    price: 139,
    interval: "Every 6 months or 6,000 miles",
    short: "Oil change and safety check",
  },
  {
    id: "full",
    name: "Full",
    price: 219,
    interval: "Every 12 months or 12,000 miles",
    short: "The yearly service most cars need",
    featured: true,
  },
  {
    id: "major",
    name: "Major",
    price: 329,
    interval: "Every 24 months or 24,000 miles",
    short: "Full service plus longer-interval items",
  },
];

/** Which plan includes which item. */
export const PLAN_ITEMS: { label: string; plans: ServicePlan["id"][] }[] = [
  { label: "Engine oil and filter change", plans: ["interim", "full", "major"] },
  { label: "Fluid levels checked and topped up", plans: ["interim", "full", "major"] },
  { label: "Brakes, tyres and lights inspection", plans: ["interim", "full", "major"] },
  { label: "Service light reset", plans: ["interim", "full", "major"] },
  { label: "Air filter replacement", plans: ["full", "major"] },
  { label: "Cabin (pollen) filter replacement", plans: ["full", "major"] },
  { label: "Coolant strength test", plans: ["full", "major"] },
  { label: "Full steering and suspension inspection", plans: ["full", "major"] },
  { label: "Spark plugs (petrol) or fuel filter (diesel)", plans: ["major"] },
  { label: "Brake fluid replacement", plans: ["major"] },
];
