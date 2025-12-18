# 🛡️ HabitForge v2.0 — Oyunlaştırılmış Alışkanlık Takip Platformu

![HabitForge Banner](https://raw.githubusercontent.com/haticetatli/HabitForgeV2/main/banner.PNG)

> **“Alışkanlıklarınızı inşa edin, seviye atlayın ve en iyi versiyonunuza dönüşün.”**

---

## 🎓 Proje Künyesi

Bu proje, **Osmaniye Korkut Ata Üniversitesi**  
Mühendislik Fakültesi – **Yazılım Mühendisliği**  
**4. sınıf dersi** kapsamında geliştirilmiştir.

### 👥 Proje Ekibi
- **Hatice Tatlı**
- **Gülcan Özkul**
- **Hatice Kübra Bilgin**

---

## 📖 Proje Özeti

**HabitForge**, kullanıcıların günlük alışkanlıklarını takip etmelerini sağlayan ve bu süreci **oyunlaştırma (gamification)** mekanikleriyle destekleyen modern bir web uygulamasıdır.

Klasik yapılacaklar uygulamalarından farklı olarak:

- Tamamlanan görevler için **XP (Deneyim Puanı)** kazandırır  
- **Streak (zincir)** sistemi ile sürekliliği teşvik eder  
- Seviye atlama mantığıyla kullanıcıyı motive eder  
- RPG oyunlarından ilham alan bir ilerleme sistemi sunar  

---

## 🚀 Kullanılan Teknolojiler ve Mimari

### ⚡ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS (Glassmorphism)
- **Animasyon:** Framer Motion
- **3D:** React Three Fiber (Three.js)
- **Backend:** Next.js API Routes
- **Veri:** Yerel JSON dosyası

> ⚠️ Bu proje eğitim amaçlıdır. Veriler kalıcı bir veritabanı yerine yerel dosyalarda tutulmaktadır.

---

## ⚙️ Temel Özellikler

### 🔐 Rol Tabanlı Erişim
- Admin Paneli
- Kullanıcı Dashboard
- Rol bazlı yönlendirme

### 🎮 Oyunlaştırma Sistemi
```text
Kazanılan XP = (Mevcut Streak + 1) × 100
```

- XP & Level sistemi
- Streak takibi
- Görsel geri bildirimler

---

## 📂 Proje Yapısı

```bash
HabitForgeV2/
├── app/
├── components/
├── data/
├── lib/
└── banner.PNG
```

---

## 🖥️ Kurulum ve Çalıştırma

### 1️⃣ Projeyi Klonla
```bash
git clone https://github.com/haticetatli/HabitForgeV2.git
cd HabitForgeV2
```

### 2️⃣ Bağımlılıkları Kur
```bash
npm install
```

### 3️⃣ Çalıştır
```bash
npm run dev
```

### 4️⃣ Tarayıcıdan Aç
```
http://localhost:3000
```

---

## 🧪 Test Hesapları

| Rol | Kullanıcı | Şifre |
|---|---|---|
| Kullanıcı | hatice | hatice |
| Admin | admin | 123 |

---

## 📄 Lisans

Bu proje, Osmaniye Korkut Ata Üniversitesi Yazılım Mühendisliği bölümü dersi kapsamında hazırlanmıştır.

**© HabitForge v2.0**
