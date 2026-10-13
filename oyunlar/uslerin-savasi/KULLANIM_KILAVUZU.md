# ⚡ ÜSLERİN SAVAŞI: DİJİTAL MATEMATİK YARIŞMASI
## 8. Sınıf Matematik — Üslü İfadeler Ünitesi Öğretmen Kullanım Kılavuzu

Bu web tabanlı eğitsel oyun, **8. sınıf Üslü İfadeler** ünitesi için tasarlanmış, akıllı tahta (interaktif tahta), projeksiyon, bilgisayar ve tablet uyumlu, iki takımlı canlı bir sınıf yarışması uygulamasıdır.

---

### 🚀 HIZLI BAŞLANGIÇ
1. `index.html` dosyasını Google Chrome, Microsoft Edge veya herhangi bir modern tarayıcıda **çift tıklayarak** açın.
2. İnternet bağlantısı gerektirmez; **%100 çevrimdışı** çalışır. Sesler ve konfeti animasyonları doğrudan tarayıcı tarafından üretilir.
3. Akıllı tahtada ekranın sağ üst köşesindeki **⛶ Tam Ekran** butonuna basarak tam ekran moduna geçebilirsiniz.

---

### 👥 YARIŞMA DÜZENİ VE KURALLAR
* **PEMBE TAKIM:** Kızlar
* **MAVİ TAKIM:** Erkekler
* **Sırayla Yarışma:** Ekranda her turda yalnızca yarışan takımın adı, sorusu ve süresi gösterilir.
* **Canlı Skor Tablosu:** Üst panelde toplam puanlar, doğru/yanlış sayıları ve kazanılan rozetler anlık olarak güncellenir.
* **Öğretici Dönüt & İkinci Şans (Retry):**
  - **İlk denemede yanlış:** Sistem öğrenciye eksi puan vermez; pedagojik bir ipucu sunar ve takım arkadaşlarıyla kısaca tartışarak **2. kez deneme hakkı** verir.
  - **İkinci denemede de yanlış:** Sistematik çözüm adımları ve kural açıklaması tahtada gösterilir; öğrenme desteklenir.
* **Takım İpucu Hakkı (Joker):**
  - Her takım her seviyede **1 kez ücretsiz ipucu** kullanabilir. İpucu puanı düşürmez!

---

### 🏆 SEVİYE SİSTEMİ (%70 BARAJI VE ROZETLER)
Yarışma 4 ana seviye ve gerekirse 1 Altın Soru seviyesinden oluşur:

1. **SEVİYE 1 — Matematik Isınması (10 Puan / Soru):**
   - Pozitif/negatif kuvvetler, sıfırıncı kuvvet, negatif taban ve parantez ilişkisi.
   - Rozet: 🌟 *Isınma Şampiyonu*
2. **SEVİYE 2 — Üs Ustaları (20 Puan / Soru):**
   - Aynı tabanlı çarpmada üsleri toplama, bölmede çıkarma, üssün üssü, negatif üs.
   - Rozet: ⚡ *Üs Ustası*
3. **SEVİYE 3 — Zekâ Kapıları (30 Puan / Soru):**
   - Taban dönüştürme, çok adımlı işlemler, hatalı adımı bulma, basamak sayısı analizi.
   - Rozet: 🧠 *Zekâ Kapısı Fatihi*
4. **SEVİYE 4 — LGS Şampiyonlar Ligi (40 Puan / Soru):**
   - Bilimsel gösterim, çok büyük/küçük sayılar, kağıt katlama/alan, bakteri üremesi ve veri depolama problemleri.
   - Rozet: 🏆 *LGS Efsanesi*
5. **ALTIN SORU (Eşitlik Bozma - 50 Puan):**
   - Eğer yarışma sonunda iki takımın puanı eşit olursa otomatik devreye girer.

> **Baraj Kuralı:** Bir seviyedeki 5 sorudan en az %70'ini (en az 4 soru) doğru cevaplayan takım bir üst seviyeye geçer. Geçemeyen takıma aynı kazanımları pekiştiren 3 adet alternatif telafi sorusu yöneltilir. Diğer takım kendi seviyesinde yarışmaya devam eder.

---

### 🎓 ÖĞRETMEN MASASI (YÖNETİM PANELİ)
Ekranın sağ üst köşesindeki **🎓 Öğretmen Masası** butonuna tıklayarak açabilirsiniz:
* **Süre Kontrolleri:** Süreyi duraklatma / devam ettirme, +15 saniye ekleme, soru süresini (30s, 45s, 60s, 90s, Süresiz) değiştirme.
* **Cevap Müdahalesi:** Soruyu anında tahtada açma, soruyu doğru kabul etme, yanlış kabul etme veya soruyu atlama.
* **Puan Müdahalesi:** Pembe ve Mavi takımlara manuel olarak +10 / -10 puan ekleme/çıkarma.
* **Doğrudan Seviye Seçimi:** İstenen seviyeye (1, 2, 3, 4 veya Altın Soru) anında geçiş yapma.
* **Sınıf Kazanım Raporu:** Sınıfın MEB kazanım analizini görüntüleme ve yazdırma / PDF kaydetme (`window.print()`).
* **Sıfırlama:** Oyunu sıfırdan başlatma.

---

### 📱 AKILLI TAHTA ÖZELLİKLERİ
* **Sanal Dokunmatik Tuş Takımı:** Boşluk doldurma sorularında klavye aramaya gerek kalmadan ekrandaki sanal tuş takımından rakam, eksi, virgül ve bölü işaretleri girilebilir.
* **Görsel Eşleştirme Kartları:** Sol ve sağ sütundaki kartlara dokunularak interaktif eşleştirme yapılır.
* **Hatalı Adımı Bulma:** İşlem adımlarına doğrudan dokunularak hata yapılan adım seçilir.
