/**
 * Merve SAMAK AKADEMİ - Kullanıcı Dostu Yönetim (Admin) Paneli
 * Bölümler:
 * 1. Dashboard (Toplam Yazı, Toplam Kategori, İstatistikler)
 * 2. Blog Yazıları (Yeni Ekle, Listele, Düzenle, Sil)
 * 3. Kategoriler (Yeni Kategori Ekle, Listele, Sil)
 */

const ADMIN_CREDENTIALS = {
  user: "admin",
  pass: "123456"
};

let editingPostId = null;
let currentAdminTab = 'dashboard';

function isAdminLoggedIn() {
  return localStorage.getItem('ms_admin_logged') === 'true';
}

function setAdminLoggedIn(status) {
  if (status) {
    localStorage.setItem('ms_admin_logged', 'true');
  } else {
    localStorage.removeItem('ms_admin_logged');
  }
}

function initAdmin() {
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminPostForm = document.getElementById('admin-post-form');
  const adminCategoryForm = document.getElementById('admin-category-form');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');
  const exportBtn = document.getElementById('admin-export-btn');
  const importInput = document.getElementById('admin-import-input');
  const resetBtn = document.getElementById('admin-reset-btn');

  // Giriş Formu
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('admin-user').value.trim();
      const pass = document.getElementById('admin-pass').value.trim();

      if ((user === ADMIN_CREDENTIALS.user || user === 'merve') && (pass === ADMIN_CREDENTIALS.pass || pass === 'akademi2026')) {
        setAdminLoggedIn(true);
        showToast('🔑 Yönetici girişi başarılı! Hoş geldiniz Merve Öğretmenim.');
        document.getElementById('admin-login-modal').classList.add('hidden');
        renderAdminDashboard();
        window.location.hash = '#admin';
      } else {
        alert('Hatalı kullanıcı adı veya şifre! (Varsayılan: admin / 123456)');
      }
    });
  }

  // Çıkış
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      setAdminLoggedIn(false);
      showToast('👋 Yönetici oturumu kapatıldı.');
      window.location.hash = '#home';
    });
  }

  // Blog Yazısı Ekle / Güncelle
  if (adminPostForm) {
    adminPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      savePostFromForm();
    });
  }

  // Kategori Ekle
  if (adminCategoryForm) {
    adminCategoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveCategoryFromForm();
    });
  }

  // JSON Yedek İndir
  if (exportBtn) {
    exportBtn.addEventListener('click', exportBackupJSON);
  }

  // JSON Yedek Yükle
  if (importInput) {
    importInput.addEventListener('change', importBackupJSON);
  }

  // Sıfırla
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Tüm yazılar ve kategoriler başlangıç durumuna sıfırlansın mı?')) {
        resetAllDataToDefault();
        showToast('🔄 Tüm içerikler varsayılana sıfırlandı.');
        renderAdminDashboard();
        renderHomePage();
      }
    });
  }
}

// Sekme Değiştirici
window.switchAdminTab = function(tabName) {
  currentAdminTab = tabName;
  
  // Sekme buton stilleri
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('bg-pink-500', 'text-white', 'shadow-lg', 'shadow-pink-500/25');
    btn.classList.add('bg-purple-900/30', 'text-gray-300');
  });

  const activeBtn = document.getElementById(`admin-tab-btn-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-purple-900/30', 'text-gray-300');
    activeBtn.classList.add('bg-pink-500', 'text-white', 'shadow-lg', 'shadow-pink-500/25');
  }

  // Sekme panelleri
  document.querySelectorAll('.admin-tab-panel').forEach(panel => {
    panel.classList.add('hidden');
  });

  const targetPanel = document.getElementById(`admin-tab-panel-${tabName}`);
  if (targetPanel) {
    targetPanel.classList.remove('hidden');
  }
};

// Admin Dashboard Render
function renderAdminDashboard() {
  if (!isAdminLoggedIn()) {
    document.getElementById('admin-dashboard-container').classList.add('hidden');
    document.getElementById('admin-auth-required').classList.remove('hidden');
    return;
  }

  document.getElementById('admin-auth-required').classList.add('hidden');
  document.getElementById('admin-dashboard-container').classList.remove('hidden');

  // 1. Dashboard İstatistikleri
  const totalPostsEl = document.getElementById('admin-stat-posts-count');
  const totalCatsEl = document.getElementById('admin-stat-cats-count');
  if (totalPostsEl) totalPostsEl.innerText = ACADEMY_DATA.posts.length;
  if (totalCatsEl) totalCatsEl.innerText = ACADEMY_DATA.categories.length;

  // 2. Kategori Seçim Dropdown'ını Doldur (Yazı Ekleme Formu İçin)
  populateCategoryDropdown();

  // 3. Tabloları Render Et
  renderAdminPostsTable();
  renderAdminCategoriesTable();

  // Aktif sekmede kal
  window.switchAdminTab(currentAdminTab);
}

function populateCategoryDropdown() {
  const select = document.getElementById('post-form-category');
  if (!select) return;

  select.innerHTML = ACADEMY_DATA.categories.map(c => `
    <option value="${c.id}">${c.name}</option>
  `).join('');
}

/* ==========================================================================
   BLOG YAZILARI YÖNETİMİ (EKLE, DÜZENLE, SİL, LİSTELE)
   ========================================================================== */
function renderAdminPostsTable() {
  const tbody = document.getElementById('admin-posts-tbody');
  if (!tbody) return;

  tbody.innerHTML = ACADEMY_DATA.posts.map((post, idx) => `
    <tr class="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
      <td class="py-3.5 px-4 text-xs font-mono text-gray-400">${idx + 1}</td>
      <td class="py-3.5 px-4">
        <div class="flex items-center gap-3">
          <img src="${post.coverImage}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-purple-500/30 shrink-0 bg-purple-950">
          <div>
            <div class="text-sm font-bold text-white line-clamp-1">${post.title}</div>
            <div class="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
              <span><i class="ph ph-user text-pink-400"></i> ${post.author || ACADEMY_DATA.author.name}</span>
              <span>•</span>
              <span>${post.date}</span>
            </div>
          </div>
        </div>
      </td>
      <td class="py-3.5 px-4">
        <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/30 whitespace-nowrap">
          ${post.categoryName}
        </span>
      </td>
      <td class="py-3.5 px-4 text-xs text-purple-200 font-bold whitespace-nowrap">
        ${post.gradeName || post.grade + '. Sınıf'}
      </td>
      <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
        <a href="#post/${post.id}" target="_blank" class="px-3 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800 text-purple-200 text-xs font-semibold transition-colors inline-block" title="Sitede Gör">
          <i class="ph ph-eye"></i> Gör
        </a>
        <button onclick="editPost('${post.id}')" class="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white text-xs font-semibold transition-colors" title="Düzenle">
          <i class="ph ph-pencil-simple"></i> Düzenle
        </button>
        <button onclick="deletePost('${post.id}')" class="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold transition-colors" title="Sil">
          <i class="ph ph-trash"></i> Sil
        </button>
      </td>
    </tr>
  `).join('');
}

function savePostFromForm() {
  const title = document.getElementById('post-form-title').value.trim();
  const coverImage = document.getElementById('post-form-image').value.trim() || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80';
  const categoryId = document.getElementById('post-form-category').value;
  const author = document.getElementById('post-form-author').value.trim() || ACADEMY_DATA.author.name;
  const grade = document.getElementById('post-form-grade').value;
  const rawContent = document.getElementById('post-form-content').value.trim();
  const kazanım = document.getElementById('post-form-kazanim').value.trim();
  const excerpt = document.getElementById('post-form-excerpt').value.trim();

  const categoryObj = ACADEMY_DATA.categories.find(c => c.id === categoryId) || ACADEMY_DATA.categories[0];
  const gradeObj = ACADEMY_DATA.gradeLevels.find(g => g.id === grade) || { name: grade === 'all' ? 'Tüm Sınıflar' : `${grade}. Sınıf` };

  const today = new Date();
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  // İçeriği biçimlendirme
  let formattedContent = '';
  if (kazanım) {
    formattedContent += `
      <div class="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 mb-6">
        <h4 class="flex items-center gap-2 font-bold text-lg text-pink-400 mb-2">
          <i class="ph ph-check-circle text-xl"></i> MEB Kazanım Odağı
        </h4>
        <p class="text-sm">${kazanım}</p>
      </div>
    `;
  }

  const paragraphs = rawContent.split('\n\n').filter(p => p.trim() !== '');
  formattedContent += paragraphs.map(p => `<p class="text-lg leading-relaxed mb-4">${p.replace(/\n/g, '<br>')}</p>`).join('');

  formattedContent += `
    <div class="flex flex-wrap gap-4 pt-6 mt-6 border-t border-purple-500/20">
      <a href="javascript:void(0)" onclick="alert('Ders materyali indirme simülasyonu (Örnek PDF)')" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-pink-500/20 hover:scale-105 transition-all">
        <i class="ph ph-file-pdf text-xl"></i> Çalışma Kağıdını İndir (PDF)
      </a>
    </div>
  `;

  if (editingPostId) {
    const postIdx = ACADEMY_DATA.posts.findIndex(p => p.id === editingPostId);
    if (postIdx !== -1) {
      ACADEMY_DATA.posts[postIdx] = {
        ...ACADEMY_DATA.posts[postIdx],
        title,
        coverImage,
        category: categoryId,
        categoryName: categoryObj ? categoryObj.name : 'Matematik',
        author,
        grade,
        gradeName: gradeObj.name,
        excerpt: excerpt || (rawContent.substring(0, 140) + '...'),
        content: formattedContent
      };
      showToast('✅ Blog yazısı başarıyla güncellendi!');
    }
  } else {
    const slugBase = typeof toAsciiSlug === 'function' ? toAsciiSlug(title) : title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newId = (slugBase.substring(0, 40) || 'yazi') + '-' + Date.now().toString().slice(-4);
    const newPost = {
      id: newId,
      title,
      slug: newId,
      coverImage,
      category: categoryId,
      categoryName: categoryObj ? categoryObj.name : 'Matematik',
      author,
      grade,
      gradeName: gradeObj.name,
      date: formattedDate,
      readTime: '4 dk okuma / PDF',
      excerpt: excerpt || (rawContent.substring(0, 140) + '...'),
      content: formattedContent,
      featured: false
    };

    ACADEMY_DATA.posts.unshift(newPost);
    showToast('🎉 Yeni ders materyali başarıyla yayınlandı!');
  }

  savePostsToStorage(ACADEMY_DATA.posts);
  resetPostForm();
  renderAdminPostsTable();
  renderHomePage();
  window.switchAdminTab('posts');
}

function editPost(postId) {
  const post = ACADEMY_DATA.posts.find(p => p.id === postId);
  if (!post) return;

  editingPostId = postId;
  document.getElementById('post-form-title').value = post.title;
  document.getElementById('post-form-image').value = post.coverImage;
  document.getElementById('post-form-category').value = post.category;
  document.getElementById('post-form-author').value = post.author || ACADEMY_DATA.author.name;
  document.getElementById('post-form-grade').value = post.grade || 'all';
  document.getElementById('post-form-excerpt').value = post.excerpt || '';

  // HTML'den düz metin çıkarma
  const temp = document.createElement('div');
  temp.innerHTML = post.content;
  document.getElementById('post-form-content').value = temp.innerText.trim();

  document.getElementById('admin-form-submit-btn').innerHTML = '<i class="ph ph-check"></i> Değişiklikleri Kaydet';
  document.getElementById('admin-form-cancel-btn').classList.remove('hidden');
  document.getElementById('admin-form-heading').innerText = 'Yazıyı Düzenle';

  // Yazı sekmesine geç ve forma odaklan
  window.switchAdminTab('posts');
  document.getElementById('admin-post-form').scrollIntoView({ behavior: 'smooth' });
}

function resetPostForm() {
  editingPostId = null;
  document.getElementById('admin-post-form').reset();
  document.getElementById('post-form-author').value = ACADEMY_DATA.author.name;
  document.getElementById('admin-form-submit-btn').innerHTML = '<i class="ph ph-plus-circle"></i> Yeni Yazıyı Yayınla';
  document.getElementById('admin-form-cancel-btn').classList.add('hidden');
  document.getElementById('admin-form-heading').innerText = 'Yeni Blog Yazısı / Materyal Ekle';
}

function deletePost(postId) {
  const post = ACADEMY_DATA.posts.find(p => p.id === postId);
  if (!post) return;

  if (confirm(`"${post.title}" başlıklı yazıyı silmek istediğinize emin misiniz?`)) {
    const updated = ACADEMY_DATA.posts.filter(p => p.id !== postId);
    savePostsToStorage(updated);
    showToast('🗑️ Yazı silindi.');
    renderAdminDashboard();
    renderHomePage();
  }
}

/* ==========================================================================
   KATEGORİLER YÖNETİMİ (EKLE, LİSTELE, SİL)
   ========================================================================== */
function renderAdminCategoriesTable() {
  const tbody = document.getElementById('admin-categories-tbody');
  if (!tbody) return;

  tbody.innerHTML = ACADEMY_DATA.categories.map((cat, idx) => {
    const count = ACADEMY_DATA.posts.filter(p => p.category === cat.id).length;
    return `
      <tr class="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
        <td class="py-3.5 px-4 text-xs font-mono text-gray-400">${idx + 1}</td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-lg shrink-0">
              <i class="ph ${cat.icon || 'ph-folder'}"></i>
            </div>
            <div>
              <div class="text-sm font-bold text-white">${cat.name}</div>
              <div class="text-xs text-gray-400 line-clamp-1">${cat.description || ''}</div>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-900/50 text-pink-300 border border-purple-500/30">
            ${count} Yazı
          </span>
        </td>
        <td class="py-3.5 px-4 text-right whitespace-nowrap">
          <button onclick="deleteCategory('${cat.id}')" class="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold transition-colors" title="Kategoriyi Sil">
            <i class="ph ph-trash"></i> Sil
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function saveCategoryFromForm() {
  const name = document.getElementById('category-form-name').value.trim();
  const description = document.getElementById('category-form-desc').value.trim();
  const icon = document.getElementById('category-form-icon').value || 'ph-folder';

  if (!name) {
    alert('Lütfen kategori adını girin!');
    return;
  }

  const slugBase = typeof toAsciiSlug === 'function' ? toAsciiSlug(name) : name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newId = (slugBase.substring(0, 30) || 'kategori') + '-' + Date.now().toString().slice(-4);

  const newCategory = {
    id: newId,
    name,
    icon,
    badgeColor: "from-pink-500 to-purple-500",
    description: description || `${name} kategorisine ait ders materyalleri ve yazılar.`,
    count: 0
  };

  ACADEMY_DATA.categories.push(newCategory);
  saveCategoriesToStorage(ACADEMY_DATA.categories);

  showToast(`📁 "${name}" kategorisi başarıyla eklendi!`);
  document.getElementById('admin-category-form').reset();
  renderAdminDashboard();
  renderCategoriesPage();
}

function deleteCategory(catId) {
  if (ACADEMY_DATA.categories.length <= 1) {
    alert('En az 1 kategori bulunmalıdır. Bu kategori silinemez!');
    return;
  }

  const cat = ACADEMY_DATA.categories.find(c => c.id === catId);
  if (!cat) return;

  if (confirm(`"${cat.name}" kategorisini silmek istediğinize emin misiniz? Bu kategoriye ait yazılar korunacaktır.`)) {
    const updated = ACADEMY_DATA.categories.filter(c => c.id !== catId);
    saveCategoriesToStorage(updated);
    showToast('🗑️ Kategori silindi.');
    renderAdminDashboard();
    renderCategoriesPage();
  }
}

// JSON Yedekleme
function exportBackupJSON() {
  const dataToExport = {
    posts: ACADEMY_DATA.posts,
    categories: ACADEMY_DATA.categories,
    author: ACADEMY_DATA.author,
    exportDate: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `merve-samak-akademi-yedek-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('💾 Tüm site verileri ve kategoriler yedeklendi.');
}

function importBackupJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (imported.posts && Array.isArray(imported.posts)) {
        savePostsToStorage(imported.posts);
        if (imported.categories) saveCategoriesToStorage(imported.categories);
        if (imported.author) saveAuthorToStorage(imported.author);
        showToast('🎉 Yedek dosyası başarıyla yüklendi!');
        renderAdminDashboard();
        renderHomePage();
      } else {
        alert('Geçersiz yedek dosyası formatı!');
      }
    } catch(err) {
      alert('Dosya okunurken bir hata oluştu: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Global Tanımlar
window.editPost = editPost;
window.deletePost = deletePost;
window.resetPostForm = resetPostForm;
window.deleteCategory = deleteCategory;

window.openAdminLoginModal = function() {
  if (isAdminLoggedIn()) {
    window.location.hash = '#admin';
  } else {
    document.getElementById('admin-login-modal').classList.remove('hidden');
  }
};
window.closeAdminLoginModal = function() {
  document.getElementById('admin-login-modal').classList.add('hidden');
};
