"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "@/components/panel";
import AICoreChart from "@/components/aicorechart";
import AIGlobe, { subsystemData } from "@/components/aiglobe";
import AIGalaxyView from "@/components/aigalaxy";
import LoadingScreen from "@/components/loadingscreen";

const Typewriter = ({ text, delay = 0, speed = 10 }: { text: string; delay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay, speed]);

  return <span>{displayText}</span>;
};

export default function Home() {
  const certificateDetails: Record<
    string,
    { title: string; uni: string; issued: string; link: string }
  > = {
    "/CERT1.png": {
      title: "Advanced Learning Algorithms",
      uni: "STANFORD UNIVERSITY / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/F8PFCNW7AF79",
    },
    "/CERT 2.png": {
      title: "Supervised Machine Learning : Regression and Classification",
      uni: "STANFORD UNIVERSITY / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/XPLEP85DGNNU",
    },
    "/CERT 3.png": {
      title:
        "Unsupervised Machine Learning, Recommenders, Reinforcement Learning",
      uni: "STANFORD UNIVERSITY / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/61SNZ4IM2V3S",
    },
    "/CERT 4.png": {
      title: "Machine Learning",
      uni: "STANFORD UNIVERSITY / DEEPLEARNINGAI",
      issued: "2025",
      link: "https://www.coursera.org/account/accomplishments/specialization/44GDQWUEBNDH",
    },
    "/CERT 5.png": {
      title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
      uni: "ORACLE UNIVERSITY",
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
        "Designed and implemented a Neuro-Symbolic AI Math Solver using Python, combining a Llama 3.2:1B model for natural language processing and Sympy for symbolic mathematics to solve complex mathematical problems. It uses the speed and efficiency of the 1B parameter model to interpret and process Natural Language, while leveraging Sympy's powerful symbolic computation capabilities to provide accurate solutions.",
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
        "Developed a Medical Expert System using PROLOG, simulating a diagnostic system for common medical conditions via a given number of symptoms. Uses a Knowledge Base and Predicates to Infer and provide possible diagnoses based on user input.",
    },
    "project-5": {
      title: "GPS_NAVIGATION_SYSTEM",
      images: ["/map.png", "/map2.png"],
      description:
        "Developed a GPS Navigation System using PROLOG, that provides the best possible route from one point to another based on reward functions. This inferrence is done by analyzing various attributes such as Distance, Vehicle Type, Weather, Traffic etc.",
    },
    "project-6": {
      title: "AEGIS_CLASSIFICATION_SYSTEM",
      images: ["/aegis1.png", "/aegis2.png"],
      description:
        "Developed an AEGIS Classification System using Python and Numpy, designed to classify entities into friendly or enemy categories based on their characteristics.",
    },
    "project-7": {
      title: "SLANG-GPT",
      images: ["/slanggpt1.png", "/slanggpt2.png"],
      description:
        "Developed SlangGPT, a language model that can translate standard language into Gen Z slang.\n\nTrained on a custom dataset of Gen Z slang phrases and their standard language equivalents, using a transformer architecture implemented in PyTorch. \n\nCustom Generative Architecture: Built a native decoder-only Transformer entirely from scratch using PyTorch, implementing multi-head self-attention mechanisms and causal masking.\n\nTokenization Upgrade: Moved away from basic character-level mapping to a high-efficiency subword tokenizer using OpenAI’s tiktoken (GPT-2 encoding), expanding the model's vocabulary matrix to approx 50K tokens to better track semantic dependencies.\n\n Inference Optimization: Implemented custom Temperature scaling at inference time to lock down pronoun consistency and strictly regulate structural confidence.",
    },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("about");
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
                    onClick={() => {
                      setActiveView("about");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> About
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "education" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("education");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Education
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "work" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("work");
                      setShowGlobe(false);
                    }}
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
                    onClick={() => {
                      setActiveView("xp-galaxy");
                      setShowGlobe(false);
                    }}
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
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "/CERT1.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("/CERT1.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Advanced Learning Algorithms
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "/CERT 2.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("/CERT 2.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Supervised Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "/CERT 3.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("/CERT 3.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Unsupervised Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "/CERT 4.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("/CERT 4.png");
                      setShowGlobe(false);
                    }}
                  >
                    <span>📄</span> Machine Learning
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "/CERT 5.png" ? "text-matrix-green shadow-[0_0_5px_rgba(0,255,65,0.3)]" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("/CERT 5.png");
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
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-7" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-7");
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> SlangGPT
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-6" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-6");
                      setShowGlobe(false);
                      setCurrentProjectImageIdx(0);
                    }}
                  >
                    <span>📄</span> AEGIS Classification System
                  </div>
                  <div
                    className={`flex items-center gap-1 ml-4 cursor-pointer hover:text-matrix-green transition-colors ${activeView === "project-1" ? "text-matrix-green" : "opacity-60"}`}
                    onClick={() => {
                      setActiveView("project-1");
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
              certificateDetails[activeView]
                ? "DATA_VISUALIZATION"
                : projectsData[activeView]
                  ? "PROJECT_DETAILS"
                  : activeView === "about"
                    ? "System_User"
                    : activeView.toUpperCase().replace("-", "_")
            }
            className="col-span-7 h-screen"
          >
            {certificateDetails[activeView] ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full flex-1 min-h-[300px]">
                  <Image
                    src={activeView}
                    alt="Certificate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain rounded-lg border border-matrix-green/30"
                  />
                </div>
              </div>
            ) : activeView === "about" ? (
              <>
                <h1 className="text-3xl text-glow font-bold uppercase">
                  <Typewriter text="Shehan Uyanwatte" />
                </h1>
                <p className="mt-4">
                  <Typewriter text="BSc IT Undergraduate | The Open University of Sri Lanka" delay={300} />
                </p>
                <p className="mt-4">
                  <Typewriter text="I'm a Proactive and results-driven student eager to contribute my skills and learn from industry experts. I'm actively seeking opportunities to gain hands-on experience and build professional connections" delay={800} />
                </p>
              </>
            ) : activeView === "education" ? (
              <div className="space-y-6">
                <h1 className="text-3xl text-glow font-bold uppercase">
                  <Typewriter text="Education" />
                </h1>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="St. Peter's College - Bambalapitiya (2006 - 2019)" delay={300} />
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      <Typewriter text="O/L - 7A 2C | A/L - 2C 1W" delay={800} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="The Open University of Sri Lanka (2021 - 2022)" delay={1200} />
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      <Typewriter text="Adv. Certificate in Science" delay={1700} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="The Open University of Sri Lanka (2023 - Present)" delay={2200} />
                    </h4>
                    <p className="text-sm opacity-80 mt-1">
                      <Typewriter text="BSc Information Technology" delay={2700} />
                    </p>
                  </div>
                </div>
              </div>
            ) : activeView === "work" ? (
              <div className="space-y-6 pb-12">
                <h1 className="text-3xl text-glow font-bold uppercase">
                  <Typewriter text="Work Experience" />
                </h1>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="Data Entry Operator - Commercial Bank (2021 Apr - 2022 Nov)" delay={300} />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Contributed to the branch's operational efficiency by accurately updating data in various databases." delay={900} />
                    </p>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Collaborated with team members to ensure all data entry tasks were completed efficiently and on time." delay={1600} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="Data Entry Operator - AV Business Solutions Pvt Ltd (2022 Nov - 2023 May)" delay={2400} />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Handled all aspects of customer payment updates, ensuring precision and professionalism in every transaction." delay={3200} />
                    </p>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Promoted to a role handling company-wide email inquiries from customers, demonstrating a strong ability to manage communication and resolve issues." delay={4000} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="Quality Control Specialist - AV Business Solutions Pvt Ltd (2023 May - 2024 July)" delay={5200} />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Evaluated and analyzed customer care agent interactions to measure performance and identify training needs." delay={6000} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="Quality Control Supervisor - AV Business Solutions (2024 - 2025)" delay={6800} />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="- Supervised a four-member team on Quality Control tasks while also assisting in the training and development of new customer care agents." delay={7600} />
                    </p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-bold">
                      <Typewriter text="IT Intern - AMW Capital Leasing (2026 Feb - Present)" delay={8600} />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      <Typewriter text="Currently working as an IT Intern at AMW Capital Leasing And Finance PLC, where I am gaining hands-on experience in IT support, system maintenance, and troubleshooting, while also contributing to various IT projects and initiatives within the company." delay={9400} />
                    </p>
                  </div>
                </div>
              </div>
            ) : projectsData[activeView] ? (
              <div className="space-y-6 pb-12">
                <h1 className="text-3xl text-glow font-bold uppercase tracking-tight">
                  <Typewriter text={projectsData[activeView].title} />
                </h1>

                <div className="flex items-center gap-4 h-[400px]">
                  <button
                    onClick={() =>
                      setCurrentProjectImageIdx((prev) =>
                        prev === 0
                          ? projectsData[activeView].images.length - 1
                          : prev - 1,
                      )
                    }
                    className="text-matrix-green hover:text-white p-2 border border-matrix-green/20 bg-black/40 hover:bg-matrix-green/20 transition-all font-mono"
                  >
                    &lt;
                  </button>

                  <div className="relative flex-1 h-full border border-matrix-green/30 bg-black/50 overflow-hidden rounded">
                    <Image
                      src={
                        projectsData[activeView].images[currentProjectImageIdx]
                      }
                      alt={`Project Screenshot ${currentProjectImageIdx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>

                  <button
                    onClick={() =>
                      setCurrentProjectImageIdx((prev) =>
                        prev === projectsData[activeView].images.length - 1
                          ? 0
                          : prev + 1,
                      )
                    }
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
              certificateDetails[activeView]
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
            {certificateDetails[activeView] ? (
              <div className="p-4 space-y-6 font-mono">
                <div className="space-y-4">
                  <div>
                    <p className="text-[19px] text-matrix-green/50 ">
                      <Typewriter text="CERTIFICATION_TITLE" />
                    </p>
                    <p className="text-[19px] text-matrix-green font-bold uppercase opacity-90">
                      <Typewriter text={certificateDetails[activeView]?.title || ""} delay={200} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[19px] text-matrix-green/50">
                      <Typewriter text="UNIVERSITY" delay={400} />
                    </p>
                    <p className="text-[19px] text-sm opacity-80">
                      <Typewriter text={certificateDetails[activeView]?.uni || ""} delay={600} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[19px] text-matrix-green/50">
                      <Typewriter text="DATE_ISSUED" delay={800} />
                    </p>
                    <p className="text-[19px] text-sm opacity-80">
                      <Typewriter text={certificateDetails[activeView]?.issued || ""} delay={1000} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[19px] text-matrix-green/50"><Typewriter text="LINK" delay={1200} /></p>
                    <a
                      href={certificateDetails[activeView]?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f2ff] text-[19px] visited:text-[#00f2ff] hover:underline"
                    >
                      <Typewriter text="[VIEW_CREDENTIAL]" delay={1400} />
                    </a>
                    <p></p>
                  </div>
                </div>
                <div className="text-[12px] mt-12 p-2 bg-matrix-green/10 border-l-2 border-matrix-green text-[10px] leading-relaxed italic">
                  <Typewriter text="Verified by the Council Authority. Identity hash confirmed." delay={1600} />
                </div>
              </div>
            ) : showGlobe ? (
              <div className="flex flex-col">
                <div className="h-[400px]">
                  <AIGlobe subsystem={selectedSubsystem} />
                </div>
                <div className="text-[11px] p-3 bg-matrix-green/5 border-t border-matrix-green/20 font-mono">
                  <div className="mb-3">
                    <p className="text-matrix-green/40 text-[9px] mb-1">
                      NODE_STREAMS_ACTIVE
                    </p>
                    <p className="text-matrix-green font-bold text-xs">
                      {selectedSubsystem?.replace(/_/g, " ")}
                    </p>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {selectedSubsystem &&
                      subsystemData[selectedSubsystem]?.map((node, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                          <span className="text-matrix-green/40 group-hover:text-matrix-green transition-colors text-[8px]">
                            &gt;
                          </span>
                          <span className="text-[10px] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                            {node.name}
                          </span>
                        </div>
                      ))}
                  </div>

                  <p className="text-[9px] opacity-40 italic border-t border-matrix-green/10 pt-2">
                    Deep-diving into specific expertise nodes. Visualizing
                    neural architecture.
                  </p>
                </div>
              </div>
            ) : projectsData[activeView] ? (
              <div className="p-4 space-y-6 font-mono">
                <div className="border-b border-matrix-green/30 pb-2">
                  <p className="text-[10px] text-matrix-green/50 mb-1">
                    <Typewriter text="DATA_ENTRY_NODE" />
                  </p>
                  <p className="text-xs uppercase"><Typewriter text="DOCUMENTATION_LOG" delay={200} /></p>
                </div>
                <div className="space-y-4">
                  <p className="font-sans text-base leading-relaxed opacity-90 text-justify whitespace-pre-line px-1">
                    <Typewriter text={projectsData[activeView].description} delay={400} speed={5} />
                  </p>
                </div>
                <div className="mt-12 p-2 bg-matrix-green/10 border-l-2 border-matrix-green text-[10px] leading-relaxed italic">
                  <Typewriter text="Project metadata successfully decoded. Analysis complete." delay={1000} />
                </div>
              </div>
            ) : activeView === "about" ||
              activeView === "education" ||
              activeView === "work" ? (
              <div className="flex flex-col items-center gap-3 p-2 pt-2">
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

                <div className="text-center space-y-1 w-full">
                  <div className="p-0 border-y border-matrix-green/10">
                    <h3 className="text-[12px] text-matrix-green font-semibold uppercase tracking-[0.3em] [text-shadow:0_0_8px_rgba(0,255,65,1),0_0_18px_rgba(0,255,65,0.9)]">
                      <Typewriter text="DATE OF BIRTH" />
                    </h3>
                    <p className="text-sm opacity-80"><Typewriter text="2000 APRIL 03" delay={200} /></p>
                  </div>
                  <div className="py-0.5 border-y border-matrix-green/10">
                    <h3 className="text-[12px] text-matrix-green font-semibold uppercase tracking-[0.3em] [text-shadow:0_0_8px_rgba(0,255,65,1),0_0_18px_rgba(0,255,65,0.9)]">
                      <Typewriter text="GENDER" delay={400} />
                    </h3>
                    <p className="text-sm opacity-80"><Typewriter text="MALE" delay={600} /></p>
                  </div>
                  <div className="py-0.5 border-y border-matrix-green/10">
                    <h3 className="text-[12px] text-matrix-green font-semibold uppercase tracking-[0.3em] [text-shadow:0_0_8px_rgba(0,255,65,1),0_0_18px_rgba(0,255,65,0.9)]">
                      <Typewriter text="ADDRESS" delay={800} />
                    </h3>
                    <p className="text-sm opacity-80 leading-tight uppercase p-0">
                      <Typewriter text="20E, 4th Lane, Pepiliyana Mawatha, Nugegoda." delay={1000} />
                    </p>
                  </div>
                  <div className="py-0.5 border-y border-matrix-green/10">
                    <h3 className="text-[12px] text-matrix-green font-semibold uppercase tracking-[0.3em] [text-shadow:0_0_8px_rgba(0,255,65,1),0_0_18px_rgba(0,255,65,0.9)]">
                      <Typewriter text="EMAIL" delay={1200} />
                    </h3>
                    <a
                      href="mailto:shehanuyanwatte2000@gmail.com"
                      className="text-sm text-[#00f2ff] hover:underline"
                    >
                      <Typewriter text="shehanuyanwatte2000@gmail.com" delay={1400} />
                    </a>
                    <p></p>
                  </div>
                  <div className="py-0.5 border-y border-matrix-green/10">
                    <a
                      href="/CV.pdf"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 text-base text-[#00f2ff] visited:text-[#00f2ff] hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]"
                    >
                      <span className="group-hover:animate-bounce"><Typewriter text="↓" delay={1600} /></span>
                      <Typewriter text="[DOWNLOAD_CV.EXE]" delay={1700} />
                      <span className="group-hover:animate-bounce"><Typewriter text="↓" delay={1600} /></span>
                    </a>
                    <p></p>
                  </div>
                  <div className="py-0.5 border-y border-matrix-green/10">
                    <p></p>
                    <a
                      href="https://www.linkedin.com/in/shehan-uyanwatte-b94805272/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 text-base text-[#00f2ff] visited:text-[#00f2ff] hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]"
                    >
                      <span className="group-hover:animate-bounce"></span>
                      <Typewriter text="[LINKEDIN]" delay={2000} />
                    </a>
                    <span>|||</span>
                    <a
                      href="https://github.com/shehan2k"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 text-base text-[#00f2ff] visited:text-[#00f2ff] hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]"
                    >
                      <span className="group-hover:animate-bounce"></span>
                      <Typewriter text="[GITHUB]" delay={2200} />
                    </a>
                  </div>
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
