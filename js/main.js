document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     HELPERS
     ============================================================ */
  function closeAllDropdowns() {
    document.querySelectorAll('.tb-dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.tb-menu').forEach(m => m.classList.remove('open'));
    if (megaMenu) megaMenu.classList.remove('open');
  }

  /* ============================================================
     TOP BAR DROPDOWNS (Language + Currency)
     ============================================================ */
  document.querySelectorAll('.tb-dropdown').forEach(dropdown => {
    const btn  = dropdown.querySelector('.tb-btn');
    const menu = dropdown.querySelector('.tb-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('open');
        menu.classList.add('open');
      }
    });

    menu.querySelectorAll('.tb-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();

        // Update active state
        menu.querySelectorAll('.tb-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Update button content
        const flag  = item.querySelector('.tb-flag');
        const label = item.dataset.label;
        const btnFlag  = btn.querySelector('.tb-flag');
        const btnLabel = btn.querySelector('.tb-label');

        if (flag && btnFlag) {
          btnFlag.src = flag.src;
          btnFlag.alt = flag.alt;
        }
        if (btnLabel) btnLabel.textContent = label;

        closeAllDropdowns();
      });
    });
  });

  /* ============================================================
     MEGA MENU — Browse All Categories
     ============================================================ */
  const browseBtn = document.getElementById('browseBtn');
  const megaMenu  = document.getElementById('megaMenu');

  if (browseBtn && megaMenu) {

    const megaCats   = document.querySelectorAll('.mega-cat');
    const megaPanels = document.querySelectorAll('.mega-panel');
    const megaRight  = document.querySelector('.mega-right');

    browseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = megaMenu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        megaMenu.classList.add('open');
        megaRight.classList.remove('visible');
        megaCats.forEach(c => c.classList.remove('active'));
      }
    });

    // Hover على category يظهر الـ panel الأيمن
    megaCats.forEach(cat => {
      cat.addEventListener('mouseenter', () => {
        megaRight.classList.add('visible');
        megaMenu.classList.add('expanded');
        megaCats.forEach(c => c.classList.remove('active'));
        megaPanels.forEach(p => p.classList.remove('active'));
        cat.classList.add('active');
        const panel = document.querySelector(`.mega-panel[data-panel="${cat.dataset.cat}"]`);
        if (panel) panel.classList.add('active');
      });
    });

    // لما الماوس يطلع من المنيو كله — إخفاء الأيمن
    megaMenu.addEventListener('mouseleave', () => {
      megaRight.classList.remove('visible');
      megaMenu.classList.remove('expanded');
      megaCats.forEach(c => c.classList.remove('active'));
    });

    megaMenu.addEventListener('click', (e) => e.stopPropagation());
  }

  /* ============================================================
     CLOSE ALL ON OUTSIDE CLICK
     ============================================================ */
  document.addEventListener('click', () => closeAllDropdowns());

  /* ============================================================
     FEATURED PRODUCTS TABS
     ============================================================ */
  const tabs  = document.querySelectorAll('.tab-item');
  const cards = document.querySelectorAll('.pro-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selected = tab.dataset.tab;

      cards.forEach(card => {
        if (selected === 'all' || card.dataset.cat === selected) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = 'fadeInCard 0.3s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ============================================================
     ADD TO CART — Featured Cards
     ============================================================ */
  document.querySelectorAll('.pro-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'var(--green)';
      btn.style.color = '#fff';

      // Update cart count
      const cartEl = document.getElementById('cartCount');
      const mobCartEl = document.getElementById('mobCartCount');
      if (cartEl) cartEl.textContent = parseInt(cartEl.textContent) + 1;
      if (mobCartEl) mobCartEl.textContent = parseInt(mobCartEl.textContent) + 1;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);
    });
  });

  /* ============================================================
     ADD TO CART — Recommended Cards
     ============================================================ */
  document.querySelectorAll('.rec-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'var(--green)';
      btn.style.color = '#fff';

      const cartEl = document.getElementById('cartCount');
      const mobCartEl = document.getElementById('mobCartCount');
      if (cartEl) cartEl.textContent = parseInt(cartEl.textContent) + 1;
      if (mobCartEl) mobCartEl.textContent = parseInt(mobCartEl.textContent) + 1;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);
    });
  });

  /* ============================================================
     WISHLIST BUTTONS
     ============================================================ */
  document.querySelectorAll('.pro-action-btn[title="Wishlist"], .rec-icon:first-child').forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      if (!icon) return;

      if (icon.classList.contains('fa-regular')) {
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.style.color = 'var(--red)';
        const wishEl = document.getElementById('wishlistCount');
        const mobWishEl = document.getElementById('mobWishCount');
        if (wishEl) wishEl.textContent = parseInt(wishEl.textContent) + 1;
        if (mobWishEl) mobWishEl.textContent = parseInt(mobWishEl.textContent) + 1;
      } else {
        icon.classList.replace('fa-solid', 'fa-regular');
        icon.style.color = '';
        const wishEl = document.getElementById('wishlistCount');
        const mobWishEl = document.getElementById('mobWishCount');
        if (wishEl) wishEl.textContent = Math.max(0, parseInt(wishEl.textContent) - 1);
        if (mobWishEl) mobWishEl.textContent = Math.max(0, parseInt(mobWishEl.textContent) - 1);
      }
    });
  });

  /* ============================================================
     COUNTDOWN TIMER
     ============================================================ */
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 11);
  deadline.setHours(deadline.getHours() + 4);
  deadline.setMinutes(deadline.getMinutes() + 35);

  function updateCountdown() {
    const now  = Date.now();
    const diff = deadline - now;
    if (diff <= 0) return;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const pad = n => String(n).padStart(2, '0');

    const el = (id) => document.getElementById(id);

    // Special offer sidebar countdown
    if (el('days'))  el('days').textContent  = pad(d);
    if (el('hours')) el('hours').textContent = pad(h);
    if (el('mins'))  el('mins').textContent  = pad(m);
    if (el('secs'))  el('secs').textContent  = pad(s);

    // Offer banner countdown
    if (el('ob-days'))  el('ob-days').textContent  = pad(d);
    if (el('ob-hours')) el('ob-hours').textContent = pad(h);
    if (el('ob-mins'))  el('ob-mins').textContent  = pad(m);
    if (el('ob-secs'))  el('ob-secs').textContent  = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================================
     FETCH PRODUCTS FROM API (optional)
     ============================================================ */
  async function fetchProducts() {
    try {
      const res  = await fetch('https://ecommerce.routemisr.com/api/v1/products');
      const data = await res.json();
      console.log('Products loaded:', data.data.length);
      // يمكن استخدام data.data هنا لتعبئة الكارتس ديناميكيًا
    } catch (err) {
      console.warn('API fetch failed — using static content', err);
    }
  }

  fetchProducts();

  /* ============================================================
     ADD TO CART API (لو المستخدم logged in)
     ============================================================ */
  async function addToCartAPI(productId) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to add to cart.');
      return;
    }
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      console.log('Cart response:', data);
    } catch (err) {
      console.error('Add to cart API error:', err);
    }
  }

  /* ============================================================
     SEARCH BAR FOCUS EFFECT
     ============================================================ */
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) console.log('Search:', q);
      }
    });
  }

});

  /* ============================================================
     SCROLL TO TOP
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     POPULAR PRODUCTS TABS
     ============================================================ */
  const recTabs = document.querySelectorAll('.rec-tab');
  const recCards = document.querySelectorAll('#recGrid1 .rec-card');

  recTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      recTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      recCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInCard 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  
