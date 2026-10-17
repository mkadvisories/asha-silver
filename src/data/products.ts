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
  price: number;
  originalPrice?: number;
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
    price: 32400,
    originalPrice: 35900,
    makingChargesPerGram: 18,
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
    price: 52800,
    originalPrice: 58000,
    makingChargesPerGram: 20,
    image: ASSET_IMAGES.silverUtensilsThali,
    description: 'Heirloom 7-piece pure silver dining and pooja thali set with embossed floral borders and hammered accents. Includes heavy silver platter, chased silver tumbler glass, silver spoon, and four silver katoris for prasad and royal dining.',
    auspiciousSignificance: 'Purchasing new silver utensils on Dhanteras is the most auspicious tradition to bring health, vitality, and prosperity to the family.',
    dimensions: 'Thali Diameter: 12.0 inches · Tumbler Height: 3.8 inches · Weight: 480g',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Utensils Buying & Sacred Feasting',
  },
  {
    id: 'asha-dhanteras-gift-box-suite',
    name: 'Dhanteras Royal Silver Gifting Box Suite with Pure 999 Coins & Photo Frame',
    hindiName: 'धनतेरस उपहार रजत पेटी, शुद्ध सिक्के व फ्रेम',
    category: 'gifts',
    categoryLabel: 'Silver Gift Items',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 160,
    price: 18600,
    originalPrice: 20500,
    makingChargesPerGram: 16,
    image: ASSET_IMAGES.silverGiftItems,
    description: 'Opulent presentation gift box in royal blue velvet featuring three pure 999 silver Dhanteras commemorative coins with Lakshmi-Ganesh embossing, an ornate filigree silver deity photo frame, a lucky silver Vastu tortoise, and hand-carved silver keepsake box.',
    auspiciousSignificance: 'The pre-eminent Dhanteras gift for cherished family, business associates, and wedding milestones symbolizing lasting goodwill and fortune.',
    dimensions: 'Box: 9.5 × 7.5 inches · 3x Coins (50g, 20g, 10g) + Frame + Tortoise',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Gifting & Auspicious Blessing',
  },
  {
    id: 'asha-silver-pitcher-tumbler-set',
    name: 'Handcrafted Pure Silver Water Jug Pitcher & Tumblers Set',
    hindiName: 'हस्तनिर्मित चांदी जल कलश व गिलास सेट',
    category: 'utensils',
    categoryLabel: 'Silver Utensils',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 410,
    price: 45900,
    originalPrice: 49800,
    makingChargesPerGram: 22,
    image: ASSET_IMAGES.silverUtensilsPitcher,
    description: 'Artisanal pure silver jug pitcher with hinged lid and sculpted handle, paired with two floral carved silver drinking glasses. Silver water storage naturally purifies water and delivers ancient Ayurvedic wellness benefits.',
    auspiciousSignificance: 'Serving holy water and hosting guests with pure silver drinkware invokes divine hospitality and good health.',
    dimensions: 'Pitcher Height: 8.5 inches (Capacity: 950ml) · 2x Tumblers 4 inches',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Utensils & Ayurvedic Wellness Tableware',
  },
  {
    id: 'asha-peacock-diya-deepam',
    name: 'Mayur Handcrafted Pure Silver Pooja Diya Deepam',
    hindiName: 'मयूर शुद्ध चांदी पूजा दीपक',
    category: 'god-items',
    categoryLabel: 'Silver Items of God',
    purity: '925 Sterling Silver',
    purityCode: '925',
    weightGrams: 110,
    price: 12800,
    originalPrice: 14200,
    makingChargesPerGram: 24,
    image: ASSET_IMAGES.diyaDeepam,
    description: 'Sculpted pure silver oil deepam adorned with an ornate royal peacock crest with feather engraving and stepped lotus oil basin. Designed for steady flame burn and lifelong pooja sanctity in your home temple.',
    auspiciousSignificance: 'Lighting a consecrated silver diya on Dhanteras evening dispels ignorance and negativity, welcoming Mahalakshmi into the sanctum.',
    dimensions: 'Height: 4.8 inches · Base Width: 3.5 inches',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Deep Daan & Mandir Puja',
  },
  {
    id: 'asha-silver-coin-50g-999',
    name: 'Auspicious Dhanteras Lakshmi-Ganesh 999 Pure Silver Coin (50g)',
    hindiName: 'शुभ धनतेरस महालक्ष्मी चांदी सिक्का (50 ग्राम)',
    category: 'gifts',
    categoryLabel: 'Silver Gift Items',
    purity: '999 Pure Silver',
    purityCode: '999',
    weightGrams: 50,
    price: 5250,
    originalPrice: 5600,
    makingChargesPerGram: 10,
    image: ASSET_IMAGES.silverCoin,
    description: 'Pure 99.9% fine bullion coin with deep-relief engraving of Shree Ganesha & Goddess Lakshmi, presented in a royal crimson velvet commemorative box with purity certificate.',
    auspiciousSignificance: 'The classic Dhanteras investment token. Tradition holds that silver coin purchases on Dhanteras multiply wealth thirteen-fold.',
    dimensions: 'Diameter: 42mm · Thickness: 3.2mm',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Savings & Sacred Family Gifting',
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
    price: 16800,
    originalPrice: 18500,
    makingChargesPerGram: 19,
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
    price: 61500,
    originalPrice: 68000,
    makingChargesPerGram: 21,
    image: ASSET_IMAGES.heroBanner,
    description: 'The ultimate Dhanteras ensemble comprising an embossed silver thali, pure silver drinking glass, prasad katoris, silver spoon, pure silver Lakshmi-Ganesha idols on silver base, lit silver diya, and pure silver Dhanteras coins.',
    auspiciousSignificance: 'Everything required to celebrate an auspicious, prosperous Dhanteras and Diwali in a single heirloom suite.',
    dimensions: 'Grand Thali 12.5 inches · Full 10-piece suite',
    inStock: true,
    featured: true,
    isDhanterasSpecial: true,
    occasion: 'Dhanteras Mahotsav Grand Utensils',
  }
];

export const LIVE_SILVER_RATES = {
  purity999: 98.50, // Rs per gram 999 Fine Silver
  purity925: 91.20, // Rs per gram 925 Sterling Silver
  purity835: 82.40, // Rs per gram 835 Utensil Silver
  lastUpdated: 'Live Benchmark (MCX Spot Rate)',
  city: 'Mumbai / Delhi / Jaipur Bullion Benchmark',
  muhurat: {
    title: 'Auspicious Dhanteras Mahotsav Muhurat',
    date: 'Shubh Dhanteras 2026',
    timeWindow: '06:12 PM to 08:35 PM IST (Pradosh Kaal)',
    tithi: 'Kartik Krishna Trayodashi (Lakshmi-Kubera Puja & Utensils Buying)',
  }
};
