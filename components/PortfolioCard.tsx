import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="break-inside-avoid mb-6 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >
      <div className={`
        rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 border border-slate-100
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay - Desktop */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
            flex flex-col justify-end p-4 
            transition-opacity duration-300
            md:opacity-0 md:group-hover:opacity-100
            opacity-100 // Always visible on mobile for legibility
          `}>
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  {item.industry}
                </span>
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded uppercase tracking-wider border border-white/30">
                  {item.format}
                </span>
              </div>
              <h3 className="text-white font-medium text-lg leading-tight mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs line-clamp-1">
                {item.date} · {item.author}
              </p>
            </div>
          </div>
        </div>

        {/* Meta Info (Visible below image on standard view) */}
        <div className="p-3 md:hidden">
             <h3 className="font-medium text-slate-800 text-sm mb-1">{item.title}</h3>
             <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{item.format}</span>
             </div>
        </div>
      </div>
    </div>
  );
};