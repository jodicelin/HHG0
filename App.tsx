import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_DATA } from './data';
import { FilterBar } from './components/FilterBar';
import { PortfolioCard } from './components/PortfolioCard';
import { Modal } from './components/Modal';
import { AdminPanel } from './components/AdminPanel';
import { IndustryCategory, FormatCategory, PortfolioItem } from './types';
import { Hexagon, Sparkles, Settings } from 'lucide-react';

// Updated storage key to v2 to force refresh of data structure for the new image update
const STORAGE_KEY = 'hhg-portfolio-data-v2';

const App: React.FC = () => {
  // State initialization with LocalStorage check
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : MOCK_DATA;
    } catch (e) {
      console.error("Failed to load data", e);
      return MOCK_DATA;
    }
  });

  const [view, setView] = useState<'gallery' | 'admin'>('gallery');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCategory>('All');
  const [selectedFormat, setSelectedFormat] = useState<FormatCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Persistence effect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const handleUpdateItem = (updatedItem: PortfolioItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    // If the item currently open in modal is updated, update that too
    if (selectedItem?.id === updatedItem.id) {
      setSelectedItem(updatedItem);
    }
  };

  const filteredData = useMemo(() => {
    return items.filter(item => {
      // 1. Category Filter
      const matchIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
      const matchFormat = selectedFormat === 'All' || item.format === selectedFormat;
      
      // 2. Search Filter (Search all text fields)
      const q = searchQuery.toLowerCase();
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.format.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.date.includes(q);

      return matchIndustry && matchFormat && matchSearch;
    });
  }, [items, selectedIndustry, selectedFormat, searchQuery]);

  const handleReset = () => {
    setSelectedIndustry('All');
    setSelectedFormat('All');
    setSearchQuery('');
  };

  // --- Admin View ---
  if (view === 'admin') {
    return (
      <AdminPanel 
        items={items} 
        onUpdateItem={handleUpdateItem} 
        onExit={() => setView('gallery')} 
      />
    );
  }

  // --- Gallery View ---
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Hexagon size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              HHG<span className="text-indigo-600">視覺靈感庫</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('admin')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Settings size={16} />
              管理後台
            </button>
            <button className="hidden sm:block bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
              聯絡設計
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Filter Section */}
      <main className="flex-1 flex flex-col">
        <div className="bg-white pb-2">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                HHG 視覺靈感庫
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                匯集各產業創意表現，從美妝到3C，從廣告到EDM，提供無限設計靈感。
              </p>
           </div>
           
           <FilterBar 
            selectedIndustry={selectedIndustry}
            selectedFormat={selectedFormat}
            searchQuery={searchQuery}
            onSelectIndustry={setSelectedIndustry}
            onSelectFormat={setSelectedFormat}
            onSearchChange={setSearchQuery}
            onReset={handleReset}
          />
        </div>

        {/* Masonry Grid */}
        <div className="bg-slate-50 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Empty State */}
            {filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <Sparkles size={48} className="mb-4 text-slate-300" />
                <p className="text-lg font-medium text-slate-600">沒有找到符合條件的作品</p>
                <p className="text-sm">請嘗試調整搜尋或篩選條件</p>
                <button 
                  onClick={handleReset}
                  className="mt-6 text-indigo-600 font-medium hover:underline"
                >
                  清除所有篩選
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredData.map((item) => (
                <PortfolioCard 
                  key={item.id} 
                  item={item} 
                  onClick={setSelectedItem} 
                />
              ))}
            </div>

            {/* Footer Count */}
            {filteredData.length > 0 && (
              <div className="mt-12 text-center text-sm text-slate-400">
                顯示 {filteredData.length} 筆作品
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2023 HHG Design Studio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default App;