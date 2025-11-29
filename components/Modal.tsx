import React, { useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, Calendar, User, Tag, ExternalLink } from 'lucide-react';

interface ModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full md:hidden backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/3 bg-slate-100 flex items-center justify-center p-0 md:p-8 overflow-y-auto custom-scrollbar">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-auto object-contain max-h-[50vh] md:max-h-full rounded-none md:rounded-lg shadow-sm"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/3 flex flex-col bg-white border-l border-slate-100">
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    <Tag size={12} /> {item.industry}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <Tag size={12} /> {item.format}
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="hidden md:block p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">關於作品</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-full text-slate-500">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">發布日期</p>
                    <p className="text-sm font-medium text-slate-900">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-full text-slate-500">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">設計師</p>
                    <p className="text-sm font-medium text-slate-900">{item.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex gap-3">
               <button className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <ExternalLink size={16} /> 查看原圖
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};