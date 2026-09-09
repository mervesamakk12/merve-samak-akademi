# 🎓 Merve SAMAK AKADEMİ | 8. Sınıf LGS Matematik & Materyal Portalı

> **8. Sınıf (LGS)** öğrencileri ve matematik öğretmenleri için hazırlanmış kapsamlı konu anlatımları, yeni nesil soru fasikülleri (PDF), interaktif LGS soru dünyası, matematik oyunları ve yapay zeka destekli hedef & net koçluğu platformu.

🌐 **Canlı Site:** [https://merve-samak-akademi.vercel.app/](https://merve-samak-akademi.vercel.app/)

---

## 🌟 Öne Çıkan Özellikler ve Modüller

1. **📖 Konu Notları (Özet & Püf Noktalar):** 
   - 8. Sınıf LGS tüm ünitelerine (Çarpanlar ve Katlar, Üslü İfadeler, Kareköklü İfadeler, Veri Analizi, Basit Olayların Olma Olasılığı, Cebirsel İfadeler ve Özdeşlikler, Doğrusal Denklemler ve Eğim, Eşitsizlikler, Üçgenler) ait formül kartları, kritik MEB püf noktaları ve tuzak nokta uyarıları.
   - KaTeX destekli matematik formülleri ($$a^m \cdot a^n = a^{m+n}$$, $\sqrt{a^2 \cdot b} = a\sqrt{b}$, vb.).

2. **🎯 Soru Dünyası (Kazanım & LGS Yeni Nesil Testler):**
   - Her konu için iki farklı seviye filtresi: **Kazanım Kavrama** ve **LGS Yeni Nesil Beceri Temelli**.
   - Anında doğru/yanlış geri bildirimi, detaylı MEB mantığıyla çözüm açıklaması ve ipucu desteği.

3. **🎮 Matematik Oyunları:**
   - **Kök Avcısı:** Kareköklü ifadelerin hangi iki tam sayı arasında olduğunu ve kime daha yakın olduğunu tahmin etme oyunu.
   - **EBOB-EKOK Eşleştirme:** Sayı çiftleriyle bunların EBOB ve EKOK değerlerini bulma hafıza kart oyunu.

4. **📈 Hedef & Net Koçu (Deneme Analiz & Akıllı Reçete):**
   - 20 soruluk LGS Matematik deneme analizi.
   - Doğru/yanlış girişine göre net hesaplama, hedef lise belirleme, başarı yüzdesi grafiği ve eksik kazanımlara göre otomatik kişiselleştirilmiş çalışma reçetesi.

5. **📥 8. Sınıf Konu Anlatımı & Soru Fasikülü (PDF):**
   - Her LGS ünitesi için doğrudan indirilebilir ve yazdırılabilir çalışma kağıtları, konu özetleri ve 50'şer soruluk yeni nesil soru fasikülleri.

6. **🛠️ Kullanıcı Dostu Yönetici (Admin) Paneli:**
   - **/admin** adresi üzerinden erişilebilen, teknik bilgi gerektirmeyen yönetim paneli.
   - Yeni ders materyali ve soru fasikülü ekleme, düzenleme, silme, LGS ünite etiketleme, JSON veri yedekleme ve geri yükleme.

7. **🌓 Gece / Gündüz Teması (Dark & Light Mode):**
   - Mor & Macenta degradeli koyu tema ve tek tıkla geçilebilen aydınlık tema (`localStorage` ile kalıcı).

8. **🔤 Temiz ASCII Linklendirme:**
   - Tüm rotalar, ID'ler ve slug'lar Türkçe karakterlerden arındırılmış İngiliz alfabesi (ASCII) standartlarındadır.

---

## 🚀 Hızlı Başlangıç

Bu proje herhangi bir derleme (build) veya harici sunucu kurulumu gerektirmez.

### Yerel HTTP Sunucusu ile Çalıştırma:
```bash
python -m http.server 3000
```
Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 🔑 Yönetici (Admin) Paneli Giriş Bilgileri

- **Admin URL:** `http://localhost:3000/admin` veya `/#admin`
- **Kullanıcı Adı:** `admin` *(veya `merve`)*
- **Şifre:** `123456` *(veya `akademi2026`)*

---

## 📁 Proje Dosya Yapısı

```
ms-akademi-site/
│
├── index.html              # Ana SPA şablonu, 8. sınıf modülleri ve görünümler
├── admin/
│   └── index.html          # /admin doğrudan erişim yönlendiricisi
├── css/
│   └── style.css           # Özel stiller, tema değişkenleri ve animasyonlar
├── js/
│   ├── data.js             # 8. Sınıf LGS veri katmanı ve toAsciiSlug motoru
│   ├── modules-data.js     # LGS Konu Notları & Test Soruları veri tabanı
│   ├── notes.js            # Konu Notları modül yöneticisi ve KaTeX render
│   ├── questions.js        # Soru Dünyası interaktif test motoru
│   ├── games.js            # Kök Avcısı & EBOB-EKOK oyunları
│   ├── coach.js            # Hedef & Net Koçu ve deneme analiz motoru
│   ├── admin.js            # Yönetim paneli CRUD işlemleri
│   └── app.js              # SPA router, arama ve sayfa render motoru
├── assets/
│   └── logo.png            # Merve SAMAK AKADEMİ sonsuzluk logosu
├── .gitignore              # Git yapılandırması
└── README.md               # Proje tanıtım ve dokümantasyon dosyası
```

---

## 📄 Lisans & Telif

© 2026 **Merve SAMAK AKADEMİ**. Tüm hakları saklıdır.  
8. Sınıf LGS Matematik eğitimi ve öğrencileri için sevgiyle geliştirilmiştir.
