export type IndustryCategory = 
  | 'All'
  | '美妝個清'
  | '3C產品'
  | '保健/食品'
  | '母嬰用品'
  | '潮流服飾'
  | '日用生活'
  | '旅遊戶外'
  | '家電';

export type FormatCategory = 
  | 'All'
  | 'EDM'
  | '組圖框'
  | 'BN'
  | '廣告';

export interface PortfolioItem {
  id: string;
  title: string;
  industry: IndustryCategory;
  format: FormatCategory;
  imageUrl: string;
  description: string;
  date: string;
  author: string;
  heightClass: string; // Helper for mock varied heights
}
