import React from 'react';
import { Button } from './Button';
import { IndustryCategory, FormatCategory } from '../types';
import { Filter, Layers, LayoutGrid, RotateCcw, Search } from 'lucide-react';

interface FilterBarProps {
  selectedIndustry: IndustryCategory;
  selectedFormat: FormatCategory;
  searchQuery: string;
  onSelectIndustry: (val: IndustryCategory) => void;
  onSelectFormat: (val: FormatCategory) => void;
  onSearchChange: (val: string) => void;
  onReset: () => void;
}

const INDUSTRY_OPTIONS: IndustryCategory[] = [
  'All', '美妝個清', '3C產品', '保健/食品', '母嬰用品', 
  '潮流服飾', '日用生活', '旅遊戶外', '家電'
];

const FORMAT_OPTIONS: FormatCategory[] = [
  'All', 'EDM', '組圖框', 'BN', '廣告'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedIndustry,
  selectedFormat,
  searchQuery,
  onSelectIndustry,
  onSelectFormat,
  onSearchChange,
  onReset
}) => {
  return (
    <div className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto md:max-w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜尋作品內容、標題、產業..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-shadow"
          />
        </div>

        <div className="h-px bg-slate-200 w-full" />

        {/* Top Row: Title + Reset (Mobile) */}
        <div className="flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
            <Filter size={16} /> 篩選條件
          </span>
          {(selectedIndustry !== 'All' || selectedFormat !== 'All' || searchQuery !== '') && (
            <button 
              onClick={onReset}
              className="text-xs text-indigo-600 font-medium flex items-center gap-1"
            >
              <RotateCcw size={12} /> 清除全部
            </button>
          )}
        </div>

        {/* Industry Filters */}
        <div className="flex items-start gap-4">
          <div className="hidden md:flex items-center gap-2 text-slate-400 mt-2 shrink-0">
            <Layers size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">產業</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full mask-linear-fade">
            {INDUSTRY_OPTIONS.map((industry) => (
              <Button
                key={industry}
                variant="secondary"
                active={selectedIndustry === industry}
                onClick={() => onSelectIndustry(industry)}
              >
                {industry === 'All' ? '全部產業' : industry}
              </Button>
            ))}
          </div>
        </div>

        {/* Format Filters */}
        <div className="flex items-start gap-4">
          <div className="hidden md:flex items-center gap-2 text-slate-400 mt-2 shrink-0">
            <LayoutGrid size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">形式</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full">
            {FORMAT_OPTIONS.map((format) => (
              <Button
                key={format}
                variant="secondary"
                active={selectedFormat === format}
                onClick={() => onSelectFormat(format)}
              >
                {format === 'All' ? '全部形式' : format}
              </Button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};