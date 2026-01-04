
import React, { useState, useEffect } from 'react';

export const ShortCircuitVisual: React.FC = () => {
  const [status, setStatus] = useState<'normal' | 'shorted' | 'blown'>('normal');

  const triggerShort = () => {
    setStatus('shorted');
    setTimeout(() => {
      setStatus('blown');
    }, 1500);
  };

  const reset = () => {
    setStatus('normal');
  };

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] border-4 border-slate-800 shadow-inner">
      <h4 className="absolute top-4 left-6 text-slate-400 text-[10px] font-black tracking-widest uppercase">Simulering: Kortslutning</h4>
      
      <svg width="240" height="120" viewBox="0 0 240 120" className="relative z-10">
        {/* Main Circuit Path */}
        <path 
          d="M 20 60 L 60 60 M 180 60 L 220 60" 
          stroke="#475569" strokeWidth="4" fill="none" 
        />
        
        {/* Fuse (The weak link) */}
        <line 
          x1="60" y1="60" x2="100" y2="60" 
          stroke={status === 'blown' ? '#ef4444' : '#fbbf24'} 
          strokeWidth="4" 
          strokeDasharray={status === 'blown' ? "2 2" : "0"}
          className="transition-colors duration-300"
        />
        <rect x="55" y="50" width="50" height="20" fill="none" stroke="#475569" strokeWidth="1" rx="2" />

        {/* Load (The Lamp) */}
        <circle cx="140" cy="60" r="15" fill="none" stroke="#475569" strokeWidth="2" />
        <path d="M 130 50 L 150 70 M 130 70 L 150 50" stroke="#475569" strokeWidth="2" />
        
        {/* Flow Animation */}
        {status !== 'blown' && (
          <g>
            <circle r="3" fill="#60a5fa">
              <animateMotion 
                path="M 20 60 L 220 60" 
                dur={status === 'shorted' ? '0.1s' : '1s'} 
                repeatCount="indefinite" 
              />
            </circle>
            <circle r="3" fill="#60a5fa" opacity="0.6">
              <animateMotion 
                path="M 20 60 L 220 60" 
                dur={status === 'shorted' ? '0.1s' : '1s'} 
                begin="0.3s"
                repeatCount="indefinite" 
              />
            </circle>
          </g>
        )}

        {/* The Shorting Wire */}
        {status === 'shorted' && (
          <path 
            d="M 110 60 Q 140 100 170 60" 
            stroke="#ef4444" strokeWidth="6" fill="none"
            className="animate-pulse"
          />
        )}

        {/* Flash/Sparks when it blows */}
        {status === 'shorted' && (
          <g className="animate-ping">
            <circle cx="80" cy="60" r="10" fill="#fbbf24" opacity="0.5" />
          </g>
        )}
      </svg>

      <div className="mt-6 flex flex-col items-center gap-4 z-20">
        {status === 'normal' && (
          <button 
            onClick={triggerShort}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs shadow-lg transition-transform active:scale-95"
          >
            SKAPA KORTSLUTNING ⚡
          </button>
        )}
        
        {status === 'shorted' && (
          <div className="text-red-400 font-black text-sm animate-bounce">
            STRÖMMEN RUSAR! 🔥
          </div>
        )}

        {status === 'blown' && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-white font-black text-lg flex items-center gap-2">
              <i className="fa-solid fa-burst text-yellow-400"></i>
              SÄKRINGEN GICK!
            </div>
            <button 
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-bold text-xs"
            >
              BYT SÄKRING (ÅTERSTÄLL)
            </button>
          </div>
        )}
      </div>

      {/* Glow effect for status */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${status === 'shorted' ? 'opacity-20 bg-red-500' : 'opacity-0'}`}></div>
    </div>
  );
};
