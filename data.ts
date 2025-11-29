import { PortfolioItem, IndustryCategory, FormatCategory } from './types';

const industries: IndustryCategory[] = [
  '美妝個清', '3C產品', '保健/食品', '母嬰用品', 
  '潮流服飾', '日用生活', '旅遊戶外', '家電'
];

const formats: FormatCategory[] = ['EDM', '組圖框', 'BN', '廣告'];

// Deterministic random generator for consistent demo data
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const generateData = (count: number): PortfolioItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    // Special case for item-0 based on user request
    if (index === 0) {
      return {
        id: `item-0`,
        title: `AHC x TUNEMAKERS 雙12感恩祭`,
        industry: '美妝個清',
        format: 'BN',
        // Using a high-quality cosmetic product image that resembles the requested banner style
        imageUrl: `https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1200&auto=format&fit=crop`,
        description: `AHC x TUNEMAKERS 渡美 12/27-12/31 雙12感恩祭。指定品滿$1212折$121，滿$1399贈AHC雙波精華10ml。數量有限，送完為止。`,
        date: `2023-12-12`,
        author: 'Designer User',
        heightClass: 'row-span-1'
      };
    }

    const industry = industries[Math.floor(seededRandom(index) * industries.length)];
    const format = formats[Math.floor(seededRandom(index + 100) * formats.length)];
    
    // Varying aspect ratios for waterfall effect
    const width = 600;
    const height = Math.floor(400 + seededRandom(index + 500) * 600); 
    
    return {
      id: `item-${index}`,
      title: `${industry} - ${format} 企劃 ${index + 1}`,
      industry,
      format,
      // Using picsum with specific ID for consistency
      imageUrl: `https://picsum.photos/seed/${index * 123}/${width}/${height}`,
      description: `這是一份關於${industry}的${format}設計作品。運用了現代化的設計語言，強調視覺衝擊力與品牌調性的結合。`,
      date: `2023-${Math.floor(seededRandom(index) * 12 + 1).toString().padStart(2, '0')}-15`,
      author: 'Designer User',
      heightClass: height > 800 ? 'row-span-2' : 'row-span-1'
    };
  });
};

export const MOCK_DATA = generateData(40);