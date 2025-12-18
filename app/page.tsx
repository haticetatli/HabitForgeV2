"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  Activity, 
  Shield, 
  Users, 
  Star 
} from "lucide-react";
import { useRef } from "react";

// --- MOCK DATA (TÜRKÇE) ---
const features = [
  {
    title: "Oyunlaştırılmış İlerleme",
    desc: "Günlük görevlerini bir RPG oyununa dönüştür. XP kazan, seviye atla ve başarıların kilidini aç.",
    icon: <Trophy className="h-6 w-6 text-energyGold" />,
    color: "from-energyGold/20 to-energyGold/5"
  },
  {
    title: "Lazer Odaklı Analizler",
    desc: "Yapay zeka destekli içgörüler ve görsel 'seri' takibi ile alışkanlıklarının derinliklerine in.",
    icon: <Activity className="h-6 w-6 text-electric" />,
    color: "from-electric/20 to-electric/5"
  },
  {
    title: "Topluluk Meydan Okumaları",
    desc: "Arkadaşlarınla yarış veya motivasyonunu zirvede tutmak için küresel görevlere katıl.",
    icon: <Users className="h-6 w-6 text-neon" />,
    color: "from-neon/20 to-neon/5"
  }
];

const stats = [
  { label: "Aktif Kullanıcı", value: "12B+" },
  { label: "Kazanılan Alışkanlık", value: "2.5M" },
  { label: "Tamamlama Oranı", value: "%94" },
  { label: "Kullanıcı Puanı", value: "4.9/5" },
];

const testimonials = [
  {
    name: "Ali Yılmaz",
    role: "Yazılım Mühendisi",
    text: "HabitForge sabah rutinime yaklaşımımı tamamen değiştirdi. XP sistemi fena bağımlılık yapıyor!",
    avatar: "AY"
  },
  {
    name: "Selin Demir",
    role: "Ürün Tasarımcısı",
    text: "Sonunda excel tablosu gibi hissettirmeyen bir alışkanlık takipçisi. Hem şık hem de etkili.",
    avatar: "SD"
  }
];

// --- COMPONENTS ---

const Navbar = () => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-void/80 backdrop-blur-md"
  >
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric to-neon flex items-center justify-center font-bold text-void">
          H
        </div>
        <span className="text-xl font-bold tracking-tight text-white">HabitForge</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="#features" className="hover:text-white transition-colors">Özellikler</Link>
        <Link href="#testimonials" className="hover:text-white transition-colors">Hikayeler</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-white hover:text-electric transition-colors hidden sm:block">
          Giriş Yap
        </Link>
        <Link 
          href="/register"
          className="px-5 py-2.5 rounded-full bg-white text-void font-bold text-sm hover:bg-electric hover:scale-105 transition-all duration-300"
        >
          Hemen Başla
        </Link>
      </div>
    </div>
  </motion.nav>
);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-electric/10 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric/30 bg-electric/10 text-electric text-xs font-bold mb-8 uppercase tracking-widest"
        >
          <Zap className="h-3 w-3" />
          v2.0 yayında
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 tracking-tight"
        >
          Rutininde Ustalaş.<br />
          <span className="text-electric">Hayatına Seviye Atlat.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          HabitForge, sarsılmaz alışkanlıklar inşa etmen için gelişmiş oyunlaştırma ve davranış bilimini kullanır. Kendinin daha iyi bir versiyonunu "şekillendiren" binlerce kullanıcıya katıl.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-electric text-void font-bold text-lg hover:bg-neon hover:shadow-[0_0_30px_-5px_rgba(178,75,243,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Ücretsiz Başla <ArrowRight className="h-5 w-5" />
          </Link>

        </motion.div>

        {/* Mock UI Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-void/50 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
           {/* Fake Browser Top Bar */}
           <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/50" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
             <div className="w-3 h-3 rounded-full bg-green-500/50" />
           </div>
           {/* Placeholder for a screenshot or just a nice gradient area */}
           <div className="aspect-video w-full bg-gradient-to-br from-void to-nebula flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="text-center p-10">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-electric flex items-center justify-center mb-6 shadow-[0_0_50px_-10px_rgba(0,240,255,0.3)]">
                  <span className="text-4xl font-bold text-white">Svy 12</span>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/10 animate-pulse"></div>
                   ))}
                </div>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
        {feature.desc}
      </p>
    </div>
  </motion.div>
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-void text-white selection:bg-electric selection:text-void">
      <Navbar />
      <Hero />
      
      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <h4 className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</h4>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Başarıya <span className="text-electric">Takıntılı</span> Olanlar İçin</h2>
          <p className="text-gray-400 text-lg">
            Gereksiz detayları attık ve sadece davranış değişikliğini sağlayan şeye odaklandık. Boş laf yok, sadece sonuç var.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-24 bg-nebula/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-void border border-white/10 relative"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-neon">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <p className="text-lg text-gray-300 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-electric to-neon flex items-center justify-center font-bold text-void">
                    {t.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{t.name}</h5>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 container mx-auto px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-electric/5 to-void pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Döngüyü kırmaya hazır mısın?</h2>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-void font-bold text-xl hover:bg-electric hover:scale-105 transition-all duration-300 shadow-xl"
          >
            HabitForge'a Şimdi Katıl <ArrowRight />
          </Link>
          <p className="mt-6 text-sm text-gray-500">Temel plan için kredi kartı gerekmez.</p>
        </motion.div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-void py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© 2024 HabitForge Inc. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Gizlilik</Link>
            <Link href="#" className="hover:text-white">Şartlar</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}