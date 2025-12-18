"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Activity, Shield, Trash2, Key, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [stats, setStats] = useState({ totalUsers: 0, totalHabits: 0, totalXP: 0 });
  const [users, setUsers] = useState<any[]>([]);
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // --- INIT ---
  useEffect(() => {
    // 1. Güvenlik Kontrolü: LocalStorage'dan yetkiyi kontrol et
    const userId = localStorage.getItem("currentUserId");
    if (!userId) {
      router.push("/login");
      return;
    }

    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) throw new Error("Yetkisiz erişim");
      const data = await res.json();
      setStats(data.stats);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // router.push("/dashboard"); // Hata verirse dashboarda at
    }
  };

  // --- ACTIONS ---

  const handleUpdatePassword = async (userId: number) => {
    if (!newPassword.trim()) return;

    await fetch("/api/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId: userId, newPassword }),
    });

    setEditingId(null);
    setNewPassword("");
    alert("Şifre güncellendi!");
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;

    await fetch(`/api/admin?id=${userId}`, { method: "DELETE" });
    fetchAdminData(); // Listeyi yenile
  };

  if (loading) return <div className="h-screen bg-void flex items-center justify-center text-white">Yönetici Paneli Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-void text-gray-200 p-8">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-electric" /> 
              Yönetici Konsolu
            </h1>
            <p className="text-gray-500 mt-1">Sistem Genel Bakışı & Kullanıcı Yönetimi</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Panele Dön
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Users className="text-neon" />} label="Toplam Kullanıcı" value={stats.totalUsers} />
          <StatCard icon={<Activity className="text-electric" />} label="Takip Edilen Alışkanlık" value={stats.totalHabits} />
          <StatCard icon={<div className="text-energyGold font-bold text-xl">XP</div>} label="Üretilen Global XP" value={stats.totalXP.toLocaleString()} />
        </div>

        {/* User Management Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Kayıtlı Kullanıcılar</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/20 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="p-6">ID</th>
                  <th className="p-6">Kullanıcı Bilgisi</th>
                  <th className="p-6">İstatistikler</th>
                  <th className="p-6">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-mono text-gray-500">#{user.id}</td>
                    <td className="p-6">
                      <div className="font-bold text-white">{user.name}</div>
                      <div className="text-sm text-gray-500">@{user.username}</div>
                      {user.isAdmin && <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-electric/20 text-electric font-bold border border-electric/30">YÖNETİCİ</span>}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300">{user.habitCount} Alışkanlık</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        
                        {/* Password Edit Logic */}
                        {editingId === user.id ? (
                          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                            <input 
                              type="text" 
                              placeholder="Yeni şifre..." 
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-black/40 border border-white/20 rounded px-2 py-1 text-sm text-white w-32 focus:border-electric outline-none"
                            />
                            <button onClick={() => handleUpdatePassword(user.id)} className="p-1.5 bg-completionGreen text-black rounded hover:opacity-90">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-white/10 text-white rounded hover:bg-white/20">
                              X
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setEditingId(user.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-sm"
                          >
                            <Key className="w-3 h-3" /> Şifre Sıfırla
                          </button>
                        )}

                        {!user.isAdmin && (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                            title="Kullanıcıyı Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Yardımcı Ufak Bileşen
function StatCard({ icon, label, value }: { icon: any, label: string, value: string | number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:bg-white/10 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">{label}</p>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
    </motion.div>
  );
}