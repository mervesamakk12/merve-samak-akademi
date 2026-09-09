/**
 * Merve SAMAK AKADEMİ - Veri Motoru ve Ders Materyali Portalı
 * Hedef Kitle: 8. Sınıf LGS Matematik Öğrencileri ve Öğretmenleri
 */

const DEFAULT_ACADEMY_DATA = {
  author: {
    name: "Merve SAMAK",
    title: "8. Sınıf LGS Matematik Öğretmeni & Eğitim Koçu",
    avatar: "assets/logo.png",
    bio: "Sevgili 8. sınıf LGS öğrencilerim ve değerli velilerim; bu platformda LGS matematik yolculuğunuzda en yüksek nete ulaşmanız için hazırladığım tüm ünite konu anlatım özetlerini, yeni nesil soru fasiküllerini (PDF), formül tablolarını, deneme sınavlarını ve interaktif uygulamaları paylaşıyorum.",
    social: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      telegram: "https://t.me",
      email: "iletisim@mervesamak.com"
    }
  },

  categories: [
    {
      id: "konu-anlatimi-pdf",
      name: "8. Sınıf Konu Anlatımı (PDF)",
      icon: "ph-book-open-text",
      badgeColor: "from-pink-500 to-rose-500",
      description: "8. Sınıf LGS MEB kazanımlarına tam uyumlu ünite konu anlatım özetleri, formül tabloları ve adım adım çözümlü örnekler.",
      count: 5
    },
    {
      id: "soru-fasikulleri-pdf",
      name: "8. Sınıf Soru Bankası & Testler (PDF)",
      icon: "ph-file-text",
      badgeColor: "from-purple-500 to-indigo-500",
      description: "Beceri temelli, görsel ve grafik yorumlamalı 8. sınıf LGS yeni nesil soru fasikülleri ve açıklamalı çözüm anahtarları.",
      count: 4
    },
    {
      id: "deneme-sinavlari-pdf",
      name: "LGS Matematik Branş Denemeleri (PDF)",
      icon: "ph-exam",
      badgeColor: "from-amber-500 to-orange-500",
      description: "Tam 20 soruluk MEB sınav formatında hazırlanmış 8. sınıf LGS matematik branş denemeleri ve optik puanlama anahtarı.",
      count: 3
    },
    {
      id: "akilli-tahta",
      name: "Akıllı Tahta & GeoGebra",
      icon: "ph-chalkboard-teacher",
      badgeColor: "from-cyan-500 to-blue-500",
      description: "Derslerimizde kullandığımız dinamik GeoGebra geometri simülasyonları ve akıllı tahta konu sunuları.",
      count: 3
    },
    {
      id: "zeka-oyunlari",
      name: "LGS Akıl & Mantık Oyunları",
      icon: "ph-puzzle-piece",
      badgeColor: "from-fuchsia-500 to-pink-500",
      description: "Matematiksel düşünme ve muhakeme hızını artıran haftalık mantık labirentleri ve zeka bulmacaları.",
      count: 2
    }
  ],

  gradeLevels: [
    { id: "all", name: "Tüm LGS Konuları" },
    { id: "carpanlar", name: "Çarpanlar ve Katlar" },
    { id: "uslu", name: "Üslü İfadeler" },
    { id: "karekok", name: "Kareköklü İfadeler" },
    { id: "veri-olasilik", name: "Veri Analizi & Olasılık" },
    { id: "cebir", name: "Cebirsel İfadeler" },
    { id: "denklem-egim", name: "Doğrusal Denklemler & Eğim" },
    { id: "esitsizlik-ucgen", name: "Eşitsizlikler & Üçgenler" }
  ],

  posts: [
    {
      id: "8-sinif-carpanlar-katlar-konu-anlatimi-ve-soru-fasikulu-pdf",
      title: "8. Sınıf Çarpanlar ve Katlar: Kapsamlı Konu Anlatımı ve 50 Soruluk LGS Yeni Nesil Soru Fasikülü (PDF)",
      slug: "8-sinif-carpanlar-katlar-konu-anlatimi-ve-soru-fasikulu-pdf",
      category: "konu-anlatimi-pdf",
      categoryName: "8. Sınıf Konu Anlatımı (PDF)",
      grade: "carpanlar",
      gradeName: "Çarpanlar ve Katlar",
      date: "09 Eylül 2026",
      readTime: "6 dk okuma / Konu + Soru PDF İndir",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      excerpt: "8. sınıf LGS matematik 1. ünitesi olan Çarpanlar ve Katlar konusunun tüm püf noktalarını, EBOB-EKOK problem ayırt etme taktiklerini ve 50 adet yeni nesil beceri temelli soruyu içeren PDF seti.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili 8. sınıf öğrencilerim; LGS matematik maratonunda ilk hedefimiz Çarpanlar ve Katlar konusunu %100 nete bağlamak! Bu fasikülde hem <strong>1 sayfalık hap konu anlatımı özeti</strong> hem de sınavda karşınıza çıkabilecek tüm <strong>yeni nesil soru tipleri ve çözümleri</strong> yer alıyor.
          </p>

          <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
            <h4 class="flex items-center gap-2 font-bold text-lg text-pink-400 mb-2">
              <i class="ph ph-check-circle text-xl"></i> 8. Sınıf MEB Kazanım Hedefleri (M.8.1.1.1 - M.8.1.1.3)
            </h4>
            <p class="text-sm">Verilen pozitif tam sayıların çarpanlarını bulur, asal çarpanlarına ayırır. İki doğal sayının EBOB ve EKOK değerlerini hesaplar, gerçek yaşam problemlerini modeller.</p>
          </div>

          <h3 class="text-2xl font-bold text-white mt-8 mb-4">Bu PDF Fasikülünün İçeriğinde Neler Var?</h3>
          <ul class="space-y-3 list-none pl-0">
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>Ayrıntılı Konu Anlatımı:</strong> Asal çarpan algoritması, aralarında asal sayılar ve pratik EBOB-EKOK kuralları.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>50 Adet LGS Yeni Nesil Soru:</strong> 15 temel kavrama, 20 orta düzey ve 15 tam LGS formatında beceri temelli problem.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="p-1 rounded-lg bg-pink-500/20 text-pink-400 mt-1"><i class="ph ph-check font-bold"></i></span>
              <span><strong>Adım Adım Video ve PDF Çözüm Anahtarı:</strong> Tüm soruların ayrıntılı çözüm adımları.</span>
            </li>
          </ul>

          <div class="my-8 p-6 rounded-2xl bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30">
            <h4 class="font-bold text-xl text-white mb-2">💡 Merve Öğretmenden LGS İpucu:</h4>
            <p class="text-gray-300 text-sm leading-relaxed">
              Soruda parçalama, bölme, eşit aralıklı direk dikme varsa <strong>EBOB</strong>; periyodik nöbet, zil, sefer saatleri gibi birleşip katlanma varsa <strong>EKOK</strong> kullanılır!
            </p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf Çarpanlar ve Katlar Konu Anlatımı PDF Fasikülü İndirildi!')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all">
              <i class="ph ph-file-pdf text-2xl"></i> Konu Anlatımı & Soru Fasikülünü İndir (PDF)
            </a>
            <a href="#questions" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 border border-purple-500/30 text-purple-200 font-bold transition-all">
              <i class="ph ph-check-circle text-xl"></i> Online Soru Dünyasında Çöz
            </a>
          </div>
        </div>
      `
    },
    {
      id: "8-sinif-uslu-ifadeler-konu-anlatimi-ve-meb-cikmis-sorular-pdf",
      title: "8. Sınıf Üslü İfadeler: Formül Tablosu, Konu Anlatımı ve LGS Çıkmış Soru Bankası (PDF)",
      slug: "8-sinif-uslu-ifadeler-konu-anlatimi-ve-meb-cikmis-sorular-pdf",
      category: "soru-fasikulleri-pdf",
      categoryName: "8. Sınıf Soru Bankası & Testler (PDF)",
      grade: "uslu",
      gradeName: "Üslü İfadeler",
      date: "07 Eylül 2026",
      readTime: "5 dk okuma / PDF İndir",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      excerpt: "8. sınıf üslü sayılarda negatif üs, üssün üssü, taban eşitleme taktikleri, ondalık çözümleme ve bilimsel gösterim MEB çıkmış soru fasikülü.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili öğrencilerim; LGS'de her yıl en az 2-3 soru gelen <strong>Üslü İfadeler</strong> ünitesini tüm kurallarıyla tek bir fasikülde topladım. Parantezli ve parantezsiz negatif taban tuzaklarına düşmemek için bu konu anlatımı ve soru setini mutlaka çözün.
          </p>

          <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
            <h4 class="font-bold text-lg text-pink-400 mb-2">🎯 Öne Çıkan Formüller:</h4>
            <p class="text-sm font-mono">$a^{-n} = \\frac{1}{a^n}$, $\\quad (a^m)^n = a^{m \\cdot n}$, $\\quad a^m \\cdot a^n = a^{m+n}$, $\\quad \\frac{a^m}{a^n} = a^{m-n}$</p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf Üslü İfadeler Konu ve Soru PDF Paketi İndirildi!')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all">
              <i class="ph ph-file-pdf text-2xl"></i> Üslü İfadeler Soru Fasikülünü İndir (PDF)
            </a>
          </div>
        </div>
      `
    },
    {
      id: "8-sinif-karekoklu-ifadeler-konu-anlatimi-ve-beceri-temelli-test-pdf",
      title: "8. Sınıf Kareköklü İfadeler: Tam Konu Anlatımı ve LGS Yeni Nesil Modelleme Testi (PDF)",
      slug: "8-sinif-karekoklu-ifadeler-konu-anlatimi-ve-beceri-temelli-test-pdf",
      category: "konu-anlatimi-pdf",
      categoryName: "8. Sınıf Konu Anlatımı (PDF)",
      grade: "karekok",
      gradeName: "Kareköklü İfadeler",
      date: "05 Eylül 2026",
      readTime: "7 dk okuma / PDF İndir",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Tam kare sayılar, yaklaşık değer bulma, a√b biçiminde kök dışına çıkarma ve kareköklü sayılarda dört işlem beceri temelli soru seti.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Kareköklü sayılar LGS'de geometri modellemeleri ve alan sorularıyla birleştirilerek sorulur. Alanı bilinen bir karenin kenarını bulmaktan sayı doğrusunda yaklaşık değer hesaplamaya kadar her aşamayı adım adım inceleyen PDF fasikülümüz.
          </p>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf Kareköklü İfadeler PDF Fasikülü İndirildi!')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all">
              <i class="ph ph-file-pdf text-2xl"></i> Karekök Konu & Soru PDF İndir
            </a>
          </div>
        </div>
      `
    },
    {
      id: "8-sinif-cebirsel-ifadeler-ve-ozdeslikler-konu-anlatimi-pdf",
      title: "8. Sınıf Cebirsel İfadeler ve Özdeşlikler: Geometrik Alan Modelleme & Soru Fasikülü (PDF)",
      slug: "8-sinif-cebirsel-ifadeler-ve-ozdeslikler-konu-anlatimi-pdf",
      category: "konu-anlatimi-pdf",
      categoryName: "8. Sınıf Konu Anlatımı (PDF)",
      grade: "cebir",
      gradeName: "Cebirsel İfadeler",
      date: "02 Eylül 2026",
      readTime: "5 dk okuma / PDF İndir",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Tam kare ve iki kare farkı özdeşliklerini geometrik karo modelleriyle öğreten 8. sınıf LGS cebir konu anlatımı ve soru paketi.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Cebirsel ifadelerde katsayılar toplamı, sabit terim ve en önemlisi $(a+b)^2$, $(a-b)^2$ ve $a^2-b^2$ özdeşliklerinin geometrik alan sorularına uygulanışını bu fasikülle pekiştirin.
          </p>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf Cebirsel İfadeler PDF İndirildi!')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-bold shadow-lg shadow-pink-500/25">
              <i class="ph ph-file-pdf text-2xl"></i> Cebirsel İfadeler PDF Fasikülünü İndir
            </a>
          </div>
        </div>
      `
    },
    {
      id: "8-sinif-lgs-matematik-tam-brans-denemesi-1-pdf",
      title: "8. Sınıf LGS Matematik 20 Soruluk Branş Denemesi ve Açıklamalı Çözüm Kitapçığı (#1) (PDF)",
      slug: "8-sinif-lgs-matematik-tam-brans-denemesi-1-pdf",
      category: "deneme-sinavlari-pdf",
      categoryName: "LGS Matematik Branş Denemeleri (PDF)",
      grade: "all",
      gradeName: "Tüm LGS Konuları",
      date: "28 Ağustos 2026",
      readTime: "40 dk Sınav / PDF İndir",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      excerpt: "MEB LGS sınav soru sayıları ve zorluk katsayılarına birebir uygun olarak hazırlanan 20 soruluk prova branş denemesi ve puan cetveli.",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">
            Sevgili LGS öğrencilerim; gerçek sınav provası yapmanız için hazırladığım bu 20 soruluk branş denemesini 40 dakikalık süre tutarak çözün. Ardından çözüm kitapçığından yanlışlarınızı ve Hedef & Net Koçu modülünden netinizi analiz edin.
          </p>

          <div class="pt-4">
            <a href="javascript:void(0)" onclick="alert('8. Sınıf LGS 1. Branş Denemesi PDF İndirildi!')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-bold shadow-lg shadow-pink-500/25">
              <i class="ph ph-file-pdf text-2xl"></i> 20 Soruluk LGS Denemesini İndir (PDF)
            </a>
          </div>
        </div>
      `
    }
  ],

  faq: [
    {
      q: "8. sınıf LGS konu anlatımı ve soru PDF'leri ücretsiz mi?",
      a: "Evet sevgili öğrencilerim! Sitede paylaştığım tüm 8. sınıf LGS konu anlatım özetleri, yeni nesil soru fasikülleri ve branş denemeleri tamamen ücretsizdir."
    },
    {
      q: "Soru fasiküllerini ve denemeleri telefondan veya tabletten açabilir miyim?",
      a: "Evet. Sitemizdeki tüm PDF dosyaları ve etkileşimli modüller telefon, tablet, bilgisayar ve akıllı tahtalarla %100 uyumludur."
    },
    {
      q: "LGS netlerimi artırmak için siteyi nasıl kullanmalıyım?",
      a: "Önce 'Konu Notları' sekmesinden formül ve tuzakları inceleyin, ardından 'Soru Dünyası'nda yeni nesil soruları çözüp 'Hedef & Net Koçu'ndan eksiklerinize göre kişisel reçetenizi çıkarın."
    },
    {
      q: "Çözemediğim LGS sorularını Merve Öğretmenime nasıl sorabilirim?",
      a: "Sitemizin 'İletişim' bölümündeki formdan veya derste doğrudan bana takıldığınız soruları iletebilirsiniz."
    }
  ],

  stats: [
    { number: "8. Sınıf (LGS)", label: "LGS Sınav Odaklı", icon: "ph-graduation-cap" },
    { number: "100+ PDF", label: "Konu Anlatımı & Soru Fasikülü", icon: "ph-file-pdf" },
    { number: "GeoGebra", label: "İnteraktif Görsel Modeller", icon: "ph-chalkboard-teacher" },
    { number: "Yeni Nesil", label: "LGS Deneme & Provaları", icon: "ph-exam" }
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

// LocalStorage Senkronizasyonu (Sadece 8. Sınıf LGS Verileri ile Yeniler)
function loadData() {
  const localPosts = localStorage.getItem('ms_academy_posts');
  const localAuthor = localStorage.getItem('ms_academy_author');

  let posts = DEFAULT_ACADEMY_DATA.posts;
  let author = DEFAULT_ACADEMY_DATA.author;

  const localCategories = localStorage.getItem('ms_academy_categories');
  let categories = DEFAULT_ACADEMY_DATA.categories;

  // Başlangıçta 8. Sınıf LGS verilerini yükle (Eski 5,6,7 verilerini temizler)
  if (!localPosts || localPosts.includes('5. Sınıf') || localPosts.includes('6. Sınıf') || localPosts.includes('7. Sınıf')) {
    localStorage.setItem('ms_academy_posts', JSON.stringify(DEFAULT_ACADEMY_DATA.posts));
    posts = DEFAULT_ACADEMY_DATA.posts;
  } else {
    try {
      posts = JSON.parse(localPosts);
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

  if (!localCategories || localCategories.includes('5, 6, 7')) {
    localStorage.setItem('ms_academy_categories', JSON.stringify(DEFAULT_ACADEMY_DATA.categories));
    categories = DEFAULT_ACADEMY_DATA.categories;
  } else {
    try {
      categories = JSON.parse(localCategories);
      categories = categories.map(c => ({
        ...c,
        id: toAsciiSlug(c.id || c.name)
      }));
    } catch(e) {
      categories = DEFAULT_ACADEMY_DATA.categories;
    }
  }

  if (!localAuthor || localAuthor.includes('5, 6, 7')) {
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
