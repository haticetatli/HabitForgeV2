"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Sparkles } from "lucide-react";
import clsx from "clsx";

// Avatar seçenekleri (Gerçek 3D modeller yoksa emoji veya görsel kullanıyoruz ama 3D efekti veriyoruz)
const avatars = [
  { id: "cyber", name: "Cipher", emoji: "🤖", gradient: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/50" },
  { id: "ninja", name: "Ronin", emoji: "🥷", gradient: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/50" },
  { id: "alien", name: "Xeno", emoji: "👽", gradient: "from-emerald-400 to-green-600", shadow: "shadow-emerald-500/50" },
  { id: "ghost", name: "Spectre", emoji: "👻", gradient: "from-gray-200 to-gray-400", shadow: "shadow-white/40" },
  { id: "fire", name: "Blaze", emoji: "🔥", gradient: "from-orange-500 to-red-600", shadow: "shadow-orange-500/50" },
];

export function AvatarPicker3D() {
  const [selected, setSelected] = useState<string>(avatars[0].id);
  const [hovered, setHovered] = useState<string | null>(null);

  // Seçili avatarın detaylarını bul
  const activeAvatar = avatars.find((a) => a.id === selected) || avatars[0];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* SEÇİLEN AVATAR PREVIEW (Büyük Gösterim) */}
      <div className="relative flex justify-center mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-electric/20 to-transparent blur-3xl opacity-30" />
        
        <motion.div
          key={selected}
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          {/* Holografik Daire */}
          <div className={clsx(
            "w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-2xl transition-all duration-500",
            "bg-gradient-to-br border-2 border-white/20",
            activeAvatar.gradient,
            activeAvatar.shadow
          )}>
            {/* Yüzen Efekt */}
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-lg"
            >
              {activeAvatar.emoji}
            </motion.span>
          </div>

          {/* İsim Etiketi */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-electric" />
              <span className="text-sm font-bold text-white tracking-wider">{activeAvatar.name}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* SEÇİM IZGARASI */}
      <div className="grid grid-cols-5 gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
        {avatars.map((avatar) => {
          const isSelected = selected === avatar.id;
          
          return (
            <button
              key={avatar.id}
              onClick={() => setSelected(avatar.id)}
              onMouseEnter={() => setHovered(avatar.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col items-center justify-center outline-none"
            >
              {/* Aktiflik Göstergesi (Arkada yanan ışık) */}
              {isSelected && (
                <motion.div
                  layoutId="active-glow"
                  className="absolute inset-0 bg-white/10 rounded-xl blur-md"
                  transition={{ duration: 0.3 }}
                />
              )}

              <div
                className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 border",
                  isSelected 
                    ? `border-white/50 scale-110 ${avatar.gradient} shadow-lg` 
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 grayscale hover:grayscale-0"
                )}
              >
                {avatar.emoji}
              </div>
              
              {/* Seçildi Tik İşareti */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-electric text-black flex items-center justify-center border border-white"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[4]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Select your identity</p>
      </div>
    </div>
  );
}