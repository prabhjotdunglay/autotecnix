import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  CircleDot,
  Cog,
  Cpu,
  Disc3,
  MoveVertical,
  ShieldCheck,
  Snowflake,
  SprayCan,
  Timer,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * Service catalogue. Drives the services pages, menus, booking form,
 * pricing page and sitemap.
 *
 * TODO(client): confirm which services Autotecnix offers, guide prices,
 * durations and any equipment-dependent claims (MOT station status,
 * R1234yf air con, alignment rig, bodyshop, insurance work).
 */

export type ServiceCategory = "maintenance" | "repairs" | "tech" | "body";

export const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: "maintenance", label: "Maintenance" },
  { id: "repairs", label: "Mechanical repairs" },
  { id: "tech", label: "Diagnostics & electrics" },
  { id: "body", label: "Body & wheels" },
];

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** One line for cards and menus */
  short: string;
  category: ServiceCategory;
  icon: LucideIcon;
  /** Guide price in GBP. Leave undefined to show "Quote". */
  priceFrom?: number;
  priceNote?: string;
  duration: string;
  intro: string;
  signs: string[];
  includes: string[];
  faqs: Faq[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "mot",
    name: "MOT Testing",
    short: "Class 4 MOTs for cars and light vans, with clear advice on anything borderline.",
    category: "maintenance",
    icon: ShieldCheck,
    priceFrom: 40,
    priceNote: "cars · vans from £50",
    duration: "45–60 min",
    intro:
      "Your MOT is a safety check, not an upsell. We test to DVSA standards, show you exactly what we found, and explain any advisories in plain English before you decide on repairs.",
    signs: [
      "Your MOT runs out within the next month",
      "You've just bought a car and want peace of mind",
      "A warning light is on (many are an automatic fail)",
      "Lights, wipers or horn aren't working properly",
      "Your tyres look close to the 1.6 mm legal limit",
    ],
    includes: [
      "Full DVSA test of brakes, steering, suspension and emissions",
      "Lights, tyres, wheels, seatbelts and visibility checks",
      "Result logged with DVSA instantly",
      "Pass, advisory and fail items explained clearly",
      "Fixed repair quote before any work",
    ],
    faqs: [
      {
        q: "How early can I MOT my car?",
        a: "You can get an MOT up to a month (minus a day) before it runs out and keep the same renewal date.",
      },
      {
        q: "What happens if my car fails?",
        a: "We walk you through every failure item and give you a fixed quote. If the car stays with us for repairs and is retested within 10 working days, the partial retest is free.",
      },
      {
        q: "Can I drive my car if it fails?",
        a: "Only if your current MOT is still valid and there are no 'dangerous' defects. We'll tell you straight away if it isn't safe to drive.",
      },
    ],
    seoTitle: "MOT Testing in Leytonstone, E11",
    seoDescription:
      "Book an MOT in Leytonstone, East London with Autotecnix. Class 4 MOTs for cars and light vans, honest explanations and a clear repair quote before any work.",
  },
  {
    slug: "servicing",
    name: "Car Servicing",
    short:
      "Interim, full and major services to manufacturer schedule, with your history kept up to date.",
    category: "maintenance",
    icon: Wrench,
    priceFrom: 139,
    priceNote: "interim service",
    duration: "2–4 hours",
    intro:
      "We service to your manufacturer's schedule using the correct oil grade and parts of matching quality, so your warranty stays valid and your service history stays complete.",
    signs: [
      "Your service indicator or spanner light is on",
      "It's been 12 months or 10,000 miles since your last service",
      "The oil is dark, low or overdue for a change",
      "Fuel economy has dropped",
      "You're selling and want a complete history",
    ],
    includes: [
      "Engine oil and filter to manufacturer specification",
      "Multi-point inspection of brakes, tyres, steering and suspension",
      "Fluid levels checked and topped up",
      "Service light reset and service history updated",
      "Photos of anything we recommend, sent to your phone",
    ],
    faqs: [
      {
        q: "Will an independent service affect my warranty?",
        a: "No. Under UK competition rules (the Motor Vehicle Block Exemption Order) you can use an independent garage without affecting your manufacturer warranty, as long as the work follows the schedule and uses parts of matching quality.",
      },
      {
        q: "What's the difference between interim, full and major?",
        a: "An interim service is a six-monthly oil change and safety check. A full service is the yearly service with filters and a wider inspection. A major service adds items such as spark plugs, brake fluid and coolant, depending on your manufacturer's schedule.",
      },
      {
        q: "Can I combine my service with an MOT?",
        a: "Yes. Book both together and we'll do them in a single visit.",
      },
    ],
    seoTitle: "Car Servicing in Leytonstone, E11",
    seoDescription:
      "Manufacturer-schedule car servicing in Leytonstone, East London. Interim, full and major services with the right oil and parts, keeping your warranty and history intact.",
  },
  {
    slug: "diagnostics-coding",
    name: "Diagnostics & Coding",
    short:
      "Dealer-level fault finding, live data and module coding for warning lights and electrical gremlins.",
    category: "tech",
    icon: Cpu,
    priceFrom: 60,
    duration: "From 1 hour",
    intro:
      "A fault code tells you where to start, not what to replace. We combine dealer-level diagnostic software with live data and proper testing to pinpoint the real cause, then code and program modules so everything works as it should.",
    signs: [
      "Engine, ABS, airbag or other warning light on",
      "Limp mode, loss of power or rough running",
      "Intermittent electrical faults",
      "New parts that need coding or adaptation",
      "Features or retrofits you'd like enabled",
    ],
    includes: [
      "Full-system scan across every module",
      "Live data and component testing",
      "A clear explanation of the cause, not just the code",
      "Coding, programming and adaptations",
      "Fixed quote for the repair",
    ],
    faqs: [
      {
        q: "Why not just get the code read for free?",
        a: "A basic code reader shows a symptom. Finding the cause takes testing, which is why proper diagnosis usually saves money on parts you didn't need.",
      },
      {
        q: "What is coding?",
        a: "Modern cars run on dozens of computer modules. When parts are replaced or features are added, those modules often need coding or programming so they work together correctly.",
      },
      {
        q: "Do you work on all makes?",
        a: "Yes. Our diagnostic platforms cover all major manufacturers, from everyday hatchbacks to premium German brands.",
      },
    ],
    seoTitle: "Car Diagnostics & Coding in Leytonstone, E11",
    seoDescription:
      "Dealer-level car diagnostics, live data, coding and programming in Leytonstone, East London. Warning lights, limp mode and electrical faults found and fixed properly.",
  },
  {
    slug: "brakes",
    name: "Brakes",
    short:
      "Pads, discs, calipers and brake fluid, fitted to spec and road-tested before you collect.",
    category: "repairs",
    icon: Disc3,
    priceFrom: 120,
    priceNote: "pads, per axle",
    duration: "1–2 hours",
    intro:
      "Squealing, grinding, a soft pedal or a pull to one side means your brakes need attention. We inspect the whole system, replace only what's needed, and road-test every job.",
    signs: [
      "Squealing or grinding when you brake",
      "Vibration through the pedal or steering wheel",
      "A soft or spongy pedal",
      "The car pulls to one side under braking",
      "Brake warning light on",
    ],
    includes: [
      "Full brake inspection, front and rear",
      "Quality pads and discs fitted to manufacturer spec",
      "Caliper service and slider lubrication",
      "Brake fluid condition test",
      "Road test before handover",
    ],
    faqs: [
      {
        q: "How often should brake fluid be changed?",
        a: "Most manufacturers recommend every two years, because brake fluid absorbs moisture over time and becomes less effective.",
      },
      {
        q: "Do I need new discs as well as pads?",
        a: "Not always. We measure disc thickness and check for scoring or warping, and only recommend discs if they're out of spec.",
      },
    ],
    seoTitle: "Brake Repairs in Leytonstone, E11",
    seoDescription:
      "Brake pads, discs, calipers and fluid changes in Leytonstone, East London. Full inspection, quality parts and a road test on every brake job.",
  },
  {
    slug: "tyres-alignment",
    name: "Tyres & Alignment",
    short: "Supply and fit, puncture repairs, balancing and alignment to stop uneven wear.",
    category: "maintenance",
    icon: CircleDot,
    priceFrom: 50,
    priceNote: "wheel alignment",
    duration: "30–60 min",
    intro:
      "Your tyres are the only part of the car touching the road. We supply and fit budget to premium brands, repair punctures where it's safe to, and align your wheels so the tyres wear evenly.",
    signs: [
      "Tread close to the 1.6 mm legal limit",
      "Steering wheel off-centre or the car pulling",
      "Uneven or feathered tyre wear",
      "Vibration at motorway speeds",
      "Slow puncture or tyre pressure warning",
    ],
    includes: [
      "Tyre supply and fitting",
      "Wheel balancing",
      "Puncture repairs to BS AU 159 where safe",
      "Wheel alignment check and adjustment",
      "Tyre pressure sensor (TPMS) checks",
    ],
    faqs: [
      {
        q: "What's the legal tread depth?",
        a: "1.6 mm across the central three-quarters of the tread, around the whole tyre. We recommend replacing at 3 mm, because braking distances increase quickly below that.",
      },
      {
        q: "Do I need an alignment after new tyres?",
        a: "It's worth it if you've noticed uneven wear, hit a kerb or pothole, or had suspension work. Misalignment can wear out new tyres fast.",
      },
    ],
    seoTitle: "Tyres & Wheel Alignment in Leytonstone, E11",
    seoDescription:
      "Tyre fitting, puncture repairs, balancing and wheel alignment in Leytonstone, East London. Budget to premium tyres for all makes and models.",
  },
  {
    slug: "air-conditioning",
    name: "Air Con Service",
    short: "Regas, leak testing and antibacterial treatment for cold air and clear windows.",
    category: "maintenance",
    icon: Snowflake,
    priceFrom: 70,
    priceNote: "regas",
    duration: "About 1 hour",
    intro:
      "Air con systems lose refrigerant naturally over time. We recover, vacuum-test and recharge your system to the exact manufacturer quantity, and track down the leak if there's more to it.",
    signs: [
      "The air isn't as cold as it used to be",
      "A musty smell from the vents",
      "Windows are slow to demist",
      "Air con only works some of the time",
      "Hissing or clicking from behind the dashboard",
    ],
    includes: [
      "Refrigerant recovery and vacuum test",
      "Recharge to manufacturer quantity",
      "R134a and R1234yf systems",
      "UV leak detection",
      "Antibacterial cabin treatment",
    ],
    faqs: [
      {
        q: "How often should air con be regassed?",
        a: "Typically every two years. Systems can lose around 10–15% of their refrigerant a year even without a fault.",
      },
      {
        q: "Why does my air con smell?",
        a: "Bacteria and mould build up on the evaporator. An antibacterial treatment and a new cabin filter usually sort it.",
      },
    ],
    seoTitle: "Car Air Con Regas & Repair in Leytonstone, E11",
    seoDescription:
      "Car air conditioning regas, leak detection and antibacterial treatment in Leytonstone, East London. R134a and R1234yf systems.",
  },
  {
    slug: "clutch-gearbox",
    name: "Clutch & Gearbox",
    short:
      "Clutch kits, dual-mass flywheels and gearbox repairs, including automatic and DSG servicing.",
    category: "repairs",
    icon: Cog,
    duration: "Usually same day",
    intro:
      "A slipping clutch or a stubborn gearbox won't fix itself. We find the cause first (sometimes it's the hydraulics, not the clutch), then quote clearly for the repair.",
    signs: [
      "Revs rise without the car speeding up",
      "Grinding or difficulty selecting gears",
      "Juddering when pulling away",
      "A high, heavy or spongy clutch pedal",
      "Jerky or delayed automatic gear changes",
    ],
    includes: [
      "Clutch kits and dual-mass flywheels",
      "Hydraulic and slave cylinder repairs",
      "Manual gearbox repairs",
      "Automatic and DSG fluid services",
      "Adaptations reset after the work",
    ],
    faqs: [
      {
        q: "How long does a clutch last?",
        a: "It depends heavily on driving style, but many last 60,000 to 100,000 miles. Stop-start city driving wears them faster.",
      },
      {
        q: "Does an automatic gearbox need servicing?",
        a: "Many do, even ones described as 'sealed for life'. Fresh fluid at the right interval can prevent very expensive failures.",
      },
    ],
    seoTitle: "Clutch & Gearbox Repairs in Leytonstone, E11",
    seoDescription:
      "Clutch replacement, dual-mass flywheels, gearbox repairs and DSG/automatic servicing in Leytonstone, East London. Diagnosed first, quoted clearly.",
  },
  {
    slug: "timing-belts-chains",
    name: "Timing Belts & Chains",
    short:
      "Cambelt and chain replacement on schedule, with water pumps and tensioners done in one go.",
    category: "repairs",
    icon: Timer,
    duration: "Half to full day",
    intro:
      "If a timing belt snaps, the damage to the engine can be catastrophic. We replace belts and chains at manufacturer intervals and fit a complete kit, so nothing is left to fail.",
    signs: [
      "Your car is at or near its cambelt interval",
      "There's no record of the belt ever being changed",
      "A rattle from the engine on start-up",
      "Ticking or whining from the front of the engine",
      "Oil or coolant leaks near the timing cover",
    ],
    includes: [
      "Complete kit: belt, tensioners and idlers",
      "Water pump replacement where it's belt-driven",
      "Timing chain and guide replacement",
      "Timing checked and set to spec",
      "Service record updated",
    ],
    faqs: [
      {
        q: "When should my cambelt be changed?",
        a: "Every manufacturer sets its own interval by mileage and age, often between 5 and 10 years. Give us your reg and we'll look yours up.",
      },
      {
        q: "Do timing chains need replacing?",
        a: "They're designed to last longer, but stretched chains and worn guides are common on some engines. A rattle on start-up is the classic warning sign.",
      },
    ],
    seoTitle: "Timing Belt & Chain Replacement in Leytonstone, E11",
    seoDescription:
      "Cambelt and timing chain replacement in Leytonstone, East London with complete kits, water pumps and timing set to manufacturer spec.",
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering",
    short: "Shocks, springs, arms and bushes, plus steering faults diagnosed and fixed.",
    category: "repairs",
    icon: MoveVertical,
    duration: "2–4 hours",
    intro:
      "Potholes are hard on suspension. We find the knock, clunk or wander, replace worn parts with quality components and finish with an alignment check.",
    signs: [
      "Knocking or clunking over bumps",
      "The car bounces or floats after a bump",
      "Steering feels vague or heavy",
      "Uneven tyre wear",
      "One corner sits lower than the others",
    ],
    includes: [
      "Shock absorbers and springs",
      "Wishbones, drop links and bushes",
      "Track rod ends and steering racks",
      "Power steering diagnostics",
      "Alignment check after repairs",
    ],
    faqs: [
      {
        q: "Is a broken coil spring an MOT fail?",
        a: "Yes. A broken or cracked spring is a major defect, so it's worth fixing as soon as you notice it.",
      },
    ],
    seoTitle: "Suspension & Steering Repairs in Leytonstone, E11",
    seoDescription:
      "Suspension and steering repairs in Leytonstone, East London: shocks, springs, bushes, track rod ends and steering racks, finished with an alignment check.",
  },
  {
    slug: "exhaust-dpf",
    name: "Exhaust, DPF & Emissions",
    short: "Exhausts, catalytic converters, DPF and EGR faults, with emissions back in spec.",
    category: "repairs",
    icon: Wind,
    duration: "1–3 hours",
    intro:
      "From a blowing exhaust to a blocked DPF, we diagnose emissions faults properly, regenerating or cleaning where we can and replacing only when there's no better option.",
    signs: [
      "DPF or engine warning light on",
      "A loud or rasping exhaust",
      "Smoke from the tailpipe",
      "Loss of power or limp mode",
      "An MOT fail on emissions",
    ],
    includes: [
      "Exhaust repairs and replacement",
      "Catalytic converter diagnosis",
      "DPF forced regeneration and cleaning",
      "EGR valve cleaning and replacement",
      "Emissions check after repair",
    ],
    faqs: [
      {
        q: "Why does my DPF keep blocking?",
        a: "Lots of short journeys stop the filter getting hot enough to burn off soot. We'll also check for an underlying fault, such as a sensor or EGR issue.",
      },
      {
        q: "Can I just have the DPF removed?",
        a: "No. It's illegal to remove a DPF from a car that was built with one, and it's an MOT fail.",
      },
    ],
    seoTitle: "Exhaust, DPF & EGR Repairs in Leytonstone, E11",
    seoDescription:
      "Exhaust, catalytic converter, DPF and EGR repairs in Leytonstone, East London. Emissions faults diagnosed properly and fixed to pass.",
  },
  {
    slug: "auto-electrics",
    name: "Auto Electrics & Accessories",
    short:
      "Batteries, alternators, starters and wiring, plus dash cams, trackers and alarms fitted.",
    category: "tech",
    icon: Zap,
    duration: "From 1 hour",
    intro:
      "Electrical faults can be the hardest to trace. We test methodically from battery to module, and install dash cams, trackers and alarms with clean, hidden wiring.",
    signs: [
      "Slow starting or a battery that keeps going flat",
      "Battery or charging warning light on",
      "Lights, windows or locks acting up",
      "Something draining the battery overnight",
      "You'd like a dash cam, tracker or alarm fitted",
    ],
    includes: [
      "Battery testing and replacement, with coding where needed",
      "Alternator and starter motor repairs",
      "Wiring and parasitic drain diagnosis",
      "Lighting and central locking repairs",
      "Dash cam, tracker and alarm installation",
    ],
    faqs: [
      {
        q: "Why does my new battery need coding?",
        a: "Many modern cars adjust charging to the battery's age and type. Without coding, a new battery can be overcharged and fail early.",
      },
    ],
    seoTitle: "Auto Electrician, Dash Cams & Trackers in Leytonstone, E11",
    seoDescription:
      "Auto electrical repairs in Leytonstone, East London: batteries, alternators, starters and wiring faults, plus professional dash cam, tracker and alarm installs.",
  },
  {
    slug: "bodywork-accident-repair",
    name: "Bodywork & Accident Repair",
    short: "Scuffs, dents and panel repairs through to full accident repairs and resprays.",
    category: "body",
    icon: SprayCan,
    duration: "Quoted on inspection",
    intro:
      "Whether it's a car park scuff or a full accident repair, we match your paint precisely and repair to a high standard. We can also help you deal with your insurer.",
    signs: [
      "Scratches, scuffs or stone chips",
      "Dents and dings in panels",
      "Bumper damage",
      "Rust bubbling through the paint",
      "Accident damage that needs repairing",
    ],
    includes: [
      "Paint matched to your colour code",
      "Dent and panel repairs",
      "Bumper and plastic repairs",
      "Partial and full resprays",
      "Help with insurance claims",
    ],
    faqs: [
      {
        q: "Can I use you for an insurance repair?",
        a: "In most cases, yes. You can usually choose your own repairer, so talk to us before you agree to your insurer's choice.",
      },
      {
        q: "How do you match my paint?",
        a: "We start from your car's paint code, then blend the colour to allow for fading, so the repair disappears.",
      },
    ],
    seoTitle: "Bodywork, Paint & Accident Repair in Leytonstone, E11",
    seoDescription:
      "Car bodywork, dent and scratch repairs, resprays and accident repairs in Leytonstone, East London, with precise paint matching and help with insurance claims.",
  },
  {
    slug: "alloy-wheel-refurbishment",
    name: "Alloy Wheel Refurbishment",
    short: "Kerb damage repaired, with diamond-cut, painted or custom finishes.",
    category: "body",
    icon: Aperture,
    priceFrom: 80,
    priceNote: "per wheel",
    duration: "Same day to 2 days",
    intro:
      "Scuffed alloys let an otherwise great car down. We strip, repair and refinish wheels in factory-style diamond-cut or painted finishes, or something custom if you fancy a change.",
    signs: [
      "Kerb rash on the rims",
      "Corrosion or peeling lacquer",
      "Chips and scratches",
      "A buckled wheel or slow air loss",
      "You'd like a new colour",
    ],
    includes: [
      "Kerb damage and corrosion repair",
      "Diamond-cut and painted finishes",
      "Custom colours",
      "Tyre removal, refit and balancing",
      "Lacquer for long-lasting protection",
    ],
    faqs: [
      {
        q: "What is diamond cutting?",
        a: "A lathe skims a fine layer off the face of the wheel to leave a bright machined finish, which is then lacquered. It's how many factory two-tone wheels are made.",
      },
    ],
    seoTitle: "Alloy Wheel Refurbishment in Leytonstone, E11",
    seoDescription:
      "Alloy wheel refurbishment in Leytonstone, East London: kerb damage repairs, diamond-cut and painted finishes, and custom colours.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesIn(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

export function formatPrice(service: Pick<Service, "priceFrom">): string {
  return service.priceFrom ? `From £${service.priceFrom}` : "Quote";
}
