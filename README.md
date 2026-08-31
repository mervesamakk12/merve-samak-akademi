# 🎓 Merve SAMAK AKADEMİ | Ortaokul Matematik & Materyal Portalı

> **5, 6, 7 ve 8. Sınıf** öğrencileri ve matematik öğretmenleri için hazırlanmış interaktif ders notları, çalışma kağıtları, akıllı tahta GeoGebra simülasyonları, MEB yazılı sınav provaları ve zeka oyunları platformu.

---

## 🌟 Öne Çıkan Özellikler

- **📱 Tek Sayfa Uygulama (SPA):** Sayfa yenilenmeden anında geçiş sağlayan hızlı hash-tabanlı yönlendirme (`#home`, `#blog`, `#categories`, `#about`, `#contact`, `#admin`).
- **🎯 Sınıf Kademelerine Özel Filtreleme:** 5. Sınıf, 6. Sınıf, 7. Sınıf ve 8. Sınıf (LGS) seviyelerine tek tıkla filtreleme.
- **📂 Dinamik Kategori & İçerik Yönetimi:** Çalışma Kağıtları, Akıllı Tahta, Sınav Provaları, Zeka Oyunları ve Dijital Testler için anlık filtreleme ve sayaçlar.
- **🛠️ Kullanıcı Dostu Yönetici (Admin) Paneli:**
  - **Dashboard:** Toplam yazı ve kategori istatistikleri, `.json` tek tıkla veri yedekleme ve geri yükleme.
  - **Yazı Yönetimi:** Yeni ders materyali ekleme, mevcut yazıları düzenleme, silme ve önizleme.
  - **Kategori Yönetimi:** Yeni kategori açma, listeleme ve silme.
- **🌓 Gece / Gündüz Teması (Dark & Light Mode):** Mor & Macenta degradeli koyu tema ve tek tıkla geçilebilen aydınlık tema (`localStorage` ile kalıcı).
- **🔤 Temiz ASCII Linklendirme:** Tüm rotalar, ID'ler ve slug'lar Türkçe karakterlerden arındırılmış İngiliz alfabesi (ASCII) standartlarındadır.

---

## 🚀 Hızlı Başlangıç

Bu proje herhangi bir derleme (build) veya sunucu kurulumu gerektirmez. Standart modern web tarayıcılarında doğrudan çalışır.

### Seçenek 1: Doğrudan Tarayıcıda Açma
Proje klasöründeki `index.html` dosyasını çift tıklayarak tarayıcınızda açabilirsiniz.

### Seçenek 2: Yerel HTTP Sunucusu ile Çalıştırma
Terminalde proje dizinine girip Python ile yerel sunucuyu başlatabilirsiniz:
```bash
python -m http.server 3000
```
Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

---

## 🔑 Yönetici (Admin) Paneli Giriş Bilgileri

- **Admin URL:** `http://localhost:3000/admin` veya `http://localhost:3000/#admin`
- **Kullanıcı Adı:** `admin` *(veya `merve`)*
- **Şifre:** `123456` *(veya `akademi2026`)*

---

## 📁 Proje Dosya Yapısı

```
ms-akademi-site/
│
├── index.html              # Ana SPA şablonu ve görünümler
├── admin/
│   └── index.html          # /admin doğrudan erişim yönlendiricisi
├── css/
│   └── style.css           # Özel stiller, tema değişkenleri ve animasyonlar
├── js/
│   ├── data.js             # Veri katmanı, ders içerikleri ve toAsciiSlug motoru
│   ├── app.js              # SPA router, arama, filtreleme ve sayfa render motoru
│   └── admin.js            # Yönetim paneli işlemleri ve CRUD fonksiyonları
├── assets/
│   └── logo.png            # Merve SAMAK AKADEMİ sonsuzluk logosu
├── .gitignore              # Git tarafından yok sayılacak dosyalar
└── README.md               # Proje tanıtım ve dokümantasyon dosyası
```

---

## 🌐 GitHub Pages Üzerinde Yayınlama

1. GitHub'da yeni bir repository (depo) oluşturun.
2. Projeyi GitHub'a push edin:
   ```bash
   git init
   git add .
   git commit -m "feat: Merve SAMAK AKADEMI portal yayina hazir"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   git push -u origin main
   ```
3. GitHub deponuzun **Settings > Pages** sekmesine gidin.
4. **Branch** kısmından `main` / `root` seçip **Save** butonuna tıklayın.
5. Siteniz birkaç dakika içinde `https://KULLANICI_ADINIZ.github.io/REPO_ADINIZ` adresinde ücretsiz olarak canlıya alınacaktır.

---

## 📄 Lisans & Telif

© 2026 **Merve SAMAK AKADEMİ**. Tüm hakları saklıdır.  
Ortaokul matematik eğitimi ve öğrencileri için sevgiyle geliştirilmiştir.
