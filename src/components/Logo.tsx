import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* High-quality vector SVG representation of NEXT GEN logo */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg 
          viewBox="0 0 120 70" 
          className={
            size === 'sm' ? 'w-10 h-6' : 
            size === 'lg' ? 'w-16 h-10' : 
            'w-12 h-7'
          }
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Motion lines */}
          <line x1="5" y1="26" x2="22" y2="26" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
          <line x1="2" y1="36" x2="26" y2="36" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
          <line x1="7" y1="46" x2="24" y2="46" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
          
          {/* Main Cargo Box 1 */}
          <polygon 
            points="38,15 72,15 62,48 30,48" 
            fill="#EAB308" 
          />
          {/* Inner cargo separation line */}
          <line x1="53" y1="15" x2="43" y2="48" stroke="#CA8A04" strokeWidth="2.5" />
          
          {/* Wheels */}
          <circle cx="44" cy="54" r="8" fill="#141B2B" stroke="#EAB308" strokeWidth="3" />
          <circle cx="70" cy="54" r="8" fill="#141B2B" stroke="#EAB308" strokeWidth="3" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight font-extrabold text-[#141b2b]">
          <span className={`font-chivo font-black tracking-wider ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
          }`}>
            NEXT<span className="text-[#eab308]">GEN</span>
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-bold text-[#785a00] tracking-wider mt-0.5 font-noto">
            لوجستيك المغرب
          </span>
        )}
      </div>
    </div>
  );
};
