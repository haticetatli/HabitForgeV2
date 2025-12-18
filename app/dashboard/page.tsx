"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Canvas } from '@react-three/fiber';
import { Plus, Home, LogOut, LayoutGrid, Zap, Settings, History, Calendar } from "lucide-react";

import { XP3DRing } from "@/components/3d/XP3DRing";
import { HabitCard3D } from "@/components/HabitCard3D";
import { StreakDisplay } from "@/components/StreakDisplay";
import { ProfileModal } from "@/components/ProfileModal"; 
import { springs } from "@/lib/animations";

export default function DashboardPage() {
  const router = useRouter();

  // --- STATE ---
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<any[]>([]);
  
  // Yeni Habit Ekleme
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitIcon, setNewHabitIcon] = useState("✨");
  const [isAdding, setIsAdding] = useState(false);
  
  // Profil Modal
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- VERİ ÇEKME ---
  const fetchUserData = async () => {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) { router.push("/login"); return; }

    try {
      const res = await fetch(`/api/user?id=${userId}`);
      if (!res.ok) throw new Error("Kullanıcı bulunamadı");
      const userData = await res.json();

      if (userData.isAdmin) { router.push("/admin"); return; }

      const maxStreak = userData.habits.length > 0 
        ? Math.max(...userData.habits.map((h: any) => h.streak)) 
        : 0;

      setUser({ ...userData, streak: maxStreak });
      setHabits(userData.habits);

    } catch (error) {
      localStorage.removeItem("currentUserId");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUserId");
    router.push("/");
  };

  const recalculateGlobalStreak = (currentHabits: any[]) => {
     if (currentHabits.length === 0) return 0;
     return Math.max(...currentHabits.map(h => h.streak));
  };

  // --- HISTORY LOGIC (Tablo İçin Veri Hazırlama) ---
  const getHistoryLogs = () => {
    const logs: any[] = [];
    habits.forEach((habit) => {
        // completedDates varsa kullan, yoksa boş dizi
        const dates = habit.completedDates || [];
        dates.forEach((dateString: string) => {
            logs.push({
                id: habit.id + dateString, // Benzersiz key için
                name: habit.name,
                icon: habit.icon,
                date: dateString
            });
        });
    });

    // Tarihe göre sırala (En yeni en üstte)
    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // --- ACTIONS ---

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, name: newHabitName, icon: newHabitIcon })
    });
    if (res.ok) {
        setNewHabitName("");
        setIsAdding(false);
        fetchUserData();
    }
  };

  const handleDeleteHabit = async (habitId: number) => {
    const updatedHabits = habits.filter((h) => h.id !== habitId);
    setHabits(updatedHabits);
    const newMaxStreak = recalculateGlobalStreak(updatedHabits);
    setUser((prev: any) => ({ ...prev, streak: newMaxStreak }));
    await fetch(`/api/user?userId=${user.id}&habitId=${habitId}`, { method: 'DELETE' });
  };

  const handleHabitComplete = async (habitId: number) => {
    const habit = habits.find((h) => h.id === habitId);
    if (habit?.completed) return;

    const newStreak = habit.streak + 1;
    const gainedXP = newStreak * 100; 
    let currentTotalXP = user.xp + gainedXP;
    
    let currentLevel = user.level;
    let currentXpToNext = user.xpToNext;

    while (currentTotalXP >= currentXpToNext) {
        currentLevel++;
        currentXpToNext = Math.floor(currentXpToNext * 1.5);
    }

    // Bugünün tarihini al (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // State'i güncelle (Tarihi de ekleyerek)
    const updatedHabits = habits.map((h) =>
        h.id === habitId ? { 
            ...h, 
            completed: true, 
            streak: newStreak,
            // Mevcut tarihlerin üzerine bugünü ekle
            completedDates: [...(h.completedDates || []), today]
        } : h
    );
    setHabits(updatedHabits);

    const newMaxStreak = recalculateGlobalStreak(updatedHabits);

    setUser((prev: any) => ({ 
        ...prev, streak: newMaxStreak, xp: currentTotalXP, level: currentLevel, xpToNext: currentXpToNext
    }));

    await celebrateCompletion();

    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: user.id, habitId: habitId, completed: true, streak: newStreak, globalStreak: newMaxStreak,
        xp: currentTotalXP, level: currentLevel, xpToNext: currentXpToNext
      })
    });
  };

  const handleHabitStreakChange = async (habitId: number, amount: number) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;
    const newStreak = Math.max(0, habit.streak + amount);
    const updatedHabits = habits.map(h => h.id === habitId ? {...h, streak: newStreak} : h);
    setHabits(updatedHabits);
    const newMaxStreak = recalculateGlobalStreak(updatedHabits);
    setUser((prev: any) => ({ ...prev, streak: newMaxStreak }));
    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, habitId: habitId, completed: habit.completed, streak: newStreak, globalStreak: newMaxStreak })
    });
  };

  const handleUpdateProfile = async (updates: any) => {
    setUser((prev: any) => ({ ...prev, ...updates }));
    await fetch('/api/user', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, ...updates })
    });
  };

  const handleDeleteAccount = async () => {
    await fetch(`/api/user?userId=${user.id}`, { method: 'DELETE' });
    handleLogout();
  };

  const celebrateCompletion = async () => {
    await new Promise((res) => setTimeout(res, 200));
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#00F0FF", "#B24BF3", "#FFB800"] });
  };

  if (!user) return (
    <div className="h-screen w-full bg-void flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-mono animate-pulse">Sistem Başlatılıyor...</p>
        </div>
    </div>
  );

  const historyLogs = getHistoryLogs();

  return (
    <div className="min-h-screen bg-void text-gray-200 relative overflow-x-hidden selection:bg-electric selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <AnimatePresence>
        {isProfileOpen && (
            <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onUpdate={handleUpdateProfile} onDeleteAccount={handleDeleteAccount} />
        )}
      </AnimatePresence>

      <motion.header
        className="sticky top-0 z-50 border-b border-white/10 bg-void/80 backdrop-blur-xl"
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ type: "spring", ...springs.gentle }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <Link href="/" className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-electric/10 border border-white/5 hover:border-electric/30 transition-all duration-300">
                <Home className="w-5 h-5 text-gray-400 group-hover:text-electric transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white hidden sm:inline-block">Ana Sayfa</span>
             </Link>
             <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric to-neon flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">HF</div>
               <div><h1 className="text-lg font-bold text-white leading-none">HabitForge</h1><p className="text-xs text-gray-500 font-mono">v2.0 Beta</p></div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsProfileOpen(true)} className="hidden md:flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex flex-col items-end"><span className="text-sm font-bold text-white group-hover:text-electric transition-colors">{user.name}</span><span className="text-xs text-gray-500">Svy {user.level}</span></div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-electric/50 transition-colors"><Settings className="w-5 h-5 text-gray-400 group-hover:text-electric" /></div>
             </button>
             <button onClick={handleLogout} className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"><LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" /></button>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        <section className="mb-16">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex items-center justify-center min-h-[350px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-3xl -z-10"></div>
                  <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="h-64 w-64 relative">
                          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none z-10">
                            <span className="text-6xl font-black text-white tracking-tighter drop-shadow-xl">{user.level}</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">Mevcut Seviye</span>
                          </div>
                          <Canvas camera={{ position: [0, 0, 4] }}><ambientLight intensity={0.5} /><XP3DRing level={user.level} xpToNext={user.xpToNext} xp={user.xp} /></Canvas>
                      </div>
                      <div className="text-center md:text-left space-y-4">
                          <div><h2 className="text-3xl font-bold text-white mb-1">XP İlerlemesi</h2><p className="text-gray-400 text-sm">Harika gidiyorsun! Gelişmeye devam et.</p></div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-xs font-mono text-gray-500"><span>{user.xp} XP</span><span>{user.xpToNext} XP</span></div>
                             <div className="h-3 w-64 bg-black/40 rounded-full overflow-hidden border border-white/5"><motion.div className="h-full bg-gradient-to-r from-electric to-neon" initial={{ width: 0 }} animate={{ width: `${Math.min((user.xp / user.xpToNext) * 100, 100)}%` }} transition={{ duration: 1, ease: "easeOut" }} /></div>
                          </div>
                      </div>
                  </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5 flex flex-col justify-center"><StreakDisplay streak={user.streak} /></motion.div>
           </div>
        </section>

        {/* HABITS SECTION */}
        <section className="mb-16">
           <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
               <div><h2 className="text-2xl font-bold text-white flex items-center gap-2"><LayoutGrid className="w-6 h-6 text-electric" /> Aktif Alışkanlıklar</h2><p className="text-gray-500 text-sm mt-1">Günlük rutinlerini yönet</p></div>
               <button onClick={() => setIsAdding(!isAdding)} className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold shadow-lg ${isAdding ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-electric text-black hover:bg-neon hover:scale-105"}`}>{isAdding ? "İptal" : <><Plus className="w-5 h-5" /> Yeni Alışkanlık</>}</button>
           </div>

           <AnimatePresence>
             {isAdding && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-12">
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl">
                    <div className="flex items-center gap-3 mb-6 text-electric"><Zap className="w-5 h-5" /><span className="font-bold uppercase tracking-wider text-sm">Yeni Alışkanlık Oluştur</span></div>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-2"><label className="text-xs text-gray-400 ml-1">Alışkanlık Adı</label><input type="text" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} placeholder="Örn: 20 sayfa kitap oku" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-all placeholder:text-gray-600" /></div>
                        <div className="space-y-2"><label className="text-xs text-gray-400 ml-1">İkon</label><input type="text" value={newHabitIcon} onChange={(e) => setNewHabitIcon(e.target.value)} className="w-20 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-all" maxLength={2} /></div>
                        <button onClick={handleAddHabit} className="w-full sm:w-auto px-8 py-3.5 bg-electric text-black font-bold rounded-xl hover:bg-neon transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(178,75,243,0.5)]">Oluştur</button>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {habits.map((habit, index) => (
                <HabitCard3D key={habit.id} habit={habit} delay={index * 0.05} onComplete={() => handleHabitComplete(habit.id)} onDelete={() => handleDeleteHabit(habit.id)} onStreakChange={(amount) => handleHabitStreakChange(habit.id, amount)} />
              ))}
            </AnimatePresence>
           </motion.div>
           
           {habits.length === 0 && !isAdding && (
             <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4"><LayoutGrid className="w-8 h-8 text-gray-600" /></div><p className="text-gray-400 text-xl font-medium">Aktif alışkanlık bulunmuyor.</p><p className="text-gray-600 mt-2">Demirhane soğuk. Ateşi harlamak için bir alışkanlık ekle.</p>
             </motion.div>
           )}
        </section>

        {/* --- YENİ EKLENEN KISIM: HISTORY TABLE (Geçmiş Aktiviteler) --- */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
             <History className="w-6 h-6 text-electric" />
             <h2 className="text-2xl font-bold text-white">Geçmiş Aktiviteler</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl">
            {historyLogs.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-5 font-medium">Alışkanlık</th>
                                <th className="p-5 font-medium text-right">Tamamlanan Tarih</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {historyLogs.map((log, index) => (
                                <motion.tr 
                                    key={log.id} 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="p-5 flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{log.icon}</span>
                                        <span className="font-medium text-white">{log.name}</span>
                                    </td>
                                    <td className="p-5 text-right font-mono text-electric">
                                        <div className="flex items-center justify-end gap-2">
                                            <Calendar className="w-4 h-4 opacity-50" />
                                            {/* Tarihi Türkçe Formatında Göster (Gün.Ay.Yıl) */}
                                            {new Date(log.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-12 text-center text-gray-500">
                    Henüz hiç aktivite kaydı bulunmuyor. Bir alışkanlığı tamamladığında burada görünecek.
                </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}