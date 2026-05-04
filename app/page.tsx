"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "@/components/panel";
import AICoreChart from "@/components/aicorechart";
import AIGlobe from "@/components/aiglobe";
import AIGalaxyView from "@/components/aigalaxy";
import LoadingScreen from "@/components/loadingscreen";

export default function Home() {
  const certificateDetails: Record<string, { title: string; uni: string; issued: string; link: string }> = {
    "/cert1.png": { title: "Advanced Learning Algorithms", uni: "STANFORD / DEEPLEARNINGAI", issued: "2023", link: "https://www.coursera.org/account/accomplishments/verify/F8PFCNW7AF79" },
    "/cert 2.png": { title: "Supervised Machine Learning", uni: "STANFORD / DEEPLEARNINGAI", issued: "2023", link: "https://www.coursera.org/account/accomplishments/verify/XPLEP85DGNNU" },
    "/cert 3.png": { title: "Unsupervised Machine Learning", uni: "STANFORD / DEEPLEARNINGAI", issued: "2024", link: "https://www.coursera.org/account/accomplishments/verify/61SNZ4IM2V3S" },
    "/cert 4.png": { title: "Machine Learning", uni: "STANFORD / DEEPLEARNINGAI", issued: "2022", link: "https://www.coursera.org/account/accomplishments/specialization/44GDQWUEBNDH" },
    "/cert 5.png": { title: "Oracle AI Foundations Associate", uni: "ORACLE", issued: "2023", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2CD00FBCCDE656AEA1670C487E0B6B02B229BE03A6DBA0E9B66FD55B0A5C763F" },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("about");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>(
    null,
  );
  const [showGlobe, setShowGlobe] = useState(false);

  const [openFolders, setOpenFolders] = useState({
    bio: true,
    src: true,
    config: true,
    certifications: true, // Add this line
  });

  const toggleFolder = (folder: keyof typeof openFolders) => {
    setOpenFolders((prev) => {
      const isOpening = !prev[folder];
      if (folder === "certifications" && isOpening) setSelectedCertificate(null);
      if (folder === "bio" && isOpening) setShowGlobe(false);
      return { ...prev, [folder]: isOpening };
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0, x: -20, skewX: -10 }}
          animate={{ opacity: [0, 1, 0.5, 1], x: [20, -10, 5, 0], skewX: [10, -5, 0] }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="min-h-screen p-4 grid grid-cols-12 gap-4"
        >
          {/* Left Sidebar (The "Logs") */}
          <Panel title="Logs" className="col-span-2 h-screen">
            <div className="space-y-1 text-xs select-none font-mono">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-matrix-green transition-colors text-matrix-green/80"
                onClick={() => toggleFolder("bio")}
              >
                <span>{openFolders.bio ? "📂" : "📁"}</span> BIO
              </div>
              {openFolders.bio && (
                <>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "about" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => setActiveView("about")}
                  >
                    <span>📄</span> About
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "education" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => setActiveView("education")}
                  >
                    <span>📄</span> Education
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "work" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => setActiveView("work")}
                  >
                    <span>📄</span> Work
                  </div>
                </>
              )}

              <div
                className="flex items-center gap-1 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
                onClick={() => toggleFolder("src")}
              >
                <span>{openFolders.src ? "📂" : "📁"}</span> DETAILS
              </div>
              {openFolders.src && (
                <>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "ai-galaxy" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => setActiveView("ai-galaxy")}
                  >
                    <span>📄</span> Technical XP
                  </div>
                  <div className="flex items-center gap-1 ml-4 opacity-60">
                    <span>📄</span> logs.dat
                  </div>
                </>
              )}

              <div
                className="flex items-center gap-1 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
                onClick={() => toggleFolder("config")}
              >
                <span>{openFolders.config ? "📂" : "📁"}</span> config
              </div>
              {openFolders.config && (
                <>
                  <div className="flex items-center gap-1 ml-4 opacity-60">
                    <span>📄</span> user.cfg
                  </div>
                  <div className="flex items-center gap-1 ml-4 opacity-60">
                    <span>📄</span> net.key
                  </div>
                </>
              )}

              <div
                className="flex items-center gap-1 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
                onClick={() => toggleFolder("certifications")}
              >
                <span>{openFolders.certifications ? "📂" : "📁"}</span> Certifications
              </div>
              {openFolders.certifications && (
                <>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${selectedCertificate === "/CERT1.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setSelectedCertificate("/CERT1.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Advanced Learning Algorithms
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${selectedCertificate === "/CERT 2.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setSelectedCertificate("/CERT 2.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Supervised Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${selectedCertificate === "/CERT 3.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setSelectedCertificate("/CERT 3.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Unsupervised Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${selectedCertificate === "/CERT 4.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setSelectedCertificate("/CERT 4.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${selectedCertificate === "/CERT 5.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setSelectedCertificate("/CERT 5.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Oracle AI Foundations
                  </div>
                </>
              )}

              <p className="mt-4 border-t border-matrix-green/20 pt-2 opacity-50">
                Initializing... [OK]
              </p>
            </div>
          </Panel>

          {/* Main Content (The "Profile") */}
          <Panel
            title={
              selectedCertificate 
                ? "DATA_VISUALIZATION"
                : activeView === "about"
                ? "System_User"
                : activeView.toUpperCase().replace("-", "_")
            }
            className="col-span-7 h-screen"
          >
            {selectedCertificate ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full flex-1 min-h-0">
                  <Image
                    src={selectedCertificate}
                    alt="Certificate"
                    fill
                    className="object-contain rounded-lg border border-matrix-green/30"
                  />
                </div>
                <button 
                  onClick={() => setSelectedCertificate(null)} 
                  className="mt-6 text-matrix-green hover:text-white border border-matrix-green/40 px-4 py-1 hover:bg-matrix-green/20 transition-all font-mono text-xs"
                >
                  [EXIT_VIEWER]
                </button>
              </div>
            ) : activeView === "about" ? (
              <>
                <h1 className="text-3xl text-glow font-bold uppercase">
                  Shehan Uyanwatte
                </h1>
                <p className="mt-4">BSc IT Undergraduate</p>
              </>
            ) : activeView === "education" ? (
              <div className="space-y-6">
                <h1 className="text-3xl text-glow font-bold uppercase">
                  Education
                </h1>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      St. Peter&apos;s College - Bambalapitiya (2006 - 2019)
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      O/L - 7A 2C | A/L - 2C 1W
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      The Open University of Sri Lanka (2021 - 2022)
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      Adv. Certificate in Science
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      The Open University of Sri Lanka (2023 - Present)
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      BSc Information Technology
                    </p>
                  </div>
                </div>
              </div>
            ) : activeView === "work" ? (
              <div className="space-y-6 overflow-y-auto h-full pr-4 pb-12 scrollbar-thin scrollbar-thumb-matrix-green/20">
                <h1 className="text-3xl text-glow font-bold uppercase">
                  Work Experience
                </h1>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      Data Entry Operator - Commercial Bank (2021 Apr - 2022 Nov)
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      Contributed to operational efficiency by accurately updating
                      databases and collaborating with the Nugegoda branch team.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      Data Entry & Quality Specialist - AV Business Solutions (2022
                      - 2024)
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      Handled payment updates, resolved customer inquiries, and
                      identifies training needs via interaction analysis.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      Quality Control Supervisor - AV Business Solutions (2024 -
                      2025)
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      Supervised a QC team and assisted in the development of new
                      customer care agents.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      IT Intern - AMW Capital Leasing (2026 Feb - Present)
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      Gaining experience in IT support, system maintenance, and
                      troubleshooting within the company.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeView === "ai-galaxy" ? (
              <div className="h-full relative border border-matrix-green/10 rounded overflow-hidden bg-transparent">
                <AIGalaxyView
                  onNodeClick={(name) => {
                    setShowGlobe(true);
                    setSelectedSubsystem(name);
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 backdrop-blur-md border-l-2 border-matrix-green text-[10px] font-mono leading-relaxed pointer-events-none z-10">
                  <p className="text-matrix-green/50 mb-1">
                    // ACCESSING_VIRTUAL_NEURAL_MAP
                  </p>
                  <p>
                    Navigating semantic clusters. Click a node to initialize
                    subsystem analysis.
                  </p>
                </div>
              </div>
            ) : null}
          </Panel>

          {/* Right Sidebar (Subsystem Details) */}
          <Panel
            title={
              selectedCertificate
                ? "Certificate_View"
                : showGlobe
                  ? "Subsystem_Analysis"
                  : "User_Profile"
            }
            className="col-span-3 h-screen"
          >
            {selectedCertificate ? (
              <div className="p-4 space-y-6 font-mono">
                <div className="border-b border-matrix-green/30 pb-2">
                  <p className="text-[10px] text-matrix-green/50 mb-1">FILE_NAME</p>
                  <p className="text-xs uppercase">{selectedCertificate.split('/').pop()}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-matrix-green/50">CERTIFICATION_TITLE</p>
                    <p className="text-matrix-green font-bold uppercase">{certificateDetails[selectedCertificate]?.title}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-matrix-green/50">UNIVERSITY</p>
                    <p className="text-sm opacity-80">{certificateDetails[selectedCertificate]?.uni}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-matrix-green/50">DATE_ISSUED</p>
                    <p className="text-sm opacity-80">{certificateDetails[selectedCertificate]?.issued}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-matrix-green/50">LINK</p>
                    <a 
                      href={certificateDetails[selectedCertificate]?.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#00f2ff] visited:text-[#00f2ff] hover:underline"
                    >
                      [VIEW_CREDENTIAL]
                    </a>
                  </div>
                </div>
                <div className="mt-12 p-2 bg-matrix-green/10 border-l-2 border-matrix-green text-[10px] leading-relaxed italic">
                  Verified by node authority. Identity hash confirmed.
                </div>
              </div>
            ) : showGlobe ? (
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <AIGlobe subsystem={selectedSubsystem} />
                </div>
                <div className="mt-auto p-2 bg-matrix-green/5 border-t border-matrix-green/20 text-[10px]">
                  <p className="text-matrix-green/60 mb-1">
                    NODE_STREAMS_ACTIVE: {selectedSubsystem}
                  </p>
                  <p className="mb-2">
                    Deep-diving into specific expertise nodes. Visualizing neural
                    architecture.
                  </p>
                  <button
                    onClick={() => setShowGlobe(false)}
                    className="text-matrix-green hover:glow-sm"
                  >
                    [CLOSE_STREAM]
                  </button>
                </div>
              </div>
            ) : openFolders.bio ? (
              <div className="flex flex-col items-center gap-8 p-6 pt-12">
                {/* Profile Picture Frame */}
                <div className="relative w-40 h-40 border-2 border-matrix-green/30 p-1 bg-black/50">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-matrix-green" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-matrix-green" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-matrix-green" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-matrix-green" />

                  <div className="relative aspect-square w-full overflow-hidden contrast-125">
                    <Image
                      src="/me.png"
                      alt="Shehan Uyanwatte"
                      priority
                      sizes="160px"
                      height={200}
                      width={200}
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
                  </div>
                </div>

                <div className="text-center space-y-4 w-full">
                  <div className="py-2 border-y border-matrix-green/10">
                    <p className="text-[10px] text-matrix-green/60 uppercase tracking-[0.3em]">
                      Identity_Verified
                    </p>
                  </div>
                  <a
                    href="/CV.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f2ff] visited:text-[#00f2ff] hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]"
                  >
                    <span className="group-hover:animate-bounce">↓</span>
                    [DOWNLOAD_CV.EXE]
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center opacity-20 text-xs italic">
                Waiting for node selection...
              </div>
            )}
          </Panel>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
