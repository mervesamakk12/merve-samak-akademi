/**
 * Merve Samak Akademi - Ana Uygulama Mantığı (SPA Engine)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initSearch();
  initNewsletterAndContact();
  initMobileMenu();
  initAdmin();
  renderInitialComponents();
});

/* ==========================================================================
   1. TEMA YÖNETİMİ (DARK/LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Varsayılan: Dark Mode
  const savedTheme = localStorage.getItem('ms_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('ms_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    if (themeIcon) themeIcon.className = 'ph ph-moon text-xl text-purple-600';
  } else {
    document.documentElement.classList.remove('light');
    if (themeIcon) themeIcon.className = 'ph ph-sun text-xl text-amber-400';
  }
}

/* ==========================================================================
   2. SPA ROTALAMA (HASH ROUTING)
   ========================================================================== */
const routes = ['home', 'blog', 'categories', 'about', 'contact', 'post', 'admin'];

function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  
  // Doğrudan /admin URL veya hash kontrolü
  if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
    window.location.hash = '#admin';
  } else if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRouteChange();
  }
}

function handleRouteChange() {
  const hash = window.location.hash.substring(1) || 'home';
  const [route, param] = hash.split('/');

  // Tüm sayfa bölümlerini gizle
  document.querySelectorAll('.spa-view').forEach(view => {
    view.classList.add('hidden');
  });

  // Nav link aktiflik durumu
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${route}`) {
      link.classList.add('active');
    }
  });

  // Detay sayfası mı ana rotalar mı?
  if (route === 'post' && param) {
    renderPostDetail(param);
    const detailView = document.getElementById('view-post-detail');
    if (detailView) detailView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Kategoriye göre doğrudan blog filtreleme rotası (#category/:id)
  if ((route === 'category' || route === 'kategori') && param) {
    activeCategory = param;
    const targetView = document.getElementById('view-blog');
    if (targetView) targetView.classList.remove('hidden');
    renderBlogPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Standart görünümler
  const targetView = document.getElementById(`view-${route}`);
  if (targetView) {
    targetView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Bulunamazsa ana sayfaya dön
    const homeView = document.getElementById('view-home');
    if (homeView) homeView.classList.remove('hidden');
  }

  // Sayfa özel fonksiyonlarını tetikle
  if (route === 'blog') {
    if (param) {
      activeCategory = param;
    }
    renderBlogPage();
  } else if (route === 'categories') {
    renderCategoriesPage();
  } else if (route === 'home') {
    renderHomePage();
  } else if (route === 'about') {
    renderAboutSection();
  } else if (route === 'admin') {
    renderAdminDashboard();
  }
}

/* ==========================================================================
   3. BİLEŞEN RENDER FONKSİYONLARI
   ========================================================================== */
function renderInitialComponents() {
  renderHomePage();
  renderAboutSection();
  renderFaq();
  renderStats();
}

function renderAboutSection() {
  const a = ACADEMY_DATA.author;
  if (!a) return;

  const avatarEl = document.getElementById('about-author-avatar');
  const nameEl = document.getElementById('about-author-name');
  const titleEl = document.getElementById('about-author-title');
  const bioEl = document.getElementById('about-author-bio');

  if (avatarEl && a.avatar) avatarEl.src = a.avatar;
  if (nameEl && a.name) nameEl.innerText = a.name;
  if (titleEl && a.title) titleEl.innerText = a.title;
  if (bioEl && a.bio) bioEl.innerText = a.bio;
}

function renderHomePage() {
  // 1. Öne Çıkan Yazı
  const featuredPost = ACADEMY_DATA.posts.find(p => p.featured) || ACADEMY_DATA.posts[0];
  const featuredContainer = document.getElementById('featured-post-container');
  if (featuredContainer && featuredPost) {
    featuredContainer.innerHTML = `
      <div class="glass-panel rounded-3xl overflow-hidden p-6 md:p-8 relative group hover:border-pink-500/50 transition-all duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-4">
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30 flex items-center gap-1.5">
                <i class="ph ph-sparkle text-sm"></i> Öne Çıkan İçerik
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ${featuredPost.gradeName}
              </span>
              <span class="text-xs text-gray-400 flex items-center gap-1">
                <i class="ph ph-clock text-sm"></i> ${featuredPost.readTime}
              </span>
            </div>
            
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-pink-400 transition-colors">
              <a href="#post/${featuredPost.id}">${featuredPost.title}</a>
            </h2>
            
            <p class="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
              ${featuredPost.excerpt}
            </p>
            
            <div class="pt-2 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${ACADEMY_DATA.author.avatar}" alt="${ACADEMY_DATA.author.name}" class="w-10 h-10 rounded-full ring-2 ring-pink-500/50 object-cover">
                <div>
                  <div class="text-sm font-bold text-white">${ACADEMY_DATA.author.name}</div>
                  <div class="text-xs text-gray-400">${featuredPost.date}</div>
                </div>
              </div>
              <a href="#post/${featuredPost.id}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all">
                İçeriği Oku <i class="ph ph-arrow-right font-bold"></i>
              </a>
            </div>
          </div>
          
          <div class="lg:col-span-5">
            <a href="#post/${featuredPost.id}" class="block relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl">
              <img src="${featuredPost.coverImage}" alt="${featuredPost.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                <span class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <i class="ph ph-chalkboard-teacher text-pink-400"></i> Akıllı Tahta Uyumlu
                </span>
                <span class="bg-pink-500 px-3 py-1.5 rounded-lg font-bold">PDF Dahil</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Kategori Hızlı Erişim Hapları (Home)
  const homeCatContainer = document.getElementById('home-categories-preview');
  if (homeCatContainer) {
    homeCatContainer.innerHTML = ACADEMY_DATA.categories.map(cat => `
      <a href="#blog" onclick="setBlogFilter('${cat.id}')" class="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 hover:border-pink-500/50 transition-all group">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.badgeColor} flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
          <i class="ph ${cat.icon}"></i>
        </div>
        <div>
          <h4 class="font-bold text-white group-hover:text-pink-400 transition-colors text-base">${cat.name}</h4>
          <span class="text-xs text-gray-400">${cat.count} Materyal / Yazı</span>
        </div>
      </a>
    `).join('');
  }

  // 3. Son Eklenen Yazılar (Home Grid)
  const homePostsGrid = document.getElementById('home-latest-posts');
  if (homePostsGrid) {
    homePostsGrid.innerHTML = ACADEMY_DATA.posts.slice(0, 6).map(post => createPostCardHTML(post)).join('');
  }
}

function createPostCardHTML(post) {
  return `
    <article class="glass-panel rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-300 group border border-purple-500/20 hover:border-pink-500/50">
      <a href="#post/${post.id}" class="relative aspect-[16/9] overflow-hidden block bg-purple-950/40">
        <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <button type="button" onclick="event.preventDefault(); event.stopPropagation(); setBlogFilter('${post.category}')" class="px-2.5 py-1 rounded-md text-xs font-bold bg-black/70 backdrop-blur-md text-pink-400 border border-pink-500/30 hover:bg-pink-500 hover:text-white transition-colors cursor-pointer" title="${post.categoryName} kategorisine göre filtrele">
            ${post.categoryName}
          </button>
          <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-900/80 backdrop-blur-md text-purple-200 border border-purple-400/30">
            ${post.gradeName}
          </span>
        </div>
        <div class="absolute bottom-2 right-2 text-xs bg-black/70 backdrop-blur-md text-gray-300 px-2 py-1 rounded-md flex items-center gap-1">
          <i class="ph ph-clock text-pink-400"></i> ${post.readTime}
        </div>
      </a>
      
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <i class="ph ph-calendar text-pink-400"></i> ${post.date}
          </div>
          <h3 class="font-bold text-lg text-white group-hover:text-pink-400 transition-colors line-clamp-2 leading-snug">
            <a href="#post/${post.id}">${post.title}</a>
          </h3>
          <p class="text-gray-400 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
            ${post.excerpt}
          </p>
        </div>
        
        <div class="pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 text-gray-300 font-medium">
            <img src="${ACADEMY_DATA.author.avatar}" alt="Yazar" class="w-6 h-6 rounded-full ring-1 ring-pink-500">
            <span>${post.author || ACADEMY_DATA.author.name}</span>
          </div>
          <a href="#post/${post.id}" class="text-pink-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            İncele <i class="ph ph-caret-right text-base"></i>
          </a>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   4. BLOG SAYFASI FİLTRELEME VE ARAMA
   ========================================================================== */
let activeCategory = 'all';
let activeGrade = 'all';
let blogSearchQuery = '';

function setBlogFilter(category) {
  activeCategory = category;
  window.location.hash = '#blog';
  renderBlogPage();
  const blogSection = document.getElementById('view-blog');
  if (blogSection) {
    blogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderBlogPage() {
  const container = document.getElementById('blog-posts-grid');
  const catFilterContainer = document.getElementById('blog-category-filters');
  const gradeFilterContainer = document.getElementById('blog-grade-filters');
  const countBadge = document.getElementById('blog-results-count');
  const activeBanner = document.getElementById('blog-active-filter-banner');

  // 1. Kategori Filtre Butonları (İkon + İsim + İçerik Sayısı)
  if (catFilterContainer) {
    const totalPostsCount = ACADEMY_DATA.posts.length;
    const isAllActive = activeCategory === 'all';

    catFilterContainer.innerHTML = `
      <button onclick="changeCategoryFilter('all')" class="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${isAllActive ? 'bg-gradient-brand text-white shadow-lg shadow-pink-500/30 scale-105 border border-pink-400' : 'bg-purple-900/30 text-gray-300 hover:bg-purple-800/40 border border-purple-500/20'}">
        <i class="ph ph-squares-four text-base"></i>
        <span>Tüm Kategoriler</span>
        <span class="text-[11px] px-1.5 py-0.5 rounded-md ${isAllActive ? 'bg-black/30 text-white' : 'bg-purple-950/60 text-pink-400'} font-mono">${totalPostsCount}</span>
      </button>
      ${ACADEMY_DATA.categories.map(c => {
        const count = ACADEMY_DATA.posts.filter(p => p.category === c.id).length;
        const isActive = activeCategory === c.id;
        return `
          <button onclick="changeCategoryFilter('${c.id}')" class="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${isActive ? 'bg-gradient-brand text-white shadow-lg shadow-pink-500/30 scale-105 border border-pink-400' : 'bg-purple-900/30 text-gray-300 hover:bg-purple-800/40 border border-purple-500/20'}">
            <i class="ph ${c.icon || 'ph-folder'} text-base"></i>
            <span>${c.name}</span>
            <span class="text-[11px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/30 text-white' : 'bg-purple-950/60 text-pink-400'} font-mono">${count}</span>
          </button>
        `;
      }).join('')}
    `;
  }

  // 2. Sınıf Düzeyi Filtre Butonları
  if (gradeFilterContainer) {
    gradeFilterContainer.innerHTML = ACADEMY_DATA.gradeLevels.map(g => `
      <button onclick="changeGradeFilter('${g.id}')" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeGrade === g.id ? 'bg-purple-600 text-white border border-purple-400' : 'bg-purple-950/40 text-gray-400 hover:text-white border border-purple-500/20'}">
        ${g.name}
      </button>
    `).join('');
  }

  // 3. Filtreleme Mantığı (Kategoriye Göre Tam Eşleşme)
  const filteredPosts = ACADEMY_DATA.posts.filter(post => {
    const matchCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchGrade = activeGrade === 'all' || post.grade === activeGrade || post.grade === 'all';
    const matchQuery = !blogSearchQuery || 
      post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(blogSearchQuery.toLowerCase());

    return matchCategory && matchGrade && matchQuery;
  });

  // 4. Sonuç Sayısı Bildirimi
  if (countBadge) {
    countBadge.innerText = `${filteredPosts.length} materyal listeleniyor`;
  }

  // 5. Aktif Kategori Bildirim Banner'ı
  if (activeBanner) {
    if (activeCategory !== 'all') {
      const currentCat = ACADEMY_DATA.categories.find(c => c.id === activeCategory);
      const catName = currentCat ? currentCat.name : activeCategory;
      activeBanner.classList.remove('hidden');
      activeBanner.innerHTML = `
        <div class="p-4 rounded-2xl bg-gradient-to-r from-pink-500/15 to-purple-500/15 border border-pink-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg shrink-0">
              <i class="ph ${currentCat ? currentCat.icon : 'ph-funnel'}"></i>
            </div>
            <div>
              <span class="text-xs text-gray-300">Filtrelenen Kategori:</span>
              <h4 class="text-sm md:text-base font-bold text-white">${catName} <span class="text-pink-400">(${filteredPosts.length} materyal)</span></h4>
            </div>
          </div>
          <button onclick="changeCategoryFilter('all')" class="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-pink-500/30">
            <i class="ph ph-x-circle text-base"></i> Filtreyi Temizle (Tümünü Gör)
          </button>
        </div>
      `;
    } else {
      activeBanner.classList.add('hidden');
      activeBanner.innerHTML = '';
    }
  }

  // 6. Grid Render veya Boş Durum
  if (container) {
    if (filteredPosts.length === 0) {
      const currentCat = ACADEMY_DATA.categories.find(c => c.id === activeCategory);
      const catName = currentCat ? currentCat.name : 'Seçili kategori';
      container.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-4">
          <div class="w-20 h-20 mx-auto rounded-full bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-4xl text-pink-400">
            <i class="ph ph-folder-open"></i>
          </div>
          <h3 class="text-xl font-bold text-white">"${catName}" kategorisinde henüz materyal bulunmuyor</h3>
          <p class="text-sm text-gray-400 max-w-md mx-auto">Bu kategoriye admin panelinden yeni bir ders notu veya çalışma kağıdı ekleyebilir ya da tüm yazıları görüntüleyebilirsiniz.</p>
          <button onclick="changeCategoryFilter('all')" class="px-5 py-2.5 rounded-xl bg-pink-500 text-white font-bold text-xs shadow-lg shadow-pink-500/30 hover:bg-pink-600 transition-colors">
            Tüm Kategorileri Göster
          </button>
        </div>
      `;
    } else {
      container.innerHTML = filteredPosts.map(post => createPostCardHTML(post)).join('');
    }
  }
}

window.changeCategoryFilter = function(catId) {
  activeCategory = catId;
  renderBlogPage();
};

window.changeGradeFilter = function(gradeId) {
  activeGrade = gradeId;
  renderBlogPage();
};

window.resetFilters = function() {
  activeCategory = 'all';
  activeGrade = 'all';
  blogSearchQuery = '';
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) searchInput.value = '';
  renderBlogPage();
};

/* ==========================================================================
   5. KATEGORİLER SAYFASI
   ========================================================================== */
function renderCategoriesPage() {
  const container = document.getElementById('categories-full-grid');
  if (!container) return;

  container.innerHTML = ACADEMY_DATA.categories.map(cat => {
    const postsInCat = ACADEMY_DATA.posts.filter(p => p.category === cat.id);
    return `
      <div class="glass-panel p-8 rounded-3xl flex flex-col justify-between space-y-6 hover:border-pink-500/50 transition-all group">
        <div class="space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr ${cat.badgeColor} flex items-center justify-center text-white text-3xl shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
            <i class="ph ${cat.icon}"></i>
          </div>
          
          <div>
            <h3 class="text-2xl font-extrabold text-white group-hover:text-pink-400 transition-colors">${cat.name}</h3>
            <p class="text-gray-300 text-sm mt-2 leading-relaxed">${cat.description}</p>
          </div>
        </div>

        <div class="space-y-3 pt-4 border-t border-purple-500/20">
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>Toplam İçerik</span>
            <span class="px-2.5 py-1 rounded-md bg-purple-500/20 text-pink-300 font-bold">${postsInCat.length || cat.count} Materyal</span>
          </div>

          <button onclick="setBlogFilter('${cat.id}')" class="w-full py-3 rounded-xl bg-purple-900/40 hover:bg-gradient-brand text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-pink-500/20">
            Tüm Yazıları Gör <i class="ph ph-arrow-right font-bold"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   6. BLOG DETAY SAYFASI RENDER MOTORU
   ========================================================================== */
function renderPostDetail(postId) {
  const post = ACADEMY_DATA.posts.find(p => p.id === postId);
  const container = document.getElementById('view-post-detail');
  if (!container) return;

  if (!post) {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">İçerik Bulunamadı</h2>
        <p class="text-gray-400 mb-6">Aradığınız blog yazısı mevcut değil veya yayından kaldırılmış olabilir.</p>
        <a href="#blog" class="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold">Blog Sayfasına Dön</a>
      </div>
    `;
    return;
  }

  // İlgili Diğer Yazılar
  const relatedPosts = ACADEMY_DATA.posts.filter(p => p.id !== post.id).slice(0, 3);

  container.innerHTML = `
    <article class="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <!-- Geri Dön Butonu & Breadcrumb -->
      <div class="flex items-center justify-between text-xs md:text-sm">
        <a href="#blog" class="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold bg-purple-950/50 border border-purple-500/30 px-4 py-2 rounded-xl transition-colors">
          <i class="ph ph-arrow-left font-bold"></i> Tüm Blog Yazılarına Dön
        </a>
        <div class="flex items-center gap-2 text-gray-400">
          <span>Blog</span>
          <i class="ph ph-caret-right text-xs"></i>
          <span class="text-pink-400">${post.categoryName}</span>
        </div>
      </div>

      <!-- Başlık ve Meta Bilgileri -->
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
            ${post.categoryName}
          </span>
          <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            ${post.gradeName}
          </span>
          <span class="text-xs text-gray-400 flex items-center gap-1">
            <i class="ph ph-clock text-pink-400"></i> ${post.readTime}
          </span>
        </div>

        <h1 class="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
          ${post.title}
        </h1>

        <!-- Yazar Kartı & Tarih -->
        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#170c23] border border-purple-500/20">
          <div class="flex items-center gap-3.5">
            <img src="${ACADEMY_DATA.author.avatar}" alt="${ACADEMY_DATA.author.name}" class="w-12 h-12 rounded-full ring-2 ring-pink-500 object-cover">
            <div>
              <h4 class="font-bold text-white text-sm md:text-base">${post.author || ACADEMY_DATA.author.name}</h4>
              <p class="text-xs text-gray-400">${ACADEMY_DATA.author.title}</p>
            </div>
          </div>
          <div class="text-xs text-gray-400 flex items-center gap-2">
            <i class="ph ph-calendar text-pink-400 text-base"></i> Yayın Tarihi: ${post.date}
          </div>
        </div>
      </div>

      <!-- Kapak Görseli -->
      <div class="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl border border-purple-500/20">
        <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover">
      </div>

      <!-- İçerik Gövdesi -->
      <div class="glass-panel p-6 md:p-10 rounded-3xl leading-relaxed text-gray-200 text-base md:text-lg">
        ${post.content}
      </div>

      <!-- Sosyal Paylaşım & Etkileşim Butonları -->
      <div class="glass-panel p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-white flex items-center gap-1.5">
            <i class="ph ph-share-network text-pink-400 text-lg"></i> Bu İçeriği Paylaş:
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="shareOnWhatsApp('${post.title}')" class="px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-emerald-500/30">
            <i class="ph ph-whatsapp-logo text-base"></i> WhatsApp
          </button>
          <button onclick="shareOnTwitter('${post.title}')" class="px-4 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-sky-500/30">
            <i class="ph ph-x-logo text-base"></i> Paylaş
          </button>
          <button onclick="copyCurrentLink()" class="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-purple-500/30">
            <i class="ph ph-link-simple text-base"></i> Bağlantıyı Kopyala
          </button>
        </div>
      </div>

      <!-- Yazar Biyografi Kutusu -->
      <div class="glass-panel p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 border border-pink-500/30">
        <img src="${ACADEMY_DATA.author.avatar}" alt="${ACADEMY_DATA.author.name}" class="w-24 h-24 rounded-2xl ring-4 ring-pink-500/30 object-cover">
        <div class="space-y-2 text-center md:text-left flex-1">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h3 class="text-xl font-bold text-white">${ACADEMY_DATA.author.name}</h3>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 font-semibold">Kurucu & Eğitimci</span>
          </div>
          <p class="text-xs md:text-sm text-gray-300 leading-relaxed">${ACADEMY_DATA.author.bio}</p>
        </div>
      </div>

      <!-- İlgili İçerikler -->
      <div class="space-y-6 pt-6">
        <h3 class="text-2xl font-bold text-white flex items-center gap-2">
          <i class="ph ph-bookmarks text-pink-400"></i> İlgili Diğer İçerikler
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${relatedPosts.map(p => createPostCardHTML(p)).join('')}
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   7. SIKÇA SORULAN SORULAR VE İSTATİSTİKLER
   ========================================================================== */
function renderFaq() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.innerHTML = ACADEMY_DATA.faq.map((item, index) => `
    <div class="glass-panel rounded-2xl overflow-hidden border border-purple-500/20">
      <button onclick="toggleFaq(${index})" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-pink-400 transition-colors">
        <span class="text-sm md:text-base">${item.q}</span>
        <i id="faq-icon-${index}" class="ph ph-caret-down text-lg text-pink-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-answer-${index}" class="hidden px-5 pb-5 text-xs md:text-sm text-gray-300 border-t border-purple-500/10 pt-3 leading-relaxed">
        ${item.a}
      </div>
    </div>
  `).join('');
}

window.toggleFaq = function(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer || !icon) return;

  const isHidden = answer.classList.contains('hidden');
  if (isHidden) {
    answer.classList.remove('hidden');
    icon.classList.add('rotate-180');
  } else {
    answer.classList.add('hidden');
    icon.classList.remove('rotate-180');
  }
};

function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = ACADEMY_DATA.stats.map(s => `
    <div class="glass-panel p-6 rounded-2xl text-center space-y-2 border border-purple-500/20 hover:border-pink-500/40 transition-all">
      <div class="w-12 h-12 mx-auto rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-2xl mb-3">
        <i class="ph ${s.icon}"></i>
      </div>
      <div class="text-3xl font-black text-white font-heading">${s.number}</div>
      <div class="text-xs text-gray-400 font-medium">${s.label}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. ARAMA VE BÜLTEN / İLETİŞİM İŞLEMLERİ
   ========================================================================== */
function initSearch() {
  const blogSearchInput = document.getElementById('blog-search-input');
  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', (e) => {
      blogSearchQuery = e.target.value;
      renderBlogPage();
    });
  }
}

function initNewsletterAndContact() {
  // Bülten Formu
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('🎉 Tebrikler! Merve Samak Akademi bültenine başarıyla abone oldunuz.');
        emailInput.value = '';
      }
    });
  }

  // İletişim Formu
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 Mesajınız başarıyla iletildi. En kısa sürede geri dönüş yapılacaktır.');
      contactForm.reset();
    });
  }
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Menü linklerine tıklandığında menüyü kapat
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   9. YARDIMCI VE PAYLAŞIM FONKSİYONLARI
   ========================================================================== */
window.showToast = function(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
};

window.copyCurrentLink = function() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('📋 Sayfa bağlantısı panoya kopyalandı!');
  });
};

window.shareOnWhatsApp = function(title) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${title} - Merve Samak Akademi: `);
  window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
};

window.shareOnTwitter = function(title) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${title} | Merve Samak Akademi`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};
