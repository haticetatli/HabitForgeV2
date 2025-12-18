"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import { Loader } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LightStreakBackground } from "@/components/3d/LightStreakBackground"
import successAnimation from "@/public/lottie/success-checkmark.json"

import { easing } from "@/lib/animations"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // 1. API'ye istek at
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Kullanıcı adı veya şifre hatalı');
      }

      const userData = await res.json();

      // 2. ID'yi kaydet
      localStorage.setItem("currentUserId", userData.id.toString());
      
      setIsLoading(false);
      setShowSuccess(true);
      
      // 3. YÖNLENDİRME MANTIĞI (GÜNCELLENDİ)
      setTimeout(() => {
        if (userData.isAdmin) {
          // Eğer Admin ise -> Admin Paneline
          router.push("/admin");
        } else {
          // Eğer Normal User ise -> Dashboard'a (Onboarding yerine)
          router.push("/dashboard");
        }
      }, 2000);

    } catch (err) {
      setIsLoading(false);
      setError("Giriş başarısız. Bilgileri kontrol et.");
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void">
      {/* Arka Plan Efekti */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <LightStreakBackground />
        </Canvas>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: easing.soft }}
          className="w-full max-w-md rounded-3xl border border-glass-border bg-glass-white p-8 backdrop-blur-2xl shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">HabitForge</h1>
            <p className="text-gray-400">Alışkanlıklarını şekillendirmek için giriş yap</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Kullanıcı Adı</label>
              <Input
                type="text"
                value={username}
                placeholder="Örn: hatice"
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Şifre</label>
              <Input
                type="password"
                value={password}
                placeholder="••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric"
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-electric to-neon py-6 text-lg font-semibold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(178,75,243,0.5)] transition-all hover:scale-[1.02]"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Loader className="h-6 w-6 text-black" />
                </motion.div>
              ) : (
                <span className="text-black">Giriş Yap</span>
              )}
            </Button>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-600 space-y-1">
             <p>Admin Girişi: <strong>admin</strong> / <strong>123</strong></p>
             <p>Kullanıcı Girişi: <strong>hatice</strong> / <strong>hatice</strong></p>
          </div>
        </motion.div>
      </div>

      {/* Başarılı Giriş Animasyonu */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="flex flex-col items-center"
            >
              <div className="w-64 h-64">
                <Lottie animationData={successAnimation} loop={false} />
              </div>
              <p className="mt-4 text-3xl font-bold text-white tracking-widest uppercase">Hoş Geldin</p>
              <p className="text-electric font-mono text-sm mt-2">Yönlendiriliyorsun...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}