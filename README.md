# 🛡️ HabitForge v2.0 — Oyunlaştırılmış Alışkanlık Takip Platformu

![HabitForge Banner](https://raw.githubusercontent.com/haticetatli/HabitForgeV2/main/banner.PNG)

> **“Alışkanlıklarınızı inşa edin, seviye atlayın ve en iyi versiyonunuza dönüşün.”**

---

## 🎓 Proje Künyesi

Bu proje, **Osmaniye Korkut Ata Üniversitesi**  
Mühendislik Fakültesi – **Yazılım Mühendisliği**  
**4. sınıf dersi** kapsamında geliştirilmiştir.

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

Proje, modern web teknolojileri kullanılarak **modüler ve ölçeklenebilir** bir mimariyle geliştirilmiştir.

### ⚡ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS (Glassmorphism tasarım yaklaşımı)
- **Animasyon:** Framer Motion
- **3D Görselleştirme:** React Three Fiber (Three.js)
- **Backend:** Next.js API Routes (Node.js tabanlı)
- **Veri Yönetimi:** JSON File System (yerel geliştirme ve test amaçlı)

> ⚠️ Bu proje eğitim amaçlıdır. Veriler yerel JSON dosyaları üzerinde tutulmaktadır.

---

## ⚙️ Temel Özellikler

### 🔐 Rol Tabanlı Erişim (RBAC)
- **Admin Paneli:** Yalnızca yönetici yetkisine sahip kullanıcılar erişebilir
- **Kullanıcı Dashboard:** Standart kullanıcı arayüzü
- Giriş sırasında kullanıcı rolüne göre otomatik yönlendirme

### 🎮 Oyunlaştırma Sistemi
- XP kazanımı
- Streak (üst üste gün tamamlama) sistemi
- Dinamik seviye atlama algoritması

**XP Hesaplama Formülü:**
```
Kazanılan XP = (Mevcut Streak + 1) × 100
```

### 📊 Dashboard & Görselleştirme
- 3D XP ilerleme halkası
- Alışkanlık ekleme / silme / güncelleme (CRUD)
- Görev tamamlandığında animasyon ve konfeti efektleri

### 🛠️ Profil Yönetimi
- Kullanıcı bilgilerini güncelleme
- Hesap silme (tüm veriler kalıcı olarak kaldırılır)

---

## 📂 Proje Dosya Yapısı

```
HabitForgeV2/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── admin/
│   ├── login/
│   └── onboarding/
├── components/
│   ├── 3d/
│   └── ui/
├── data/
│   └── db.json
├── lib/
│   └── helpers.ts
└── banner.PNG
```

---

## 🖥️ Kurulum ve Çalıştırma

Bu proje **Node.js** tabanlıdır.  
Bilgisayarınızda **Node.js (v18 veya üzeri)** kurulu olmalıdır.

### 1️⃣ Projeyi Klonlayın
```
git clone https://github.com/haticetatli/HabitForgeV2.git
cd HabitForgeV2
```

### 2️⃣ Bağımlılıkları Yükleyin
```
npm install
```

### 3️⃣ Geliştirme Ortamında Çalıştırın
```
npm run dev
```

### 4️⃣ Tarayıcıdan Açın
```
http://localhost:3000
```

---

## 🧪 Test Hesapları

| Rol | Kullanıcı Adı | Şifre | Yetki |
|---|---|---|---|
| Kullanıcı | hatice | hatice | Dashboard |
| Admin | admin | 123 | Admin Paneli |

---

## 🔮 Gelecek Geliştirmeler (Roadmap)

- [ ] Mobil uygulama (React Native)
- [ ] PostgreSQL veritabanına geçiş
- [ ] Leaderboard & arkadaş sistemi
- [ ] Yapay zeka destekli alışkanlık önerileri

---

## 📄 Lisans

Bu proje, **Osmaniye Korkut Ata Üniversitesi Yazılım Mühendisliği** bölümü dersi kapsamında hazırlanmıştır.

**© HabitForge v2.0**
