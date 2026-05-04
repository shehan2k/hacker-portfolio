"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "INITIALIZING_KERNEL_V4.0.2...",
  "LOADING_VIRTUAL_NEURAL_MAPS...",
  "ESTABLISHING_SECURE_LINK_TO_LOCAL_HOST...",
  "DECRYPTING_BIOMETRIC_DATA...",
  "CHECKING_SUBSYSTEM_INTEGRITY...",
  "ACCESS_GRANTED_BY_ADMIN",
  "STARTING_CONSOLE_SESSION..."
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Message sequence
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800); // Wait a bit at 100%
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: [1, 0, 1, 0.5, 0],
        x: [0, -20, 20, -10, 10, 0],
        skewX: [0, 15, -15, 10, -10, 0],
      }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-matrix-green p-4 overflow-hidden"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />
      
      <div className="w-full max-w-md space-y-8 relative z-20">
        <div className="space-y-2 h-40 overflow-hidden flex flex-col justify-end">
          <AnimatePresence mode="popLayout">
            {bootMessages.slice(0, currentMessageIndex + 1).map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] md:text-xs"
              >
                <span className="opacity-50">
                  [{isMounted ? new Date().toLocaleTimeString() : "00:00:00"}]
                </span> {msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase tracking-widest">
            <span>System_Boot_Progress</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
          </div>
          <div className="h-1 w-full bg-matrix-green/10 border border-matrix-green/20 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-matrix-green shadow-[0_0_10px_rgba(0,255,65,0.8)]"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}