import React, { useState, useCallback } from 'react';
import PhysicsScene from './components/PhysicsScene';
import { GravityMode } from './types';
import { generateConcepts } from './services/geminiService';
import { Sparkles, ArrowDown, ArrowUp, Cloud, Zap, X } from 'lucide-react';

const App: React.FC = () => {
  const [gravityMode, setGravityMode] = useState<GravityMode>(GravityMode.NORMAL);
  const [spawnQueue, setSpawnQueue] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const handleSpawn = useCallback(async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    // Add the input text immediately
    setSpawnQueue(prev => [...prev, inputText]);
    
    // Generate related concepts
    const concepts = await generateConcepts(inputText);
    setSpawnQueue(prev => [...prev, ...concepts]);
    
    setInputText('');
    setIsLoading(false);
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSpawn();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Background Physics Layer */}
      <PhysicsScene 
        gravityMode={gravityMode} 
        newObjectsQueue={spawnQueue}
        onObjectsConsumed={() => setSpawnQueue([])}
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">
        
        {/* Header */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
              Anti<span className="text-gray-400">gravity</span>
            </h1>
            <p className="text-xs font-mono opacity-60">EXPERIMENT v1.0 // GEMINI POWERED</p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              {showInfo ? <X size={16} /> : <span className="font-bold">?</span>}
            </button>
          </div>
        </header>

        {/* Info Box */}
        {showInfo && (
           <div className="absolute top-24 left-6 max-w-xs bg-white/90 backdrop-blur border border-gray-200 p-4 rounded-lg pointer-events-auto shadow-sm">
             <p className="text-sm leading-relaxed">
               <strong>Welcome to the void.</strong> <br/>
               Type a concept below to spawn matter using the Gemini API. 
               Use the gravity controls to manipulate the environment. 
               Drag objects with your cursor.
             </p>
           </div>
        )}

        {/* Controls & Input */}
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pointer-events-auto">
          
          {/* Gravity Toggles */}
          <div className="flex justify-center gap-4">
             <button 
               onClick={() => setGravityMode(GravityMode.NORMAL)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${gravityMode === GravityMode.NORMAL ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
             >
               <ArrowDown size={16} /> <span className="text-sm font-bold tracking-wide">1.0 G</span>
             </button>
             <button 
               onClick={() => setGravityMode(GravityMode.MOON)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${gravityMode === GravityMode.MOON ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
             >
               <Cloud size={16} /> <span className="text-sm font-bold tracking-wide">0.2 G</span>
             </button>
             <button 
               onClick={() => setGravityMode(GravityMode.ZERO)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${gravityMode === GravityMode.ZERO ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
             >
               <Zap size={16} /> <span className="text-sm font-bold tracking-wide">ZERO G</span>
             </button>
             <button 
               onClick={() => setGravityMode(GravityMode.REVERSE)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${gravityMode === GravityMode.REVERSE ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
             >
               <ArrowUp size={16} /> <span className="text-sm font-bold tracking-wide">-0.5 G</span>
             </button>
          </div>

          {/* Input Area */}
          <div className="relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a concept to materialize..."
              className="w-full bg-transparent border-b-2 border-black text-3xl font-bold pb-2 focus:outline-none placeholder:text-gray-300 transition-all text-center"
              disabled={isLoading}
            />
            <button 
              onClick={handleSpawn}
              disabled={isLoading || !inputText}
              className="absolute right-0 bottom-4 text-black disabled:text-gray-200 hover:scale-110 transition-transform"
            >
              <Sparkles size={24} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="text-center pb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Powered by Matter.js & Gemini 2.5 Flash
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
