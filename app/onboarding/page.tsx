"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

// LOTTIE FILES (Dosya yollarının doğru olduğundan emin ol)
import mascotAnimation from "@/public/lottie/mascot-wave.json";
import fireStreakAnimation from "@/public/lottie/fire-streak.json";
import rewardsAnimation from "@/public/lottie/rewards.json";

// COMPONENTS
import { AvatarPicker3D } from "@/components/AvatarPicker3D";
import { FloatingOrb } from "@/components/3d/FloatingOrb";
import { ParticleField } from "@/components/ParticleField";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "HabitForge'a Hoş Geldin",
      subtitle: "Alışkanlıklarını süper güçlere dönüştür",
      lottie: mascotAnimation,
    },
    {
      title: "Serini İnşa Et",
      subtitle: "Her gün birikerek gücüne güç katar",
      lottie: fireStreakAnimation,
    },
    {
      title: "Ödüller Kazan",
      subtitle: "Rozetleri aç ve avatarına seviye atlat",
      lottie: rewardsAnimation,
    },
    {
      title: "Avatarını Seç",
      subtitle: "Bu yolculukta sana eşlik edecek yoldaşını belirle",
      component: AvatarPicker3D,
    },
  ];

  const StepComponent = steps[step].component;
  const easing = [0.25, 0.1, 0.25, 1];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-void to-nebula">
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <FloatingOrb step={step} />
          </Float>
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.93 }}
            transition={{ duration: 0.45, ease: easing }}
            className="text-center max-w-2xl"
          >
            <motion.h1
              className="mb-4 text-5xl font-extrabold bg-gradient-to-r from-electric via-neon to-energyGold bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {steps[step].title}
            </motion.h1>

            <p className="mb-8 text-xl text-gray-300">{steps[step].subtitle}</p>

            {steps[step].lottie && (
              <motion.div
                className="mx-auto mb-8 w-72"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: easing }}
              >
                <Lottie animationData={steps[step].lottie} loop />
              </motion.div>
            )}

            {StepComponent && <StepComponent />}

            <div className="my-6 flex justify-center gap-2">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step ? "bg-electric w-10" : "bg-gray-600 w-3"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => step < steps.length - 1 ? setStep(step + 1) : router.push("/dashboard")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="rounded-2xl bg-gradient-to-r from-electric to-neon px-12 py-4 text-lg font-semibold text-white shadow-2xl hover:shadow-electric/25"
            >
              {step < steps.length - 1 ? "Devam Et" : "Yolculuğa Başla"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
      <ParticleField count={45} />
    </div>
  );
}