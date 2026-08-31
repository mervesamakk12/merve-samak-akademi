/**
 * Merve SAMAK AKADEMİ - Veri Motoru ve Ders Materyali Portalı
 * Hedef Kitle: 5, 6, 7 ve 8. Sınıf Ortaokul Matematik Öğrencileri ve Öğretmenleri
 */

const DEFAULT_ACADEMY_DATA = {
  author: {
    name: "Merve SAMAK",
    title: "Ortaokul Matematik Öğretmeni",
    avatar: "assets/logo.png",
    bio: "Sevgili öğrencilerim ve değerli velilerim; bu platformda 5, 6, 7 ve 8. sınıf matematik derslerimizde kullandığımız ders notlarını, haftalık çalışma kağıtlarını, akıllı tahta GeoGebra uygulamalarını, yazılıya hazırlık testlerini ve zeka oyunlarını sizlerle paylaşıyorum.",
    social: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      telegram: "https://t.me",
      email: "iletisim@mervesamak.com"
    }
  },

  categories: [
    {
      id: "ders-materyalleri",
      name: "Çalışma Kağıtları & Ders Notları",
      icon: "ph-file-text",
      badgeColor: "from-pink-500 to-rose-500",
      description: "5, 6, 7 ve 8. sınıf MEB kazanımlarına uygun konu özetleri, adım adım çözümlü alıştırmalar ve ödev fasikülleri.",
      count: 4
    },
    {
      id: "akilli-tahta",
      name: "Akıllı Tahta & İnteraktif Uygulamalar",
      icon: "ph-chalkboard-teacher",
      badgeColor: "from-purple-500 to-indigo-500",
      description: "Derslerimizde kullandığımız dinamik GeoGebra simülasyonları, görsel modeller ve akıllı tahta test sunuları.",
      count: 3
    },
    {
      id: "yazili-ve-lgs",
      name: "Yazılıya Hazırlık & LGS Denemeleri",
      icon: "ph-exam",
      badgeColor: "from-amber-500 to-orange-500",
      description: "1. ve 2. dönem yazılı sınav provası soru kağıtları, LGS yeni nesil branş denemeleri ve çözüm anahtarları.",
      count: 3
    },
    {
      id: "zeka-oyunlari",
      name: "Akıl & Zeka Oyunları",
      icon: "ph-puzzle-piece",
      badgeColor: "from-fuchsia-500 to-pink-500",
      description: "Matematiksel düşünmeyi ve problem çözme hızını geliştiren haftalık mantık bulmacaları ve zeka oyunları.",
      count: 2
    },
    {
      id: "dijital-odevler",
      name: "Dijital Ödevler & Testler",
      icon: "ph-laptop",
      badgeColor: "from-cyan-500 to-blue-500",
      description: "Evde kendinizi test edebileceğiniz etkileşimli online quizler, Blooket ve Quizizz pekiştirme etkinlikleri.",
      count: 2
    }
  ],

  gradeLevels: [
    { id: "all", name: "Tüm Sınıflar" },
    { id: "5", name: "5. Sınıf" },
    { id: "6", name: "6. Sınıf" },
    { id: "7", name: "7. Sınıf" },
    { id: "8", name: "8. Sınıf (LGS)" }
  ],

  posts: [
    {
      id: "8-sinif-carpanlar-katlar-yeni-nesil-fasikul",
      title: "8. Sınıf Çarpanlar ve Katlar: 2025-2026 LGS Yeni Nesil Çalışma Kağıdı ve PDF Çözümleri",
      slug: "8-sinif-carpanlar-katlar-yeni-nesil-fasikul",
      category: "ders-materyalleri",
      categoryName: "Çalışma Kağıtları & Ders Notları",
      grade: "8",
      gradeName: "8. Sınıf (LGS)",
      date: "31 Ağustos 2026",
      readTime: "5 dk okuma / PDF İndir",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Sevgili 8. sınıf öğrencilerim; LGS matematik yolculuğumuzun ilk ünitesi olan EBOB-EKOK konusunu pekiştirmeniz için hazırladığım beceri temelli çalışma kağıdı ve adım adım çözümler.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili 8. sınıf öğrencilerim; LGS matematik maratonuna güçlü bir başlangıç yapıyoruz! İlk ünitemiz olan <strong>Çarpanlar ve Katlar</strong> konusunda yeni nesil sorulardan korkmamanız için derste işlediğimiz mantığı özetleyen özel bir çalışma fasikülü hazırladım.
          </p>

          <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
            <h4 class="flex items-center gap-2 font-bold text-lg text-pink-400 mb-2">
              <i class="ph ph-check-circle text-xl"></i> Bu Haftaki MEB Kazanımımız (M.8.1.1.2)
            </h4>
            <p class="text-sm">İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer. Gerçek yaşam problemlerinde parçadan bütüne ve bütünden parçaya ilişkisini kurar.</p>
          </div>

          <h3 class="text-2xl font-bold text-white mt-8 mb-4">Fasikülün İçeriğinde Neler Var?</h3>
          <ul class="space-y-3 list-none pl-0">
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>1 Sayfalık Pratik Konu Özeti:</strong> Asal çarpan algoritması ve pratik EBOB-EKOK bulma taktikleri.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>12 Adet Seviye Seviye Soru:</strong> 4 adet temel kavrama, 4 adet orta düzey ve 4 adet tam LGS formatında yeni nesil problem.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>Adım Adım Çözüm Anahtarı:</strong> Takıldığınız sorularda hatanızı görebileceğiniz açıklamalı yanıtlar.</span>
            </li>
          </ul>

          <div class="my-8 p-6 rounded-2xl bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30">
            <h4 class="font-bold text-xl text-white mb-2">💡 Merve Öğretmenden Hatırlatma:</h4>
            <p class="text-gray-300 text-sm leading-relaxed">
              Soruyu okurken verilen sayıları hemen çarpmaya veya bölmeye kalkışmayın. Önce "burada parçalama mı yapılıyor yoksa birleştirme mi?" sorusunu kendinize sorun.
            </p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf Çarpanlar ve Katlar Çalışma Kağıdı indirildi! (Örnek PDF)')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/20 hover:scale-105 transition-all">
              <i class="ph ph-file-pdf text-xl"></i> Çalışma Kağıdını İndir (PDF)
            </a>
            <a href="javascript:void(0)" onclick="alert('Online interaktif test moduna yönlendiriliyorsunuz!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/40 border border-purple-500/30 text-purple-200 font-semibold transition-all">
              <i class="ph ph-laptop text-xl"></i> Kendini Test Et (Online)
            </a>
          </div>
        </div>
      `
    },
    {
      id: "7-sinif-rasyonel-sayilar-geogebra-etkinligi",
      title: "7. Sınıf Rasyonel Sayılarla Dört İşlem: Modelleme ve İnteraktif GeoGebra Etkinliği",
      slug: "7-sinif-rasyonel-sayilar-geogebra-etkinligi",
      category: "akilli-tahta",
      categoryName: "Akıllı Tahta & İnteraktif Uygulamalar",
      grade: "7",
      gradeName: "7. Sınıf",
      date: "28 Ağustos 2026",
      readTime: "4 dk okuma / Uygulama",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      excerpt: "7. sınıf öğrencilerim için rasyonel sayılarda toplama, çıkarma ve çarpma işlemlerini somutlaştıran etkileşimli sayı doğrusu ve alan modelleme uygulaması.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili 7. sınıflarım; rasyonel sayılarda işaret kurallarını ezberlemek yerine sayı doğrusunda hareket ederek keşfediyoruz! Bu etkinlikte telefonunuzdan veya tabletinizden kaydırıcıları hareket ettirerek rasyonel sayı işlemlerinin mantığını görsel olarak inceleyebilirsiniz.
          </p>

          <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
            <h4 class="flex items-center gap-2 font-bold text-lg text-pink-400 mb-2">
              <i class="ph ph-check-circle text-xl"></i> 7. Sınıf Kazanımı (M.7.1.2.1)
            </h4>
            <p class="text-sm">Rasyonel sayılarla toplama ve çıkarma işlemlerini yapar; sayı doğrusu ve alan modelleri üzerinde görselleştirir.</p>
          </div>

          <h3 class="text-2xl font-bold text-white mt-6 mb-3">Evde Uygulama Adımları</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Aşağıdaki "Uygulamayı Aç" butonuna tıklayarak GeoGebra penceresini tam ekran yapın.</li>
            <li>Mavi ve kırmızı noktaları sürükleyerek iki farklı rasyonel sayı seçin.</li>
            <li>"İşlemi Göster" kutucuğunu işaretleyip payda eşitleme aşamalarını adım adım takip edin.</li>
          </ol>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="javascript:void(0)" onclick="alert('GeoGebra Rasyonel Sayı Simülatörü açıldı!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/20 hover:scale-105 transition-all">
              <i class="ph ph-play-circle text-xl"></i> İnteraktif Uygulamayı Başlat
            </a>
            <a href="javascript:void(0)" onclick="alert('7. Sınıf Rasyonel Sayılar Çalışma Kağıdı indirildi!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/40 border border-purple-500/30 text-purple-200 font-semibold transition-all">
              <i class="ph ph-file-pdf text-xl"></i> Pekiştirme Kağıdı (PDF)
            </a>
          </div>
        </div>
      `
    },
    {
      id: "6-sinif-tam-sayilar-ve-mutlak-deger-fasikulu",
      title: "6. Sınıf Tam Sayılar ve Mutlak Değer: Günlük Hayat Problemleri ve Alıştırma Kağıdı",
      slug: "6-sinif-tam-sayilar-ve-mutlak-deger-fasikulu",
      category: "ders-materyalleri",
      categoryName: "Çalışma Kağıtları & Ders Notları",
      grade: "6",
      gradeName: "6. Sınıf",
      date: "25 Ağustos 2026",
      readTime: "4 dk okuma / PDF İndir",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Sıcaklık değerleri, deniz seviyesi ve borç-alacak durumlarıyla tam sayıları somutlaştıran 6. sınıf renkli etkinlik kağıdı.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili 6. sınıflarım; tam sayılar konusuna harika bir giriş yaptık! Termometrede sıfırın altındaki dereceler, asansörde otopark katları ve deniz seviyesinin altındaki derinliklerle negatif sayıların hayatımızdaki yerini öğreniyoruz.
          </p>

          <div class="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200">
            <h4 class="font-bold text-lg mb-1">🎯 Konu Başlıkları:</h4>
            <p class="text-sm">Pozitif ve Negatif Tam Sayılar, Sayı Doğrusunda Sıralama, Mutlak Değerin Uzaklık Anlamı.</p>
          </div>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('6. Sınıf Tam Sayılar Çalışma Kağıdı indirildi!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:opacity-90 transition-all">
              <i class="ph ph-file-pdf text-xl"></i> Çalışma Kağıdını İndir (A4 PDF)
            </a>
          </div>
        </div>
      `
    },
    {
      id: "5-sinif-dogal-sayilar-ve-zihinden-islem-taktikleri",
      title: "5. Sınıf Doğal Sayılar: Zihinden Dört İşlem Stratejileri ve Oyunlu Çalışma Kağıdı",
      slug: "5-sinif-dogal-sayilar-ve-zihinden-islem-taktikleri",
      category: "ders-materyalleri",
      categoryName: "Çalışma Kağıtları & Ders Notları",
      grade: "5",
      gradeName: "5. Sınıf",
      date: "22 Ağustos 2026",
      readTime: "3 dk okuma / PDF İndir",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
      excerpt: "5. sınıf öğrencilerimin işlem hızını 2 katına çıkaracak zihinden toplama ve çarpma taktikleri ve eğlenceli boyama bulmacası.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili 5. sınıf miniklerim; ortaokul matematiğine hoş geldiniz! Bu çalışma kağıdında kağıt kalem kullanmadan kafadan hızlı hesap yapmanın 3 pratik sırrını öğreniyoruz.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <h5 class="font-bold text-pink-400 text-sm">1. Onluğa Tamamlama</h5>
              <p class="text-xs text-gray-300 mt-1">Sayıları 10, 100 veya 1000'e yuvarlayarak hızlı toplama.</p>
            </div>
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <h5 class="font-bold text-pink-400 text-sm">2. Parçalara Ayırma</h5>
              <p class="text-xs text-gray-300 mt-1">Önce onlar basamaklarını, sonra birler basamaklarını toplama.</p>
            </div>
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <h5 class="font-bold text-pink-400 text-sm">3. 5 ile Pratik Çarpma</h5>
              <p class="text-xs text-gray-300 mt-1">Sayıyı önce 10 ile çarpıp ardından 2'ye bölme taktiği.</p>
            </div>
          </div>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('5. Sınıf Zihinden İşlemler Kağıdı indirildi!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold">
              <i class="ph ph-file-pdf text-xl"></i> Eğlenceli Çalışma Kağıdını İndir
            </a>
          </div>
        </div>
      `
    },
    {
      id: "haftanin-akil-ve-zeka-oyunu-sihirli-petekler",
      title: "Haftalık Akıl & Zeka Oyunu: Sihirli Petekler ve Mantık Labirenti (#1)",
      slug: "haftanin-akil-ve-zeka-oyunu-sihirli-petekler",
      category: "zeka-oyunlari",
      categoryName: "Akıl & Zeka Oyunları",
      grade: "all",
      gradeName: "Tüm Sınıflar",
      date: "20 Ağustos 2026",
      readTime: "3 dk / Bulmaca",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Tüm sınıflarımızın çözebileceği, hafta sonu ailenizle veya arkadaşlarınızla yarışabileceğiniz yazdırılabilir mantık bulmacası.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Haftanın zeka oyunu köşemizde bu hafta <strong>Sihirli Petekler</strong> bulmacamız var! Bakalım sınıfımızda bu bulmacayı ilk çözen kim olacak?
          </p>

          <div class="p-5 rounded-2xl bg-fuchsia-950/40 border border-fuchsia-500/30">
            <h4 class="font-bold text-pink-300 text-base mb-2">Kurallar:</h4>
            <ul class="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-200">
              <li>1'den 7'ye kadar rakamları her peteğe birer kez yerleştirin.</li>
              <li>Komşu (birbirine değen) hiçbir iki petekte ardışık sayılar yan yana gelemez.</li>
              <li>Ortadaki petek sayının kilididir!</li>
            </ul>
          </div>

          <div class="pt-4">
            <button onclick="alert('Zeka oyunu çalışma kağıdı indirildi!')" class="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold">
              <i class="ph ph-printer text-xl inline mr-1"></i> Bulmacayı Yazdır (PDF)
            </button>
          </div>
        </div>
      `
    },
    {
      id: "1-donem-1-yaziliya-hazirlik-soru-paketleri",
      title: "1. Dönem 1. Matematik Yazılılarına Hazırlık Fasikülleri (5, 6, 7 ve 8. Sınıf)",
      slug: "1-donem-1-yaziliya-hazirlik-soru-paketleri",
      category: "yazili-ve-lgs",
      categoryName: "Yazılıya Hazırlık & LGS Denemeleri",
      grade: "all",
      gradeName: "Tüm Sınıflar",
      date: "18 Ağustos 2026",
      readTime: "6 dk / Yazılı Provası",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Yazılı haftasında 100 tam puan almanız için MEB'in açık uçlu soru senaryolarına birebir uygun hazırladığım yazılı provası testleri.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili öğrencilerim; okulda yapılacak 1. dönem 1. matematik yazılı sınavlarına eksiksiz hazırlanmanız için her sınıf düzeyine özel MEB açık uçlu sınav senaryolarına uygun prova kağıtları hazırladım.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <h5 class="font-bold text-white text-base">5 ve 6. Sınıflar İçin</h5>
              <p class="text-xs text-gray-300 mt-1">İşlem adımları puanlanan açık uçlu 10 adet klasik matematik sorusu ve puanlama anahtarı.</p>
            </div>
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <h5 class="font-bold text-white text-base">7 ve 8. Sınıflar İçin</h5>
              <p class="text-xs text-gray-300 mt-1">Yeni nesil modelleme ve çok adımlı problem çözme sorularından oluşan 100 puanlık yazılı provası.</p>
            </div>
          </div>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('Yazılı provası paketi indirildi!')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold">
              <i class="ph ph-file-pdf text-xl"></i> Yazılı Provası PDF Paketini İndir
            </a>
          </div>
        </div>
      `
    }
  ],

  faq: [
    {
      q: "Buradaki çalışma kağıtları ve ödevler ücretsiz mi?",
      a: "Evet sevgili öğrencilerim! Sitede paylaştığım tüm ders notları, çalışma kağıtları, akıllı tahta uygulamaları ve yazılı provası testleri tamamen ücretsizdir."
    },
    {
      q: "Ödevlerimi ve çalışma kağıtlarını telefondan açabilir miyim?",
      a: "Evet. Sitedeki tüm PDF dosyaları ve etkileşimli uygulamalar telefon, tablet, bilgisayar ve akıllı tahtalarla %100 uyumludur."
    },
    {
      q: "Çözemediğim soruları Merve Öğretmenime nasıl sorabilirim?",
      a: "Sitemizin 'İletişim' bölümündeki formdan veya derste doğrudan bana sorularınızı iletebilirsiniz."
    },
    {
      q: "Zeka oyunlarının cevaplarını nereden öğrenebilirim?",
      a: "Her pazartesi günü derste ve sitemizin ilgili zeka oyunu sayfasında haftanın şampiyonlarını ve ayrıntılı çözüm adımlarını paylaşıyorum."
    }
  ],

  stats: [
    { number: "5, 6, 7, 8", label: "Tüm Ortaokul Kademeleri", icon: "ph-graduation-cap" },
    { number: "100+ PDF", label: "Ücretsiz Çalışma Kağıdı", icon: "ph-file-pdf" },
    { number: "GeoGebra", label: "İnteraktif Görsel Modeller", icon: "ph-chalkboard-teacher" },
    { number: "LGS & Yazılı", label: "Sınavlara Tam Hazırlık", icon: "ph-exam" }
  ]
};

// İngiliz/ASCII Alfabesine Çevirici (ş, ü, ı, ç, ğ, ö harflerini kaldırır)
function toAsciiSlug(text) {
  if (!text) return '';
  return text.toString()
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/Ü/g, 'u')
    .replace(/ş/g, 's').replace(/Ş/g, 's')
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/ö/g, 'o').replace(/Ö/g, 'o')
    .replace(/ç/g, 'c').replace(/Ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

window.toAsciiSlug = toAsciiSlug;

// LocalStorage Senkronizasyonu
function loadData() {
  const localPosts = localStorage.getItem('ms_academy_posts');
  const localAuthor = localStorage.getItem('ms_academy_author');

  let posts = DEFAULT_ACADEMY_DATA.posts;
  let author = DEFAULT_ACADEMY_DATA.author;

  const localCategories = localStorage.getItem('ms_academy_categories');
  let categories = DEFAULT_ACADEMY_DATA.categories;

  // Başlangıçta yeni verileri yükle
  if (!localPosts || localPosts.includes('ChatGPT')) {
    localStorage.setItem('ms_academy_posts', JSON.stringify(DEFAULT_ACADEMY_DATA.posts));
    posts = DEFAULT_ACADEMY_DATA.posts;
  } else {
    try {
      posts = JSON.parse(localPosts);
      // Link ve slug ASCII kontrolü
      posts = posts.map(p => ({
        ...p,
        id: toAsciiSlug(p.id || p.slug || p.title),
        slug: toAsciiSlug(p.slug || p.id || p.title),
        category: toAsciiSlug(p.category)
      }));
    } catch(e) {
      posts = DEFAULT_ACADEMY_DATA.posts;
    }
  }

  if (!localCategories) {
    localStorage.setItem('ms_academy_categories', JSON.stringify(DEFAULT_ACADEMY_DATA.categories));
    categories = DEFAULT_ACADEMY_DATA.categories;
  } else {
    try {
      categories = JSON.parse(localCategories);
      // Kategori ID ASCII kontrolü
      categories = categories.map(c => ({
        ...c,
        id: toAsciiSlug(c.id || c.name)
      }));
    } catch(e) {
      categories = DEFAULT_ACADEMY_DATA.categories;
    }
  }

  if (!localAuthor || !localAuthor.includes('Merve SAMAK')) {
    localStorage.setItem('ms_academy_author', JSON.stringify(DEFAULT_ACADEMY_DATA.author));
    author = DEFAULT_ACADEMY_DATA.author;
  } else {
    try {
      author = JSON.parse(localAuthor);
    } catch(e) {
      author = DEFAULT_ACADEMY_DATA.author;
    }
  }

  return {
    author,
    categories,
    gradeLevels: DEFAULT_ACADEMY_DATA.gradeLevels,
    posts,
    faq: DEFAULT_ACADEMY_DATA.faq,
    stats: DEFAULT_ACADEMY_DATA.stats
  };
}

let ACADEMY_DATA = loadData();

// Veri Değişikliği Yardımcıları
function savePostsToStorage(newPosts) {
  ACADEMY_DATA.posts = newPosts;
  localStorage.setItem('ms_academy_posts', JSON.stringify(newPosts));
}

function saveCategoriesToStorage(newCategories) {
  ACADEMY_DATA.categories = newCategories;
  localStorage.setItem('ms_academy_categories', JSON.stringify(newCategories));
}

function saveAuthorToStorage(newAuthor) {
  ACADEMY_DATA.author = newAuthor;
  localStorage.setItem('ms_academy_author', JSON.stringify(newAuthor));
}

function resetAllDataToDefault() {
  localStorage.removeItem('ms_academy_posts');
  localStorage.removeItem('ms_academy_categories');
  localStorage.removeItem('ms_academy_author');
  ACADEMY_DATA = loadData();
}
