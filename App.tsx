
import React, { useState, useMemo, useEffect } from 'react';
import { Section, CircuitState } from './types';
import { speakText } from './services/speechService';
import { WaterSimulation } from './components/WaterSimulation';
import { ShortCircuitVisual } from './components/ShortCircuitVisual';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Theory);
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Ohm's Law Calculation: I = U / R
  const current = useMemo(() => {
    return voltage / resistance;
  }, [voltage, resistance]);

  const handleSpeech = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    await speakText(text);
    setIsSpeaking(false);
  };

  const NavButton = ({ section, icon, label }: { section: Section, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveSection(section)}
      className={`flex flex-col items-center p-3 rounded-xl transition-all ${
        activeSection === section ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-blue-50'
      }`}
    >
      <i className={`fa-solid ${icon} text-xl mb-1`}></i>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="bg-yellow-400 p-2 rounded-lg text-white">
              <i className="fa-solid fa-lightbulb"></i>
            </span>
            Ohms Lag
          </h1>
          <p className="text-slate-500 font-medium">Lär dig hur elektricitet fungerar!</p>
        </div>
        <div className="flex gap-2">
          <NavButton section={Section.Theory} icon="fa-book-open" label="Teori" />
          <NavButton section={Section.Lab} icon="fa-flask" label="Labbet" />
          <NavButton section={Section.Functions} icon="fa-gears" label="Funktion" />
          <NavButton section={Section.Protection} icon="fa-shield-halved" label="Skydd" />
          <NavButton section={Section.Summary} icon="fa-check-double" label="Koll" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100 overflow-hidden relative">
        {activeSection === Section.Theory && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-slate-800">1. De tre huvudpersonerna</h2>
              <button 
                onClick={() => handleSpeech("Låt oss träffa de tre huvudpersonerna i elens värld: Spänning, Ström och Resistans.")}
                className="text-blue-500 hover:scale-110 transition-transform"
              >
                <i className={`fa-solid ${isSpeaking ? 'fa-volume-high animate-pulse' : 'fa-volume-low'} text-2xl`}></i>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CharacterCard 
                title="Spänning (U)" 
                unit="Volt (V)" 
                desc="Tänk på detta som trycket. Det är kraften som 'knuffar' fram elektriciteten."
                color="blue"
                icon="fa-bolt"
                onSpeak={handleSpeech}
              />
              <CharacterCard 
                title="Ström (I)" 
                unit="Ampere (A)" 
                desc="Detta är själva flödet. Hur mycket elektricitet som faktiskt rinner genom sladden."
                color="emerald"
                icon="fa-wave-square"
                onSpeak={handleSpeech}
              />
              <CharacterCard 
                title="Resistans (R)" 
                unit="Ohm (Ω)" 
                desc="Detta är motståndet. Det som gör det svårt för strömmen att komma fram."
                color="rose"
                icon="fa-filter"
                onSpeak={handleSpeech}
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-800 mb-2">Liknelsen med vatten</h3>
              <p className="text-slate-600 leading-relaxed">
                Tänk dig en hög vattenreservoar. Ju högre upp den är, desto mer <strong>tryck (spänning)</strong> blir det. 
                När vattnet rinner ner i ett rör ser vi <strong>flödet (ström)</strong>. Om vi sätter in ett smalt filter i röret blir det ett <strong>motstånd (resistans)</strong>.
              </p>
            </div>
          </div>
        )}

        {activeSection === Section.Lab && (
          <div className="h-full flex flex-col space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">2. Det Interaktiva Labbet</h2>
              <button 
                onClick={() => handleSpeech("Här kan du testa Ohms lag själv! Dra i reglagen för att ändra spänningen och resistansen. Se hur strömmen ändras när du trycker på vattnet eller gör röret smalare.")}
                className="text-blue-500"
              >
                <i className="fa-solid fa-volume-low text-2xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
              <div className="space-y-8">
                <div className="p-4 bg-slate-50 rounded-xl space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-sm">
                      <label className="text-blue-600">SPÄNNING (TRYCK)</label>
                      <span>{voltage} V</span>
                    </div>
                    <input 
                      type="range" min="1" max="24" step="1" 
                      value={voltage} onChange={(e) => setVoltage(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-sm">
                      <label className="text-rose-600">RESISTANS (MOTSTÅND)</label>
                      <span>{resistance} Ω</span>
                    </div>
                    <input 
                      type="range" min="10" max="1000" step="10" 
                      value={resistance} onChange={(e) => setResistance(Number(e.target.value))}
                      className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-8 border-4 border-dashed border-slate-100 rounded-3xl bg-white">
                   <div className="text-center">
                     <div className="text-4xl font-black text-slate-800 mb-2">U = I × R</div>
                     <p className="text-slate-500 font-medium">Ohms Lag</p>
                   </div>
                   <div className="mt-8 grid grid-cols-3 gap-4 w-full text-center">
                     <div className="p-2">
                       <div className="text-xl font-bold text-blue-600">{voltage}</div>
                       <div className="text-[10px] uppercase text-slate-400">Volt</div>
                     </div>
                     <div className="p-2 border-x border-slate-100">
                       <div className="text-xl font-bold text-emerald-600">{current.toFixed(3)}</div>
                       <div className="text-[10px] uppercase text-slate-400">Ampere</div>
                     </div>
                     <div className="p-2">
                       <div className="text-xl font-bold text-rose-600">{resistance}</div>
                       <div className="text-[10px] uppercase text-slate-400">Ohm</div>
                     </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col">
                <WaterSimulation voltage={voltage} resistance={resistance} current={current} />
              </div>
            </div>
          </div>
        )}

        {activeSection === Section.Functions && (
          <div className="space-y-8 animate-in slide-in-from-left duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">3. Fler funktioner för motstånd</h2>
              <button 
                onClick={() => handleSpeech("Motstånd gör mycket mer än bara stoppar el! Det kan dela på spänningen, skapa värme i din brödrost eller hjälpa dig att höja volymen på radion.")}
                className="text-blue-500"
              >
                <i className="fa-solid fa-volume-low text-2xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voltage Division */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <i className="fa-solid fa-scissors"></i>
                  </div>
                  <h3 className="font-bold text-blue-900">Dela på spänningen</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Om batteriet ger 12V men din lampa bara tål 3V, kan vi använda motstånd för att "dela upp" trycket. Motståndet tar hand om resten av volten så att lampan inte går sönder.
                </p>
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase">
                  <i className="fa-solid fa-water"></i> Dela trycket
                </div>
              </div>

              {/* Energy Conversion */}
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fa-solid fa-sun"></i>
                  </div>
                  <h3 className="font-bold text-orange-900">Skapa värme & ljus</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Många apparater använder motstånd för att skapa värme med flit. I en brödrost eller hårtork blir motståndet så varmt att det glöder och värmer upp luften.
                </p>
                <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase">
                  <i className="fa-solid fa-fire"></i> Från el till värme
                </div>
              </div>

              {/* Control */}
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <i className="fa-solid fa-sliders"></i>
                  </div>
                  <h3 className="font-bold text-indigo-900">Styra ljud & ljus</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Volymknappen på en radio är egentligen ett variabelt motstånd. När du vrider den ändras resistansen, vilket ändrar strömmen till högtalaren.
                </p>
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase">
                  <i className="fa-solid fa-volume-high"></i> Volymkontroll
                </div>
              </div>

              {/* Sensors */}
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <h3 className="font-bold text-emerald-900">Känna av omgivningen</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Många sensorer, som de som känner av om det är mörkt eller varmt, fungerar genom att deras motstånd ändras beroende på ljus eller temperatur.
                </p>
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
                  <i className="fa-solid fa-microchip"></i> Smarta sensorer
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === Section.Protection && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">4. Skydd och Säkerhet</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-600 p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10">
                  <i className="fa-solid fa-triangle-exclamation text-6xl opacity-40 mb-4"></i>
                  <h3 className="text-xl font-bold mb-2">Kortslutning!</h3>
                  <p className="text-red-100 text-sm leading-relaxed mb-6">
                    Om resistansen blir nästan noll blir strömmen jättehög jättesnabbt. Det blir så varmt att det kan börja brinna. Tur att vi har säkringar som räddar oss!
                  </p>
                  <button 
                    onClick={() => handleSpeech("Varning! Om motståndet blir noll rusar strömmen iväg och det blir jättevarmt. Det kallas kortslutning och är farligt.")}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap inline-flex items-center gap-2 shadow-lg"
                  >
                    <i className="fa-solid fa-play"></i> Hör varningen
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              </div>
              
              <ShortCircuitVisual />
            </div>
          </div>
        )}

        {activeSection === Section.Summary && (
          <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-bottom duration-500">
             <div className="text-center space-y-2">
               <h2 className="text-3xl font-black text-slate-800">Sammanfattning</h2>
               <p className="text-slate-500 font-medium">Kommer du ihåg de tre huvudpersonerna?</p>
             </div>

             <div className="w-full max-w-md space-y-4">
               <QuizItem 
                question="Vad kallas kraften som 'knuffar' på elektriciteten?" 
                answer="Spänning (U)" 
                icon="fa-bolt" 
               />
               <QuizItem 
                question="Vad mäter man i Ampere?" 
                answer="Ström (I)" 
                icon="fa-wave-square" 
               />
               <QuizItem 
                question="Vad fungerar som ett filter och gör det svårt för elen?" 
                answer="Resistans (R)" 
                icon="fa-filter" 
               />
             </div>

             <button 
              onClick={() => handleSpeech("Sammanfattningsvis: Spänningen knuffar, strömmen åker, och resistansen bestämmer hur svårt det är. Utan resistansen skulle vi inte ha någon kontroll över elen och inga varma mackor i brödrosten!")}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
             >
               Lyssna på Läraren <i className="fa-solid fa-volume-high ml-2"></i>
             </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-slate-400 text-sm font-medium">
        Skapad för NO-lektioner årskurs 7 • © 2024 El-Labbet
      </footer>
    </div>
  );
};

interface CharacterCardProps {
  title: string;
  unit: string;
  desc: string;
  color: string;
  icon: string;
  onSpeak: (text: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ title, unit, desc, color, icon, onSpeak }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  const iconBg: Record<string, string> = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    rose: 'bg-rose-600'
  };

  return (
    <div className={`p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${colorClasses[color]}`}>
      <div className={`w-10 h-10 ${iconBg[color]} text-white rounded-lg flex items-center justify-center mb-4`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      <p className="text-[10px] font-black uppercase tracking-tighter opacity-60 mb-3">{unit}</p>
      <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
      <button 
        onClick={() => onSpeak(`${title} mäts i ${unit}. ${desc}`)}
        className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
      >
        Läs upp <i className="fa-solid fa-play"></i>
      </button>
    </div>
  );
};

const QuizItem = ({ question, answer, icon }: { question: string, answer: string, icon: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer group" onClick={() => setShow(!show)}>
      <div className="flex justify-between items-center">
        <span className="text-slate-700 font-bold text-sm">{question}</span>
        <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${show ? 'rotate-180' : ''}`}></i>
      </div>
      {show && (
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-3 animate-in slide-in-from-top-2">
          <i className={`fa-solid ${icon} text-blue-500`}></i>
          <span className="font-black text-blue-600">{answer}</span>
        </div>
      )}
    </div>
  );
};

export default App;
