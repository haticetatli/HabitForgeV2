"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Lock, Mail, Trash2, MessageSquare, Save, AlertTriangle } from "lucide-react";

interface ProfileModalProps {
  user: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void;
  onDeleteAccount: () => void;
}

export function ProfileModal({ user, onClose, onUpdate, onDeleteAccount }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  
  // Form States
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(""); // Boş gelmesi normal, sadece değiştirirse dolu gider
  const [feedback, setFeedback] = useState("");

  const handleSave = () => {
    // Sadece değişen verileri gönder
    const updates: any = {};
    if (name !== user.name) updates.name = name;
    if (email !== user.email) updates.email = email;
    if (password) updates.password = password;

    onUpdate(updates);
    alert("Profil güncellendi!");
  };

  const handleFeedback = () => {
    alert("Geri bildiriminiz için teşekkürler! (Simülasyon)");
    setFeedback("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-[#09090B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]"
      >
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white mb-6 px-2">Ayarlar</h2>
          
          <TabButton active={activeTab === "general"} onClick={() => setActiveTab("general")} icon={<User size={18} />} label="Genel" />
          <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={<Lock size={18} />} label="Güvenlik" />
          <TabButton active={activeTab === "feedback"} onClick={() => setActiveTab("feedback")} icon={<MessageSquare size={18} />} label="Geri Bildirim" />
          
          <div className="mt-auto">
            <TabButton active={activeTab === "danger"} onClick={() => setActiveTab("danger")} icon={<Trash2 size={18} />} label="Tehlike Bölgesi" danger />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>

          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-white mb-4">Profil Bilgileri</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Görünen Ad</label>
                <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-500 h-5 w-5" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-electric outline-none transition"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">E-posta Adresi</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-500 h-5 w-5" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-electric outline-none transition"
                    />
                </div>
              </div>

              <button onClick={handleSave} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition flex items-center gap-2">
                <Save size={18} /> Değişiklikleri Kaydet
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-white mb-4">Güvenlik</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Yeni Şifre</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-500 h-5 w-5" />
                    <input 
                      type="password" 
                      value={password}
                      placeholder="Mevcut şifreyi korumak için boş bırak"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-electric outline-none transition"
                    />
                </div>
              </div>

              <button onClick={handleSave} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition flex items-center gap-2">
                <Save size={18} /> Şifreyi Güncelle
              </button>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-white mb-4">Geri Bildirim Gönder</h3>
              <p className="text-gray-400">Bir hata mı buldun yoksa bir önerin mi var? Bize bildir!</p>
              
              <textarea 
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Düşüncelerin..."
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-electric outline-none transition resize-none"
              />

              <button onClick={handleFeedback} className="px-6 py-3 bg-electric text-black font-bold rounded-xl hover:bg-neon transition">
                Geri Bildirim Gönder
              </button>
            </div>
          )}

          {activeTab === "danger" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <AlertTriangle /> Tehlike Bölgesi
              </h3>
              
              <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl">
                <h4 className="text-white font-bold mb-2">Hesabı Sil</h4>
                <p className="text-gray-400 text-sm mb-6">
                  Hesabını sildikten sonra geri dönüş yoktur. Tüm alışkanlıkların, serilerin ve XP'lerin kalıcı olarak silinecektir.
                </p>
                <button 
                    onClick={() => {
                        if(confirm("KESİNLİKLE emin misin? Bu işlem geri alınamaz.")) {
                            onDeleteAccount();
                        }
                    }}
                    className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/50 font-bold rounded-xl hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                >
                  <Trash2 size={18} /> Hesabımı Sil
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, danger = false }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active 
                ? danger ? "bg-red-500/10 text-red-400" : "bg-white text-black"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
        >
            {icon}
            {label}
        </button>
    )
}