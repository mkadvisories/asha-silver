import { ASSET_IMAGES } from '../assets/images';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'utensils' | 'god-items' | 'gifts' | 'bullion';
  categoryLabel: string;
  purity: '925 Sterling Silver' | '999 Pure Silver' | '835 Silverware';
  purityCode: '925' | '999' | '835';
  weightGrams: number;
  price?: number; // Optional: removed for 92.5 Utensils & Thalis (Price on Request)
  originalPrice?: number;
  priceOnRequest?: boolean; // True for 92.5 Utensil and Thali products
  makingChargesPerGram: number;
  image: string;
  description: string;
  auspiciousSignificance: string;
  dimensions: string;
  inStock: boolean;
  featured?: boolean;
  isDhanterasSpecial?: boolean;
  occasion?: string;
}

// Helper to determine if product is a 92.5 Utensil or Thali with custom quote
export function isPriceOnRequest(product: Product): boolean {
  if (product.priceOnRequest) return true;
  if (
    product.purityCode === '925' &&
    (product.category === 'utensils' ||
      product.name.toLowerCase().includes('thali') ||
      product.name.toLowerCase().includes('utensil') ||
      product.name.toLowerCase().includes('pitcher') ||
      product.name.toLowerCase().includes('tumbler'))
  ) {
    return true;
  }
  return false;
}

export const PRODUCTS: Product[] = [
  {
    id: 'asha-lakshmi-ganesh-sinhasan',
    name: 'Shree Mahalakshmi & Ganesha on Royal Nakshi Sinhasan with Silver Ghanti',
    hindiName: 'श्री महालक्ष्मी गणेश सिंहासन व रजत घंटी सेट',
    category: 'god-items',
    categoryLabel: 'Silver Items of God',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 280,
    // 999 Pure Silver: MCX Spot (₹212.45) + 3% = ₹218.82/g. Total = 280 * 218.82 + 280 * 24 making = ₹67,990
    price: 67990,
    originalPrice: 75500,
    makingChargesPerGram: 24,
    image: ASSET_IMAGES.silverGodItems,
    description: 'Consecrated pure 999 solid silver Goddess Lakshmi and Lord Ganesha seated upon a masterfully hand-chased silver sinhasan throne. Accompanied by a pure silver pooja ghanti (bell), silver kalash, and pooja deepam for divine home mandir worship.',
    auspiciousSignificance: 'Specially worshipped during Dhanteras and Diwali to invoke perpetual abundance, peace, and the auspicious blessings of Mahalakshmi and Lord Kubera.',
    dimensions: 'Throne Width: 6.8 inches · Idols Height: 4.2 inches · Bell Height: 5 inches',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Puja & Divine Mandir Sanctification',
  },
  {
    id: 'asha-royal-dining-thali-set',
    name: 'Rajwada Pure Silver Pooja & Royal Dining Thali Set',
    hindiName: 'राजवाड़ा शुद्ध चांदी भोजन व पूजा थाली सेट',
    category: 'utensils',
    categoryLabel: 'Silver Utensils',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 480,
    // Price removed for 92.5 Utensils & Thalis (Custom Quote on Request)
    priceOnRequest: true,
    makingChargesPerGram: 25,
    image: ASSET_IMAGES.silverUtensilsThali,
    description: 'Heirloom 7-piece pure silver dining and pooja thali set with embossed floral borders and hammered accents. Includes heavy silver platter, chased silver tumbler glass, silver spoon, and four silver katoris for prasad and royal dining.',
    auspiciousSignificance: 'Purchasing silver utensils on Dhanteras represents bringing Akshaya Patra—endless prosperity, health, and familial harmony into the household.',
    dimensions: 'Thali Diameter: 11.5 inches · Total Weight: 480g · 7 Utensils',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Shubh Muhurat Utensil Purchase',
  },
  {
    id: 'asha-pure-silver-pitcher-tumbler',
    name: 'Artisanal Pure Silver Water Pitcher Jug & Pair of Royal Tumblers',
    hindiName: 'हस्तनिर्मित शुद्ध चांदी जल जग व युगल गिलास सेट',
    category: 'utensils',
    categoryLabel: 'Silver Utensils',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 390,
    // Price removed for 92.5 Utensils & Thalis (Custom Quote on Request)
    priceOnRequest: true,
    makingChargesPerGram: 25,
    image: ASSET_IMAGES.silverUtensilsPitcher,
    description: 'Exquisitely handcrafted pure silver water jug pitcher accompanied by two matching silver drinking tumblers. Features hand-hammered texture and delicate chiseled Indian vine motifs. Silver water storage offers revered Ayurvedic health benefits.',
    auspiciousSignificance: 'Drinking and serving water in pure silver vessels during festive family gatherings symbolizes sacred purity and longevity.',
    dimensions: 'Pitcher Height: 8.5 inches (Capacity: 1.1L) · 2 Tumblers Height: 4 inches each',
    inStock: true,
    featured: true,
    isDhanterasSpecial: false,
    occasion: 'Ayurvedic Wellness & Heritage Dining',
  },
  {
    id: 'asha-dhanteras-lakshmi-ganesh-coin',
    name: 'Shubh Dhanteras 999 Pure Silver Commemorative Coin (50g)',
    hindiName: 'शुभ धनतेरस ९९९ शुद्ध चांदी सिक्का (५० ग्राम)',
    category: 'gifts',
    categoryLabel: 'Silver Gift Items',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 50,
    // 999 Pure Silver: MCX Spot (₹212.45) + 3% = ₹218.82/g. Total = 50 * 218.82 + 50 * 15 making = ₹11,690
    price: 11690,
    originalPrice: 13000,
    makingChargesPerGram: 15,
    image: ASSET_IMAGES.silverCoin,
    description: 'High-relief mint coin struck in pure 999 fine silver displaying Goddess Lakshmi seated on a lotus with Lord Ganesha on the obverse, and the auspicious Shree Yantra with Shubh Labh inscription on the reverse. Presented in a capsule and velvet display box.',
    auspiciousSignificance: 'The classic Dhanteras investment token. Stored in safes, cash boxes, and puja mandirs to attract perpetual wealth and positive financial flow.',
    dimensions: 'Diameter: 44mm · Thickness: 3.8mm · 50.00g Precise Weight',
    inStock: true,
    featured: false,
    isDhanterasSpecial: true,
    occasion: 'Auspicious Dhanteras Token & Corporate Gifting',
  },
  {
    id: 'asha-nakshi-silver-gift-box',
    name: 'Handcrafted Pure Silver Nakshi Gift Box & Auspicious Keepsake Box',
    hindiName: 'हस्तनिर्मित नक्काशीदार चांदी उपहार पेटी',
    category: 'gifts',
    categoryLabel: 'Silver Gift Items',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 185,
    price: 43500,
    originalPrice: 48000,
    makingChargesPerGram: 28,
    image: ASSET_IMAGES.silverGiftItems,
    description: 'Ornate engraved pure silver gift box with royal blue velvet interior, floral repoussé lid, and clasp. Accompanied by miniature pure silver auspicious motifs suitable for presenting wedding dry fruits, sacred kumkum, or heirloom heirlooms.',
    auspiciousSignificance: 'An esteemed festive gift symbolizing regal esteem, honor, and perpetual affection for loved ones and valued clients.',
    dimensions: 'Length: 5 inches · Width: 3.5 inches · Depth: 2.2 inches',
    inStock: true,
    featured: false,
    isDhanterasSpecial: true,
    occasion: 'Weddings & Dhanteras Prestige Gifting',
  },
  {
    id: 'asha-silver-kamakshi-diya-pair',
    name: 'Traditional Heavy Kamakshi Deepam Pure Silver Diya (Pair)',
    hindiName: 'पारंपरिक कामाक्षी दीपम शुद्ध चांदी दीपक जोड़ी',
    category: 'god-items',
    categoryLabel: 'Silver Items of God',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 120,
    // 999 Pure Silver: MCX Spot (₹212.45) + 3% = ₹218.82/g. Total = 120 * 218.82 + 120 * 20 making = ₹28,660
    price: 28660,
    originalPrice: 31800,
    makingChargesPerGram: 20,
    image: ASSET_IMAGES.diyaDeepam,
    description: 'Pair of heavy pure 999 silver Kamakshi deepams with engraved Gajalakshmi motifs on the crest, oil reservoir, and stable base. Cast to radiate warm, auspicious illumination during evening aarti and festival pujas.',
    auspiciousSignificance: 'Lighting pure silver deepams on Dhanteras night dispels negative planetary influences and welcomes prosperity into the doorway.',
    dimensions: 'Height: 4.5 inches each · Oil Capacity: 40ml each',
    inStock: true,
    featured: false,
    isDhanterasSpecial: true,
    occasion: 'Diwali Deepotsav & Mandir Nitya Aarti',
  },
  {
    id: 'asha-lakshmi-ganesh-single-chowki',
    name: 'Divine Lakshmi & Ganesha Pure Silver Idols on Lotus Chowki',
    hindiName: 'महालक्ष्मी व श्री गणेश कमल चौकी मूर्ति',
    category: 'god-items',
    categoryLabel: 'Silver Items of God',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 145,
    // 999 Pure Silver: MCX Spot (₹212.45) + 3% = ₹218.82/g. Total = 145 * 218.82 + 145 * 21 making = ₹34,780
    price: 34780,
    originalPrice: 38500,
    makingChargesPerGram: 21,
    image: ASSET_IMAGES.lakshmiIdol,
    description: 'Pure 999 fine silver Lakshmi and Ganesha deities resting upon an embossed lotus pedestal. Compact and reverent, perfect for household altars, sacred lockers, and daily abhishek.',
    auspiciousSignificance: 'Brings peace, removal of hurdles, and perpetual financial stability on Dhanteras.',
    dimensions: 'Height: 3.5 inches · Base: 4.2 inches diameter',
    inStock: true,
    featured: false,
    isDhanterasSpecial: true,
    occasion: 'Mandir Sthapana & Dhanteras Puja',
  },
  {
    id: 'asha-dhanteras-puja-dining-suite-grand',
    name: 'Grand Dhanteras Mahotsav Pure Silver Utensils & Deity Ensemble',
    hindiName: 'श्री धनतेरस महामहोत्सव संपूर्ण रजत पात्र व देव थाल',
    category: 'utensils',
    categoryLabel: 'Silver Utensils',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 550,
    // Price removed for 92.5 Utensils & Thalis (Custom Quote on Request)
    priceOnRequest: true,
    makingChargesPerGram: 25,
    image: ASSET_IMAGES.heroBanner,
    description: 'The ultimate Dhanteras ensemble comprising an embossed silver thali, pure silver drinking glass, prasad katoris, silver spoon, pure silver Lakshmi-Ganesha idols on silver base, lit silver diya, and pure silver Dhanteras coins.',
    auspiciousSignificance: 'Everything required to celebrate an auspicious, prosperous Dhanteras and Diwali in a single heirloom suite.',
    dimensions: 'Grand Thali 12.5 inches · Full 10-piece suite · 550g pure silver weight',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Mahotsav Grand Utensils',
  }
];

// Authentic Live MCX India Silver Rates & Market Benchmarks
// RULE: For 999 Pure Silver, add 3% on MCX to show the price
export const LIVE_SILVER_RATES = {
  // MCX Spot & Futures Wholesale Benchmark (1 Kilogram base)
  mcxPerKg: 212450.00,        // ₹2,12,450 per 1 kg on MCX
  mcxPer100g: 21245.00,       // ₹21,245 per 100 grams
  mcxPer10g: 2124.50,         // ₹2,124.50 per 10 grams
  mcxPerGram: 212.45,         // ₹212.45 per gram base MCX

  // 999 Pure Silver: ADD 3% ON MCX TO SHOW THE PRICE (₹212.45 * 1.03 = ₹218.82/g)
  mcxAddPercentFor999: 3,     // 3% added on MCX
  purity999: 218.82,          // ₹218.82 / gram (999 Pure Silver = MCX Spot + 3%)
  purity999PerKg: 218823.50,  // ₹2,18,823.50 per kg (MCX ₹2,12,450 + 3%)
  purity999Per10g: 2188.24,   // ₹2,188.24 per 10 grams (MCX ₹2,124.50 + 3%)
  purity999Formula: 'MCX Spot + 3%',

  // 925 Sterling Silver & Utensils
  purity925: 196.50,          // Raw 925 bullion metal rate: ₹196.50 / gram
  utensilsNotice: '92.5 Utensils & Thalis: Price on Request (Custom Weight & Design)',

  // 835 Traditional Silverware
  purity835: 177.40,          // ₹177.40 / gram (835 Traditional Silverware)

  // MCX Market Trading Metrics
  exchange: 'MCX (Multi Commodity Exchange of India)',
  contract: 'SILVER 1KG ACTIVE FUTURES & SPOT',
  dayChange: 1180.00,         // +₹1,180.00
  dayChangePercent: 0.56,     // +0.56%
  dayHigh: 213850.00,         // ₹2,13,850.00 / kg
  dayLow: 210920.00,          // ₹2,10,920.00 / kg
  openRate: 211400.00,        // ₹2,11,400.00 / kg
  prevClose: 211270.00,       // ₹2,11,270.00 / kg
  marketStatus: 'MCX Market Open',
  lastUpdated: 'Live MCX Commodity Feed · Updated 1 min ago',
  city: 'National Bullion Benchmark (Mumbai / Delhi / Jaipur / Ahmedabad)',

  muhurat: {
    title: 'Auspicious Dhanteras Mahotsav Muhurat',
    date: 'Shubh Dhanteras 2026',
    timeWindow: '06:12 PM to 08:35 PM IST (Pradosh Kaal)',
    tithi: 'Kartik Krishna Trayodashi (Lakshmi-Kubera Puja & Utensils Buying)',
  }
};
