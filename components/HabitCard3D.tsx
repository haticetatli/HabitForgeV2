"use client";

import { motion } from "framer-motion";
import { Check, Trash2, Minus, Plus } from "lucide-react"; // Plus ve Minus eklendi
import clsx from "clsx";

interface Habit {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
}

export interface HabitCard3DProps {
  habit: Habit;
  delay: number;
  onComplete: () => void;
  onDelete: () => void;
  onStreakChange: (amount: number) => void; // Yeni prop
}

export function HabitCard3D({ habit, delay, onComplete, onDelete, onStreakChange }: HabitCard3DProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ delay: delay, type: "spring", stiffness: 100 }}
      className="group relative"
    >
      <div className={clsx(
        "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300",
        habit.completed 
          ? "bg-completionGreen/10 border-completionGreen/30 shadow-[0_0_30px_-5px_rgba(0,255,148,0.2)]" 
          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
      )}>
        
        {/* Header: Icon + Delete Button */}
        <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{habit.icon}</div>
            
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Habit"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>

        <h3 className={clsx("text-xl font-bold mb-3 text-white", habit.completed && "line-through opacity-50")}>
            {habit.name}
        </h3>
        
        {/* STREAK CONTROL SECTION */}
        <div className="flex items-center justify-between mb-6 bg-black/20 rounded-lg p-2">
           <span className="text-xs text-gray-400 font-medium uppercase tracking-wide ml-1">Streak</span>
           
           <div className="flex items-center gap-3">
              {/* Azalt */}
              <button 
                onClick={(e) => { e.stopPropagation(); onStreakChange(-1); }}
                className="w-6 h-6 rounded flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-electric font-mono font-bold text-lg min-w-[20px] text-center">
                {habit.streak}
              </span>

              {/* Artır */}
              <button 
                onClick={(e) => { e.stopPropagation(); onStreakChange(1); }}
                className="w-6 h-6 rounded flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition"
              >
                <Plus className="w-3 h-3" />
              </button>
           </div>
        </div>

        <button
            onClick={onComplete}
            disabled={habit.completed}
            className={clsx(
                "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95",
                habit.completed
                    ? "bg-completionGreen text-black cursor-default"
                    : "bg-white/10 text-white hover:bg-electric hover:text-black"
            )}
        >
            {habit.completed ? (
                <>
                  <Check className="w-5 h-5" /> Completed
                </>
            ) : (
                "Mark Complete"
            )}
        </button>
      </div>
    </motion.div>
  );
}