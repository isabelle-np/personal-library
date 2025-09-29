import React from 'react';
import { Lightbulb } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const ANIMATION_DURATIONS = {
  magicalFloat: '4s',
  enchantedGlow: '3s',
  mysticalPulse: '2.5s',
  lightbulbFlicker: '6s',
  sparkle1: '4s',
  sparkle2: '3.5s',
  sparkle3: '5s',
};

export const FloatingActionButton = React.memo<FloatingActionButtonProps>(({ onClick }) => {
  return (
    <div className="fixed top-6 left-6 z-40">
      {/* Magical floating animation container */}
      <div 
        className="relative w-14 h-14"
        style={{
          animation: `magicalFloat ${ANIMATION_DURATIONS.magicalFloat} ease-in-out infinite`
        }}
      >
        {/* Enchanted glow rings */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
            animation: `enchantedGlow ${ANIMATION_DURATIONS.enchantedGlow} ease-in-out infinite alternate`
          }}
        />
        <div 
          className="absolute inset-0 rounded-full border border-amber-400/20"
          style={{
            animation: `mysticalPulse ${ANIMATION_DURATIONS.mysticalPulse} ease-in-out infinite`
          }}
        />
        
        {/* Main button */}
        <button
          onClick={onClick}
          className="relative w-full h-full rounded-full transition-all duration-500 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent group"
          style={{
            background: 'linear-gradient(145deg, #d97706 0%, #92400e 100%)',
            border: '2px solid rgba(245, 158, 11, 0.8)',
            boxShadow: '0 4px 16px rgba(180, 83, 9, 0.5), 0 0 20px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
          aria-label="Analyze personality based on book collection"
          title="AI Analysis: Discover what your books reveal about you"
        >
          {/* Lightbulb with flickering effect */}
          <Lightbulb 
            size={24} 
            className="text-amber-100 mx-auto relative z-10"
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))',
              animation: `lightbulbFlicker ${ANIMATION_DURATIONS.lightbulbFlicker} ease-in-out infinite`
            }}
          />
          
          {/* Magical sparkles */}
          <div 
            className="absolute top-1 right-2 w-1 h-1 bg-amber-200 rounded-full"
            style={{
              animation: `sparkle1 ${ANIMATION_DURATIONS.sparkle1} ease-in-out infinite`,
              boxShadow: '0 0 3px rgba(245, 158, 11, 0.8)'
            }}
          />
          <div 
            className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-amber-300 rounded-full"
            style={{
              animation: `sparkle2 ${ANIMATION_DURATIONS.sparkle2} ease-in-out infinite 1s`,
              boxShadow: '0 0 2px rgba(245, 158, 11, 0.6)'
            }}
          />
          <div 
            className="absolute top-3 left-3 w-0.5 h-0.5 bg-amber-100 rounded-full"
            style={{
              animation: `sparkle3 ${ANIMATION_DURATIONS.sparkle3} ease-in-out infinite 0.5s`,
              boxShadow: '0 0 2px rgba(245, 158, 11, 0.7)'
            }}
          />
        </button>
        
        {/* Tooltip with mystical styling */}
        <div 
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-stone-900 text-amber-100 px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-amber-700/50"
          style={{ 
            fontFamily: 'Cousine',
            fontSize: '12px',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(245, 158, 11, 0.1)'
          }}
          aria-hidden="true"
        >
          Literary Divination
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45 border-l border-t border-amber-700/50"></div>
        </div>
      </div>
      
      {/* CSS Keyframes */}
      <style>{`
        @keyframes magicalFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(0.5deg); }
          50% { transform: translateY(-6px) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        
        @keyframes enchantedGlow {
          0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          100% { transform: scale(1.2) rotate(180deg); opacity: 0.1; }
        }
        
        @keyframes mysticalPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        @keyframes lightbulbFlicker {
          0%, 100% { opacity: 1; }
          94% { opacity: 1; }
          95% { opacity: 0.8; }
          96% { opacity: 1; }
          97% { opacity: 0.9; }
          98% { opacity: 1; }
        }
        
        @keyframes sparkle1 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          20% { opacity: 1; transform: scale(1) rotate(90deg); }
          40% { opacity: 0; transform: scale(0) rotate(180deg); }
        }
        
        @keyframes sparkle2 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          30% { opacity: 1; transform: scale(1) rotate(120deg); }
          60% { opacity: 0; transform: scale(0) rotate(240deg); }
        }
        
        @keyframes sparkle3 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          25% { opacity: 1; transform: scale(1) rotate(180deg); }
          50% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';