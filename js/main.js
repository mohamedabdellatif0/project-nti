/* ============================================
   GADGETIZE — MAIN JAVASCRIPT
   main.js
   ============================================ */

/* ============================================
   1. DOM READY
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     2. HELPER — Close All Dropdowns
     ========================================== */

  function closeAllDropdowns() {
    document
      .querySelectorAll(".tb-dropdown")
      .forEach((d) => d.classList.remove("open"));
    document
      .querySelectorAll(".tb-menu")
      .forEach((m) => m.classList.remove("open"));
    if (megaMenu) megaMenu.classList.remove("open");
  }

  /* ==========================================
     3. TOP BAR DROPDOWNS (Language + Currency)
     ========================================== */

  document.querySelectorAll(".tb-dropdown").forEach((dropdown) => {
    const btn = dropdown.querySelector(".tb-btn");
    const menu = dropdown.querySelector(".tb-menu");
    if (!btn || !menu) return;

    // Toggle on button click
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add("open");
        menu.classList.add("open");
      }
    });

    // Select item
    menu.querySelectorAll(".tb-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        // Update active state
        menu
          .querySelectorAll(".tb-item")
          .forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        // Update button label
        const flag = item.querySelector(".tb-flag");
        const label = item.dataset.label;
        const btnFlag = btn.querySelector(".tb-flag");
        const btnLabel = btn.querySelector(".tb-label");

        // ✅ Fix: copy src + alt (not className) so the flag image updates correctly
        if (flag && btnFlag) {
          btnFlag.src = flag.src;
          btnFlag.alt = flag.alt;
        }
        if (btnLabel) btnLabel.textContent = label;

        closeAllDropdowns();
      });
    });
  });

  /* ==========================================
     4. MEGA MENU — Browse All Categories
     ========================================== */

  const browseBtn = document.getElementById("browseBtn");
  const megaMenu = document.getElementById("megaMenu");

  if (browseBtn && megaMenu) {
    const megaCats = document.querySelectorAll(".mega-cat");
    const megaPanels = document.querySelectorAll(".mega-panel");
    const megaRight = document.querySelector(".mega-right");

    // Toggle mega menu on button click
    browseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = megaMenu.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        megaMenu.classList.add("open");
        megaRight.classList.remove("visible");
        megaCats.forEach((c) => c.classList.remove("active"));
      }
    });

    // Hover on category → show right panel
    megaCats.forEach((cat) => {
      cat.addEventListener("mouseenter", () => {
        megaRight.classList.add("visible");
        megaMenu.classList.add("expanded");
        megaCats.forEach((c) => c.classList.remove("active"));
        megaPanels.forEach((p) => p.classList.remove("active"));
        cat.classList.add("active");
        const panel = document.querySelector(
          `.mega-panel[data-panel="${cat.dataset.cat}"]`,
        );
        if (panel) panel.classList.add("active");
      });
    });

    // Mouse leaves mega menu → hide right panel
    megaMenu.addEventListener("mouseleave", () => {
      megaRight.classList.remove("visible");
      megaMenu.classList.remove("expanded");
      megaCats.forEach((c) => c.classList.remove("active"));
    });

    megaMenu.addEventListener("click", (e) => e.stopPropagation());
  }

  /* ==========================================
     5. CLOSE ALL ON OUTSIDE CLICK
     ========================================== */

  document.addEventListener("click", () => closeAllDropdowns());

  /* ==========================================
     6. FEATURED PRODUCTS — Filter Tabs
     ========================================== */

  const tabs = document.querySelectorAll(".tab-item");
  const cards = document.querySelectorAll(".pro-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selected = tab.dataset.tab;

      cards.forEach((card) => {
        if (selected === "all" || card.dataset.cat === selected) {
          card.classList.remove("hidden");
          card.style.animation = "none";
          card.offsetHeight; // reflow
          card.style.animation = "fadeInCard 0.3s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /* ==========================================
     7. ADD TO CART — Featured Cards
     ========================================== */

  document.querySelectorAll(".pro-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.textContent;
      btn.textContent = "✓ Added!";
      btn.style.background = "var(--green)";
      btn.style.color = "#fff";

      updateCount("cartCount", 1);
      updateCount("mobCartCount", 1);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 1500);
    });
  });

  /* ==========================================
     8. ADD TO CART — Recommended Cards
     ========================================== */

  document.querySelectorAll(".rec-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.textContent;
      btn.textContent = "✓ Added!";
      btn.style.background = "var(--green)";
      btn.style.color = "#fff";

      updateCount("cartCount", 1);
      updateCount("mobCartCount", 1);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 1500);
    });
  });

  /* ==========================================
     9. WISHLIST BUTTONS
     ========================================== */

  document
    .querySelectorAll(
      '.pro-action-btn[title="Wishlist"], .rec-icon:first-child',
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const icon = btn.querySelector("i");
        if (!icon) return;

        if (icon.classList.contains("fa-regular")) {
          icon.classList.replace("fa-regular", "fa-solid");
          icon.style.color = "var(--red)";
          updateCount("wishlistCount", 1);
          updateCount("mobWishCount", 1);
        } else {
          icon.classList.replace("fa-solid", "fa-regular");
          icon.style.color = "";
          updateCount("wishlistCount", -1);
          updateCount("mobWishCount", -1);
        }
      });
    });

  /* ==========================================
     10. COUNTDOWN TIMER
     ========================================== */

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 11);
  deadline.setHours(deadline.getHours() + 4);
  deadline.setMinutes(deadline.getMinutes() + 35);

  function updateCountdown() {
    const diff = deadline - Date.now();
    if (diff <= 0) return;

    const pad = (n) => String(n).padStart(2, "0");
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const el = (id) => document.getElementById(id);

    // Special offer sidebar
    if (el("days")) el("days").textContent = pad(d);
    if (el("hours")) el("hours").textContent = pad(h);
    if (el("mins")) el("mins").textContent = pad(m);
    if (el("secs")) el("secs").textContent = pad(s);

    // Offer banner
    if (el("ob-days")) el("ob-days").textContent = pad(d);
    if (el("ob-hours")) el("ob-hours").textContent = pad(h);
    if (el("ob-mins")) el("ob-mins").textContent = pad(m);
    if (el("ob-secs")) el("ob-secs").textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================
     11. FETCH PRODUCTS FROM API (optional)
     ========================================== */

  async function fetchProducts() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      const data = await res.json();
      console.log("Products loaded:", data.data.length);
    } catch (err) {
      console.warn("API fetch failed — using static content", err);
    }
  }

  fetchProducts();

  /* ==========================================
     12. ADD TO CART API (if user is logged in)
     ========================================== */

  async function addToCartAPI(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to add to cart.");
      return;
    }
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      console.log("Cart response:", data);
    } catch (err) {
      console.error("Add to cart API error:", err);
    }
  }

  /* ==========================================
     13. SEARCH BAR — Enter Key
     ========================================== */

  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = searchInput.value.trim();
        if (q) console.log("Search:", q);
      }
    });
  }
}); // end DOMContentLoaded

/* ============================================
   14. HELPER — Update Badge Count
   ============================================ */

function updateCount(id, delta) {
  const el = document.getElementById(id);
  if (el) el.textContent = Math.max(0, parseInt(el.textContent) + delta);
}

/* ============================================
   15. SCROLL TO TOP
   ============================================ */

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================
   16. POPULAR PRODUCTS — Filter Tabs
   ============================================ */

const recTabs = document.querySelectorAll(".rec-tab");
const recCards = document.querySelectorAll("#recGrid1 .rec-card");

recTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    recTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    recCards.forEach((card) => {
      if (filter === "all" || card.dataset.cat === filter) {
        card.style.display = "";
        card.style.animation = "fadeInCard 0.3s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ============================================
   17. DARK MODE TOGGLE
   ============================================ */

(function () {
  /* -- Inject toggle button into Top Bar -- */
  function injectToggleButton() {
    const topBarRight = document.querySelector(".top-bar-right");
    if (!topBarRight) return;

    const sep = document.createElement("span");
    sep.className = "tb-sep";
    sep.textContent = "|";

    const btn = document.createElement("button");
    btn.className = "dark-toggle";
    btn.id = "darkToggle";
    btn.setAttribute("title", "Toggle Dark Mode");
    btn.setAttribute("aria-label", "Toggle Dark Mode");

    btn.innerHTML = `
      <div class="dark-toggle-track">
        <div class="dark-toggle-thumb"></div>
      </div>
    `;

    topBarRight.appendChild(sep);
    topBarRight.appendChild(btn);

    btn.addEventListener("click", toggleDarkMode);
  }

  /* -- Toggle logic -- */
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("gadgetize-theme", isDark ? "dark" : "light");
    updateLabel(isDark);
  }

  function updateLabel(isDark) {
    const label = document.querySelector(".dark-toggle-label");
    if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  /* -- Restore saved preference -- */
  function restoreTheme() {
    const saved = localStorage.getItem("gadgetize-theme");
    const prefersDark =
      saved === "dark" ||
      (saved === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (prefersDark) document.body.classList.add("dark-mode");
  }

  /* -- Watch system preference changes -- */
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("gadgetize-theme")) {
        document.body.classList.toggle("dark-mode", e.matches);
      }
    });

  /* -- Init (restore theme before first render to prevent flash) -- */
  restoreTheme();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectToggleButton();
      updateLabel(document.body.classList.contains("dark-mode"));
    });
  } else {
    injectToggleButton();
    updateLabel(document.body.classList.contains("dark-mode"));
  }
})();
