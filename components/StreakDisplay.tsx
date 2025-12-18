"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
  // onUpdate kaldırıldı çünkü artık otomatik hesaplanıyor
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-streakFire/30 hover:bg-white/10">
      
      {/* GLOW EFFECT */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-streakFire/20 blur-[60px] pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-energyGold/10 blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Best Streak
        </h3>

        <div className="flex items-center justify-center gap-8">
          
          <div className="relative">
            {/* Flame Animation */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-streakFire drop-shadow-[0_0_15px_rgba(255,77,0,0.6)]"
            >
              <Flame className="h-10 w-10 fill-current" />
            </motion.div>

            {/* Streak Number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={streak}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="font-mono text-7xl font-black text-white tracking-tighter drop-shadow-2xl"
              >
                {streak}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p 
          key={streak}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-sm font-medium text-gray-500"
        >
          {streak > 0 ? "Your longest chain!" : "Start your first chain today!"}
        </motion.p>

      </div>
    </div>
  );
}