"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { motion, AnimatePresence } from "framer-motion"
import { Loader, UserPlus, User, Lock, Smile, Mail, CheckCircle2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LightStreakBackground } from "@/components/3d/LightStreakBackground"

import { easing, springs } from "@/lib/animations"

export default function RegisterPage() {
  const router = useRouter()
  
  // Form State
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("") // Yeni
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("") // Yeni
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async () => {
    setError("");
    
    // 1. Boş Alan Kontrolü
    if(!name || !username || !email || !password || !confirmPassword) {
        setError("Lütfen tüm alanları doldurun.");
        return;
    }

    // 2. Şifre Eşleşme Kontrolü
    if(password !== confirmPassword) {
        setError("Şifreler birbiriyle uyuşmuyor!");
        return;
    }

    setIsLoading(true);

    try {
      // 3. API İsteği (Email dahil)
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kayıt başarısız');
      }

      // Başarılı
      localStorage.setItem("currentUserId", data.id.toString());
      
      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);

    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void">
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
          className="w-full max-w-md rounded-3xl border border-glass-border bg-glass-white p-8 backdrop-blur-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon to-electric text-black shadow-lg">
                <UserPlus className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">HabitForge'a Katıl</h1>
            <p className="text-gray-400 text-sm">Yolculuğuna bugün başla</p>
          </div>

          <div className="space-y-3">
            
            {/* Ad Soyad */}
            <div className="relative">
              <Smile className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                value={name}
                placeholder="Ad Soyad"
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric transition-colors"
              />
            </div>

            {/* Kullanıcı Adı */}
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                value={username}
                placeholder="Kullanıcı Adı"
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric transition-colors"
              />
            </div>

            {/* Email (Yeni) */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                type="email"
                value={email}
                placeholder="E-posta Adresi"
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric transition-colors"
              />
            </div>

            {/* Şifre */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                type="password"
                value={password}
                placeholder="Şifre"
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric transition-colors"
              />
            </div>

            {/* Şifre Tekrar (Yeni) */}
            <div className="relative">
              <CheckCircle2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                type="password"
                value={confirmPassword}
                placeholder="Şifreyi Onayla"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-electric transition-colors ${
                    confirmPassword && password !== confirmPassword ? "border-red-500/50 focus:border-red-500" : ""
                }`}
              />
            </div>
            
            {/* Hata Mesajı */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-neon to-electric py-5 text-lg font-bold text-black shadow-lg hover:shadow-neon/25 transition-all active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Loader className="h-5 w-5" />
                    </motion.div>
                    Oluşturuluyor...
                </div>
              ) : "Hesap Oluştur"}
            </Button>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-400">
            Zaten bir hesabın var mı?{" "}
            <Link href="/login" className="text-electric font-bold hover:underline hover:text-neon transition-colors">
              Giriş Yap
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}