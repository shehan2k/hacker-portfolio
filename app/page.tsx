"use client";

import { useState } from "react";
import Panel from "@/components/panel";
import AICoreChart from "@/components/aicorechart";
import AIGlobe from "@/components/aiglobe";
import AIGalaxyView from "@/components/aigalaxy";

export default function Home() {
  const [activeView, setActiveView] = useState("profile");
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>(null);
  const [showGlobe, setShowGlobe] = useState(false);
  const [openFolders, setOpenFolders] = useState({
    src: true,
    config: true
  });

  const toggleFolder = (folder: "src" | "config") => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <main className="min-h-screen p-4 grid grid-cols-12 gap-4">
  {/* Left Sidebar (The "Logs") */}
  <Panel title="Logs" className="col-span-2 h-screen">
    <div className="space-y-1 text-xs select-none font-mono">
      <div 
        className={`flex items-center gap-1 cursor-pointer hover:text-matrix-green transition-colors ${activeView === 'profile' ? 'text-matrix-green' : ''}`}
        onClick={() => setActiveView("profile")}
      >
        <span>📂</span> root
      </div>
      
      <div 
        className="flex items-center gap-1 ml-4 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
        onClick={() => toggleFolder("src")}
      >
        <span>{openFolders.src ? "📂" : "📁"}</span> src
      </div>
      {openFolders.src && (
        <>
          <div 
            className={`flex items-center gap-1 ml-8 cursor-pointer hover:text-matrix-green transition-colors ${activeView === 'ai-galaxy' ? 'text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]' : 'opacity-60'}`}
            onClick={() => setActiveView("ai-galaxy")}
          >
            <span>📄</span> AI Galaxy
          </div>
          <div className="flex items-center gap-1 ml-8 opacity-60"><span>📄</span> logs.dat</div>
        </>
      )}

      <div 
        className="flex items-center gap-1 ml-4 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
        onClick={() => toggleFolder("config")}
      >
        <span>{openFolders.config ? "📂" : "📁"}</span> config
      </div>
      {openFolders.config && (
        <>
          <div className="flex items-center gap-1 ml-8 opacity-60"><span>📄</span> user.cfg</div>
          <div className="flex items-center gap-1 ml-8 opacity-60"><span>📄</span> net.key</div>
        </>
      )}

      <p className="mt-4 border-t border-matrix-green/20 pt-2 opacity-50">Initializing... [OK]</p>
    </div>
  </Panel>

  {/* Main Content (The "Profile") */}
  <Panel title={activeView === "profile" ? "System_User" : activeView.toUpperCase().replace("-", "_")} className="col-span-7 h-screen">
    {activeView === "profile" ? (
      <>
        <h1 className="text-3xl text-glow font-bold uppercase">Shehan Uyanwatte</h1>
        <p className="mt-4">BSc IT Undergraduate</p>
      </>
    ) : activeView === "ai-galaxy" ? (
      <div className="h-full relative border border-matrix-green/10 rounded overflow-hidden bg-transparent">
        <AIGalaxyView onNodeClick={(name) => {
          setShowGlobe(true);
          setSelectedSubsystem(name);
        }} />
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 backdrop-blur-md border-l-2 border-matrix-green text-[10px] font-mono leading-relaxed pointer-events-none z-10">
          <p className="text-matrix-green/50 mb-1">// ACCESSING_VIRTUAL_NEURAL_MAP</p>
          <p>Navigating semantic clusters. Click a node to initialize subsystem analysis.</p>
        </div>
      </div>
    ) : null}
  </Panel>

  {/* Right Sidebar (Subsystem Details) */}
  <Panel title="Subsystem_Analysis" className="col-span-3 h-screen">
    {showGlobe ? (
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <AIGlobe subsystem={selectedSubsystem} />
        </div>
        <div className="mt-auto p-2 bg-matrix-green/5 border-t border-matrix-green/20 text-[10px]">
          <p className="text-matrix-green/60 mb-1">NODE_STREAMS_ACTIVE: {selectedSubsystem}</p>
          <p className="mb-2">Deep-diving into specific expertise nodes. Visualizing neural architecture.</p>
          <button onClick={() => setShowGlobe(false)} className="text-matrix-green hover:glow-sm">[CLOSE_STREAM]</button>
        </div>
      </div>
    ) : (
      <div className="h-full flex items-center justify-center opacity-20 text-xs italic">
        Waiting for node selection...
      </div>
    )}
  </Panel>

</main>
  );
}