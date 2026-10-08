import bodywork from "@/assets/photos/bodywork.webp";
import brakes from "@/assets/photos/brakes.webp";
import diagnostics from "@/assets/photos/diagnostics.webp";
import engineBay from "@/assets/photos/engine-bay.webp";
import hero1400 from "@/assets/photos/hero-workshop-1400.webp";
import hero800 from "@/assets/photos/hero-workshop-800.webp";
import servicing from "@/assets/photos/servicing.webp";
import workshopLift from "@/assets/photos/workshop-lift.webp";
import type { ServiceCategory } from "./services";

/**
 * Site photography. All photos are from Unsplash (https://unsplash.com/license:
 * free for commercial use, no attribution required). Swap in the client's own
 * workshop photos by replacing the files in src/assets/photos.
 *
 * Credits:
 * - hero-workshop: Dextar Studio  https://unsplash.com/photos/XP8o9_Arwqg
 * - engine-bay:    set.sj         https://unsplash.com/photos/c2ZR3x1Zwwg
 * - servicing:     Kate Ibragimova https://unsplash.com/photos/bEGTsOCnHro
 * - brakes:        Toby Hall      https://unsplash.com/photos/ii4XEyJEm_I
 * - diagnostics:   Mehmet Talha Onuk https://unsplash.com/photos/dSosKR6g-W8
 * - bodywork:      Clarity Coat   https://unsplash.com/photos/G6sI_6B_FFY
 * - workshop-lift: SL Autowerkes  https://unsplash.com/photos/PwI7BA_J06k
 */

export interface Photo {
  src: string;
  srcSet?: string;
  alt: string;
}

export const PHOTOS = {
  hero: {
    src: hero1400,
    srcSet: `${hero800} 800w, ${hero1400} 1400w`,
    alt: "Technician working under the bonnet of a car in a bright, modern workshop",
  },
  engineBay: {
    src: engineBay,
    alt: "Technician's hands working in the engine bay of a red car",
  },
  workshopLift: {
    src: workshopLift,
    alt: "Silver car raised on a workshop lift with its bonnet open",
  },
} satisfies Record<string, Photo>;

/** One photo per service category, shown on each service page. */
export const CATEGORY_PHOTOS: Record<ServiceCategory, Photo> = {
  maintenance: {
    src: servicing,
    alt: "Technician inspecting a car engine during a service",
  },
  repairs: {
    src: brakes,
    alt: "Close-up of a brake disc and caliper on a car in the workshop",
  },
  tech: {
    src: diagnostics,
    alt: "Technician running diagnostics on a laptop connected to a car",
  },
  body: {
    src: bodywork,
    alt: "Gloved hands finishing the paintwork on a blue car",
  },
};
