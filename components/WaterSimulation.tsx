
import React from 'react';

interface WaterSimulationProps {
  voltage: number;
  resistance: number;
  current: number;
}

export const WaterSimulation: React.FC<WaterSimulationProps> = ({ voltage, resistance, current }) => {
  // Map values to visual attributes
  const tankHeight = 40 + (voltage / 24) * 100; // Tank height relative to voltage
  const pipeWidth = Math.max(5, 40 - (resistance / 200) * 35); // Narrower pipe = higher resistance
  const flowSpeed = Math.min(2, current / 0.5); // Animation speed
  const bubbleCount = Math.floor(current * 50);

  return (
    <div className="relative w-full h-96 bg-blue-50 rounded-2xl border-4 border-blue-100 overflow-hidden flex flex-col items-center justify-end p-8">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

      {/* The Water Tank (Voltage) */}
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <div className="w-24 h-40 border-4 border-slate-700 bg-white relative rounded-b-lg flex flex-col justify-end overflow-hidden">
          <div 
            className="bg-blue-400 w-full transition-all duration-500 ease-in-out" 
            style={{ height: `${(voltage / 24) * 100}%` }}
          />
          {/* Pressure Arrows */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <i className="fa-solid fa-arrow-down text-blue-800 opacity-50 text-2xl animate-bounce"></i>
          </div>
        </div>
        <span className="text-xs font-bold mt-2 text-slate-600">SPÄNNING (U)</span>
        <span className="text-sm font-bold text-blue-600">{voltage}V</span>
      </div>

      {/* The Pipe (Resistance) */}
      <svg width="100%" height="200" viewBox="0 0 400 200" className="relative z-10">
        {/* Pipe Shape */}
        <path 
          d="M 50 100 L 150 100 Q 200 100 200 130 L 200 200" 
          fill="none" 
          stroke="#334155" 
          strokeWidth="60" 
          strokeLinecap="round"
        />
        <path 
          d="M 50 100 L 150 100 Q 200 100 200 130 L 200 200" 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="52" 
          strokeLinecap="round"
        />

        {/* The Restriction (Resistance Visual) */}
        <rect 
          x="160" y="80" 
          width="10" height="40" 
          fill="#ef4444" 
          className="transition-all duration-300"
          style={{ transform: `scaleY(${resistance / 100})`, transformOrigin: 'center' }}
        />
        <rect 
          x="180" y="80" 
          width="10" height="40" 
          fill="#ef4444" 
          className="transition-all duration-300"
          style={{ transform: `scaleY(${resistance / 100})`, transformOrigin: 'center' }}
        />

        {/* Water Flow Line */}
        <path 
          d="M 50 100 L 150 100 Q 200 100 200 130 L 200 200" 
          fill="none" 
          stroke="#60a5fa" 
          strokeWidth={pipeWidth} 
          strokeDasharray="10 10"
          className="water-animation"
          style={{ animationDuration: `${2.5 / (flowSpeed || 0.1)}s` }}
        />
      </svg>

      {/* Output (Current) */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 flex items-center space-x-2">
           <i className="fa-solid fa-droplet text-blue-500 animate-pulse"></i>
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-slate-400">STRÖM (I)</span>
             <span className="text-xl font-black text-blue-700">{current.toFixed(2)}A</span>
           </div>
        </div>
      </div>

      {/* Lab Labels */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded text-xs text-slate-500 italic">
        "Mer tryck = Mer flöde. Mer motstånd = Mindre flöde."
      </div>
    </div>
  );
};
