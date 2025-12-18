```markdown
# 🛡️ HabitForge v2.0 — Oyunlaştırılmış Alışkanlık Takip Platformu

![Project Banner](https://i.hizliresim.com/t5zg57g.png)

> **“Alışkanlıklarınızı inşa edin, seviye atlayın ve en iyi versiyonunuza dönüşün.”**

---

## 🎓 Proje Künyesi ve Takım Üyeleri

Bu proje, **Osmaniye Korkut Ata Üniversitesi** Mühendislik Fakültesi **4. Sınıf Yazılım Mühendisliği** dersi kapsamında geliştirilmiştir.

**Proje Ekibi:**
*   **Hatice TATLI**
*   **Gülcan ÖZKUL**
*   **Hatice Kübra BİLGİN**

---

## 📖 Proje Özeti

**HabitForge**, kullanıcıların günlük rutinlerini ve alışkanlıklarını takip etmelerini sağlayan; bu süreci **oyunlaştırma (gamification)** dinamikleriyle birleştirerek sürekliliği teşvik eden modern bir web uygulamasıdır.

Klasik yapılacaklar listelerinin aksine, HabitForge:
- Anlık geri bildirimler sunar.
- Tamamlanan görevler için **XP (Deneyim Puanı)** kazandırır.
- **Streak (zincir)** sistemi ile devamlılığı teşvik eder.
- Bir **RPG oyunu** mantığında seviye atlatır.

---

## 🚀 Kullanılan Teknolojiler ve Mimari

Proje; modern web standartlarına uygun, **modüler ve ölçeklenebilir** bir mimari üzerine inşa edilmiştir.

### ⚡ Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Tasarım)
- **Animasyon:** [Framer Motion](https://www.framer.com/motion/)
- **3D Görselleştirme:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Backend:** Next.js API Routes (Node.js tabanlı REST API simülasyonu)
- **Veritabanı:** JSON File System (Yerel test için NoSQL simülasyonu)

---

## ⚙️ Temel Özellikler (Features)

### 🔐 1. Rol Tabanlı Güvenlik (RBAC)
- **Admin Paneli:** Yalnızca yönetici yetkisine sahip kullanıcılar erişebilir.
- **Kullanıcı Dashboard:** Standart kullanıcılar kendi panellerine erişir.
- **Güvenli Yönlendirme:** Giriş anında kullanıcı rolüne göre (`isAdmin`) otomatik yönlendirme yapılır.

### 🎮 2. Gelişmiş Oyunlaştırma Algoritması
Kullanıcı bağlılığını artırmak için matematiksel kurallar uygulanmıştır:

**Streak Çarpanı (Multiplier):**
```math
Kazanılan XP = (Mevcut Streak + 1) × 100
```

**Dinamik Level Sistemi:**
- Seviye atladıkça gereken XP **%50 oranında artar**.
- Sistem, **progressive overload** mantığıyla kullanıcıyı uzun vadede motive edecek şekilde tasarlanmıştır.

### 📊 3. İnteraktif Dashboard ve 3D
- **3D XP Halkası:** Three.js tabanlı seviye ilerleme görselleştirmesi.
- **CRUD İşlemleri:** Alışkanlık ekleme, silme ve güncelleme.
- **Konfeti Efekti:** Görev tamamlandığında kullanıcıyı ödüllendiren görsel animasyon.

### 🛠️ 4. Profil Yönetimi
- Kullanıcı adı, avatar ve şifre güncelleme.
- **Hesap Silme:** Kullanıcının tüm verileri (habitler, XP, level) sistemden kalıcı olarak kaldırılır.

---

## 📂 Dosya Yapısı

```bash
HabitForge/
├── app/
│   ├── api/              # Backend API Servisleri
│   ├── dashboard/        # Kullanıcı Ana Paneli
│   ├── admin/            # Yönetici Paneli
│   ├── login/            # Giriş Sayfası
│   └── onboarding/       # Tanıtım & Avatar Seçimi
├── components/
│   ├── 3d/               # 3D Objeler (Three.js)
│   └── ui/               # UI Bileşenleri
├── data/
│   └── db.json           # Yerel JSON Veritabanı
└── lib/
    └── helpers.ts        # Algoritmalar & Yardımcı Fonksiyonlar
```

---

## 🖥️ Kurulum ve Çalıştırma

### 1️⃣ Projeyi Klonlayın
```bash
git clone https://github.com/kullaniciadiniz/habitforge.git
cd habitforge
```

### 2️⃣ Gerekli Paketleri Yükleyin
```bash
npm install
# veya
yarn install
```

### 3️⃣ Uygulamayı Başlatın
```bash
npm run dev
```

### 4️⃣ Tarayıcıda Açın
[http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Hesapları

| Rol | Kullanıcı Adı | Şifre | Yetki |
| :--- | :--- | :--- | :--- |
| **Standart Kullanıcı** | hatice | hatice | Dashboard, Profil |
| **Yönetici (Admin)** | admin | 123 | Admin Paneli |

---

## 📸 Ekran Görüntüleri

| Giriş Ekranı | Dashboard |
| :---: | :---: |
| ![Giriş Ekranı](public/screenshots/login-placeholder.png) | ![Dashboard](public/screenshots/dashboard-placeholder.png) |
*(Ekran görüntülerini `public/screenshots` klasörüne ekleyip dosya yollarını güncelleyebilirsiniz)*

---

## 🔮 Gelecek Planları (Roadmap)

- [ ] 📱 React Native ile mobil uygulama
- [ ] 🗄️ PostgreSQL veritabanına geçiş
- [ ] 🧑‍🤝‍🧑 Arkadaş ekleme & Leaderboard sistemi
- [ ] 🤖 Yapay zeka destekli alışkanlık önerileri

---

## 📄 Lisans

Bu proje, **Osmaniye Korkut Ata Üniversitesi Yazılım Mühendisliği** bölümü dersi kapsamında hazırlanmıştır.

**© HabitForge v2.0**
```
