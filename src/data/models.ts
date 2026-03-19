export type BikeModel = {
  id: number
  name: string
  slug: string
  category: 'Roadster' | 'Modern Classic' | 'Adventure' | 'Sport' | 'Cruiser'
  heroImageUrl: string
  gallery: string[]
  priceFromUsd: number
  engineCc: number
  powerHp: number
  torqueNm: number
  wetWeightKg: number
  seatHeightMm: number
  description: string
  highlights: string[]
}

const img = (n: number) => `/bikes/real/bike-${String(n).padStart(2, '0')}.png`

export const BIKE_MODELS: BikeModel[] = [
  {
    id: 1,
    name: 'Street Triple 765 RS',
    slug: 'street-triple-765-rs',
    category: 'Roadster',
    heroImageUrl: img(1),
    gallery: [img(1)],
    priceFromUsd: 12995,
    engineCc: 765,
    powerHp: 128,
    torqueNm: 80,
    wetWeightKg: 188,
    seatHeightMm: 836,
    description:
      'A sharp, lightweight roadster built for everyday aggression—precision chassis, strong triple character, and premium componentry.',
    highlights: ['765cc triple', 'Track-ready brakes', 'Quickshifter', 'Sport electronics suite'],
  },
  {
    id: 2,
    name: 'Speed Triple 1200 RS',
    slug: 'speed-triple-1200-rs',
    category: 'Roadster',
    heroImageUrl: img(2),
    gallery: [img(2)],
    priceFromUsd: 18995,
    engineCc: 1160,
    powerHp: 177,
    torqueNm: 125,
    wetWeightKg: 198,
    seatHeightMm: 830,
    description:
      'A flagship naked with superbike-level performance—high output, refined electronics, and a planted yet agile stance.',
    highlights: ['1160cc triple', 'Cornering ABS', 'IMU + riding modes', 'Premium suspension'],
  },
  {
    id: 3,
    name: 'Trident 660',
    slug: 'trident-660',
    category: 'Roadster',
    heroImageUrl: img(3),
    gallery: [img(3)],
    priceFromUsd: 8495,
    engineCc: 660,
    powerHp: 80,
    torqueNm: 64,
    wetWeightKg: 189,
    seatHeightMm: 805,
    description:
      'Accessible, stylish and fun—balanced triple performance with a confident riding position for new and returning riders.',
    highlights: ['660cc triple', 'Confidence-inspiring ergonomics', 'Modern tech', 'Everyday practicality'],
  },
  {
    id: 4,
    name: 'Tiger 900 Rally Pro',
    slug: 'tiger-900-rally-pro',
    category: 'Adventure',
    heroImageUrl: img(4),
    gallery: [img(4)],
    priceFromUsd: 16995,
    engineCc: 888,
    powerHp: 108,
    torqueNm: 90,
    wetWeightKg: 222,
    seatHeightMm: 860,
    description:
      'Long-range capability with true off-road intent—balanced triple torque and features tuned for touring and terrain.',
    highlights: ['888cc triple', 'Off-road rider aids', 'Comfort touring features', 'Long-travel suspension'],
  },
  {
    id: 5,
    name: 'Tiger 1200 Rally Explorer',
    slug: 'tiger-1200-rally-explorer',
    category: 'Adventure',
    heroImageUrl: img(5),
    gallery: [img(5)],
    priceFromUsd: 22995,
    engineCc: 1160,
    powerHp: 148,
    torqueNm: 130,
    wetWeightKg: 261,
    seatHeightMm: 875,
    description:
      'An overland-ready flagship with strong torque delivery and touring comfort—made for big miles and big horizons.',
    highlights: ['1160cc triple', 'Touring comfort', 'Shaft drive', 'Advanced electronics'],
  },
  {
    id: 6,
    name: 'Bonneville T120',
    slug: 'bonneville-t120',
    category: 'Modern Classic',
    heroImageUrl: img(6),
    gallery: [img(6)],
    priceFromUsd: 12995,
    engineCc: 1200,
    powerHp: 79,
    torqueNm: 105,
    wetWeightKg: 236,
    seatHeightMm: 790,
    description:
      'Timeless silhouette with modern engineering—torquey twin character, refined ride, and premium finishes.',
    highlights: ['1200cc twin', 'Classic styling', 'Comfortable ergonomics', 'Modern safety tech'],
  },
  {
    id: 7,
    name: 'Thruxton RS',
    slug: 'thruxton-rs',
    category: 'Modern Classic',
    heroImageUrl: img(7),
    gallery: [img(7)],
    priceFromUsd: 16995,
    engineCc: 1200,
    powerHp: 103,
    torqueNm: 112,
    wetWeightKg: 197,
    seatHeightMm: 810,
    description:
      'A modern café racer—sport posture, sharp handling, and premium parts for riders who want style with bite.',
    highlights: ['Café racer ergonomics', 'Premium brakes', 'Sport handling', 'Signature modern-classic look'],
  },
  {
    id: 8,
    name: 'Scrambler 1200 XE',
    slug: 'scrambler-1200-xe',
    category: 'Modern Classic',
    heroImageUrl: img(8),
    gallery: [img(8)],
    priceFromUsd: 14995,
    engineCc: 1200,
    powerHp: 89,
    torqueNm: 110,
    wetWeightKg: 230,
    seatHeightMm: 870,
    description:
      'Scrambler attitude with genuine all-road ability—tall stance, rugged spec, and torque-rich twin performance.',
    highlights: ['All-road capability', 'Long-travel suspension', 'Rugged styling', 'Strong low-end torque'],
  },
  {
    id: 9,
    name: 'Rocket 3 R',
    slug: 'rocket-3-r',
    category: 'Cruiser',
    heroImageUrl: img(9),
    gallery: [img(9)],
    priceFromUsd: 23995,
    engineCc: 2458,
    powerHp: 165,
    torqueNm: 221,
    wetWeightKg: 291,
    seatHeightMm: 773,
    description:
      'A torque monster with premium finish—muscular presence, effortless acceleration, and confidence-inspiring stability.',
    highlights: ['2458cc triple', 'Massive torque', 'Premium finishes', 'Comfortable cruiser stance'],
  },
  {
    id: 10,
    name: 'Daytona 660',
    slug: 'daytona-660',
    category: 'Sport',
    heroImageUrl: img(10),
    gallery: [img(10)],
    priceFromUsd: 9495,
    engineCc: 660,
    powerHp: 95,
    torqueNm: 69,
    wetWeightKg: 201,
    seatHeightMm: 810,
    description:
      'Sport-focused ergonomics with everyday usability—responsive triple performance and a confident, planted feel.',
    highlights: ['Sport ergonomics', '660cc triple', 'Balanced handling', 'Modern rider aids'],
  },
]

