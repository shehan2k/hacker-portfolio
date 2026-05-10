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
  const certificateDetails: Record<
    string,
    { title: string; uni: string; issued: string; link: string }
  > = {
    "/CERT1.png": {
      title: "Advanced Learning Algorithms",
      uni: "STANFORD / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/F8PFCNW7AF79",
    },
    "/CERT 2.png": {
      title: "Supervised Machine Learning",
      uni: "STANFORD / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/XPLEP85DGNNU",
    },
    "/CERT 3.png": {
      title: "Unsupervised Machine Learning",
      uni: "STANFORD / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/61SNZ4IM2V3S",
    },
    "/CERT 4.png": {
      title: "Machine Learning",
      uni: "STANFORD / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/specialization/44GDQWUEBNDH",
    },
    "/CERT 5.png": {
      title: "Oracle AI Foundations Associate",
      uni: "ORACLE",
      issued: "2025",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2CD00FBCCDE656AEA1670C487E0B6B02B229BE03A6DBA0E9B66FD55B0A5C763F",
    },
  };

  const projectsData: Record<
    string,
    { title: string; images: [string, string]; description: string }
  > = {
    "project-1": {
      title: "NEURO_SYMBOLIC_AI_MATH_SOLVER",
      images: ["/performance.png", "/graph.png"],
      description:
        "Designed and implemented a Neuro-Symbolic AI Math Solver using Python, combining a Llama 3.2:1B model for natural language processing and Sympy for symbolic mathematics to solve complex mathematical problems. It uses the speed and efficiency of the 1B parameter model to interpret and process Natural Language, while leveraging Sympy's powerful symbolic computation capabilities to provide accurate solutions."
      },
    "project-2": {
      title: "APPAREL_MARKETPLACE",
      images: ["/app1.png", "/app2.png"],
      description:
        "Authored a comprehensive business case and designed high-fidelity Figma prototypes to define user journeys and stakeholders' requirements.\n\nArchitected a cross-platform marketplace using React Native (Expo) and TypeScript, integrating Firebase for streamlined authentication and account management. \n\nEngineered a dual-role user system using Firestore (NoSQL) to manage permissions and secure data access for both vendors and customers. Enhanced security by implementing biometric authentication (FaceID/Fingerprint) utilizing Expo’s native modules. \n\nDeveloped comprehensive vendor management features, including real-time product inventory updates and account information updates.",
    },
    "project-3": {
      title: "MOCK_ATM_SYSTEM",
      images: ["/ATM1.png", "/ATM2.png"],
      description:
        "Developed a mock ATM system using Java, simulating core banking functionalities like Authentication, Deposit, Withdrawal, Account balance inquiry etc .",
    },
    "project-4": {
      title: "MEDICAL_EXPERT_SYSTEM",
      images: ["/MED1.png", "/MED2.png"],
      description:
        "Developed a Medical Expert System using PROLOG, simulating a diagnostic system for common medical conditions via a given number of symptoms. Uses a Knowledge Base and Predicates to Infer and provide possible diagnoses based on user input."
      },
    "project-5": {
      title: "GPS_NAVIGATION_SYSTEM",
      images: ["/map.png", "/map2.png"],
      description:
        "Developed a GPS Navigation System using PROLOG, that provides the best possible route from one point to another based on reward functions. This inferrence is done by analyzing various attributes such as Distance, Vehicle Type, Weather, Traffic etc."},
  };

  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("about");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null,
  );
  const [currentProjectImageIdx, setCurrentProjectImageIdx] = useState(0);
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
      if (folder === "certifications" && isOpening)
        setSelectedCertificate(null);
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
          animate={{
            opacity: [0, 1, 0.5, 1],
            x: [20, -10, 5, 0],
            skewX: [10, -5, 0],
          }}
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
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "xp-galaxy" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => setActiveView("xp-galaxy")}
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
                onClick={() => toggleFolder("certifications")}
              >
                <span>{openFolders.certifications ? "📂" : "📁"}</span>{" "}
                Certifications
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
              <div
                className="flex items-center gap-1 text-matrix-green/80 cursor-pointer hover:text-matrix-green transition-colors"
                onClick={() => toggleFolder("config")}
              >
                <span>{openFolders.config ? "📂" : "📁"}</span> PROJECTS
              </div>
              {openFolders.config && (
                <>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-1" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-1");
                      setSelectedCertificate(null);
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> Neuro Symbolic AI Math Solver
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-2" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-2");
                      setSelectedCertificate(null);
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> Apparel Marketplace
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-3" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-3");
                      setSelectedCertificate(null);
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> Mock ATM System
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-4" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-4");
                      setSelectedCertificate(null);
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> Medical Expert System
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-5" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-5");
                      setSelectedCertificate(null);
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> GPS Navigation System
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
                : projectsData[activeView]
                  ? "PROJECT_DETAILS"
                  : activeView === "about"
                    ? "System_User"
                    : activeView.toUpperCase().replace("-", "_")
            }
            className="col-span-7 h-screen"
          >
            {selectedCertificate ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full flex-1 min-h-[300px]">
                  <Image
                    src={selectedCertificate}
                    alt="Certificate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
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
              <div className="space-y-6 pb-12">
                <h1 className="text-3xl text-glow font-bold uppercase">
                  Work Experience
                </h1>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      Data Entry Operator - Commercial Bank (2021 Apr - 2022
                      Nov)
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      Contributed to operational efficiency by accurately
                      updating databases and collaborating with the Nugegoda
                      branch team.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      Data Entry & Quality Specialist - AV Business Solutions
                      (2022 - 2024)
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
                      Supervised a QC team and assisted in the development of
                      new customer care agents.
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
            ) : projectsData[activeView] ? (
              <div className="space-y-6 pb-12">
                <h1 className="text-3xl text-glow font-bold uppercase tracking-tight">
                  {projectsData[activeView].title}
                </h1>

                <div className="flex items-center gap-4 h-[400px]">
                  <button 
                    onClick={() => setCurrentProjectImageIdx(prev => (prev === 0 ? projectsData[activeView].images.length - 1 : prev - 1))}
                    className="text-matrix-green hover:text-white p-2 border border-matrix-green/20 bg-black/40 hover:bg-matrix-green/20 transition-all font-mono"
                  >
                    &lt;
                  </button>
                  
                  <div className="relative flex-1 h-full border border-matrix-green/30 bg-black/50 overflow-hidden rounded">
                    <Image
                      src={projectsData[activeView].images[currentProjectImageIdx]}
                      alt={`Project Screenshot ${currentProjectImageIdx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>

                  <button 
                    onClick={() => setCurrentProjectImageIdx(prev => (prev === projectsData[activeView].images.length - 1 ? 0 : prev + 1))}
                    className="text-matrix-green hover:text-white p-2 border border-matrix-green/20 bg-black/40 hover:bg-matrix-green/20 transition-all font-mono"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            ) : activeView === "xp-galaxy" ? (
              <div className="h-full relative border border-matrix-green/10 rounded overflow-hidden bg-transparent">
                <AIGalaxyView
                  onNodeClick={(name) => {
                    setShowGlobe(!!name);
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
                  : projectsData[activeView]
                    ? "Project_Brief"
                    : activeView === "about" ||
                        activeView === "education" ||
                        activeView === "work"
                      ? "User_Profile"
                      : "System_Status" // Default for other views like "ai-galaxy" when no globe is shown
            }
            className="col-span-3 h-screen"
          >
            {selectedCertificate ? (
              <div className="p-4 space-y-6 font-mono">
                <div className="border-b border-matrix-green/30 pb-2">
                  <p className="text-[10px] text-matrix-green/50 mb-1">
                    FILE_NAME
                  </p>
                  <p className="text-xs uppercase">
                    {selectedCertificate.split("/").pop()}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-matrix-green/50">
                      CERTIFICATION_TITLE
                    </p>
                    <p className="text-matrix-green font-bold uppercase">
                      {certificateDetails[selectedCertificate]?.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-matrix-green/50">
                      UNIVERSITY
                    </p>
                    <p className="text-sm opacity-80">
                      {certificateDetails[selectedCertificate]?.uni}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-matrix-green/50">
                      DATE_ISSUED
                    </p>
                    <p className="text-sm opacity-80">
                      {certificateDetails[selectedCertificate]?.issued}
                    </p>
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
                  Verified by the Council Authority. Identity hash confirmed.
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
                    Deep-diving into specific expertise nodes. Visualizing
                    neural architecture.
                  </p>
                </div>
              </div>
            ) : projectsData[activeView] ? (
              <div className="p-4 space-y-6 font-mono">
                <div className="border-b border-matrix-green/30 pb-2">
                  <p className="text-[10px] text-matrix-green/50 mb-1">
                    DATA_ENTRY_NODE
                  </p>
                  <p className="text-xs uppercase">DOCUMENTATION_LOG</p>
                </div>
                <div className="space-y-4">
                  <p className="font-sans text-base leading-relaxed opacity-90 text-justify whitespace-pre-line px-1">
                    {projectsData[activeView].description}
                  </p>
                </div>
                <div className="mt-12 p-2 bg-matrix-green/10 border-l-2 border-matrix-green text-[10px] leading-relaxed italic">
                  Project metadata successfully decoded. Analysis complete.
                </div>
              </div>
            ) : activeView === "about" ||
              activeView === "education" ||
              activeView === "work" ? (
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
                      className="object-cover"
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
