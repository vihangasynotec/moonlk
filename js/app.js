/**
 * MoonLK Clothing - Main Application Entry & Page Orchestration
 * Kurunegala, Sri Lanka
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render of Products Grid
  window.moonShop.renderProducts();
  window.moonShop.renderCartDrawer();
  window.moonShop.renderWishlistDrawer();
  window.moonShop.updateHeaderCounters();
  window.moonShop.updateWishlistIcons();

  // 2. Initialize Lookbook
  initLookbook();

  // 3. Initialize Journal
  initJournal();

  // 4. Initialize Instagram Feed
  initInstagram();

  // 5. Initialize Atelier Flagship Appointment Booking
  initAtelierBooking();

  // 6. Initialize Newsletter VIP Club
  initNewsletter();

  // 7. Initialize Currency Toggle
  initCurrencyControls();

  // 8. Initialize Quick Search & Shortcuts
  initSearch();

  // 9. Initialize Size Guide Modal
  initSizeGuide();

  // 10. Bind Drawer & Navigation Triggers
  bindGlobalNavTriggers();
});

// --- Lookbook Interactive Spread ---
let currentLookIndex = 0;

function initLookbook() {
  renderCurrentLook();

  const prevBtn = document.getElementById("lookbookPrevBtn");
  const nextBtn = document.getElementById("lookbookNextBtn");

  prevBtn?.addEventListener("click", () => {
    currentLookIndex = (currentLookIndex - 1 + MOONLK_DATA.lookbook.length) % MOONLK_DATA.lookbook.length;
    renderCurrentLook();
  });

  nextBtn?.addEventListener("click", () => {
    currentLookIndex = (currentLookIndex + 1) % MOONLK_DATA.lookbook.length;
    renderCurrentLook();
  });
}

function renderCurrentLook() {
  const look = MOONLK_DATA.lookbook[currentLookIndex];
  if (!look) return;

  const titleEl = document.getElementById("lookbookTitle");
  const seasonEl = document.getElementById("lookbookSeason");
  const quoteEl = document.getElementById("lookbookQuote");
  const imgEl = document.getElementById("lookbookMainImage");
  const hotspotsContainer = document.getElementById("lookbookHotspots");
  const counterEl = document.getElementById("lookbookCounter");

  if (titleEl) titleEl.textContent = look.title;
  if (seasonEl) seasonEl.textContent = look.season;
  if (quoteEl) quoteEl.textContent = `“${look.quote}”`;
  if (imgEl) imgEl.src = look.image;
  if (counterEl) counterEl.textContent = `0${currentLookIndex + 1} / 0${MOONLK_DATA.lookbook.length}`;

  // Hotspots rendering
  if (hotspotsContainer) {
    hotspotsContainer.innerHTML = look.hotspots.map((spot, i) => `
      <div class="hotspot-pin" style="top: ${spot.y}%; left: ${spot.x}%;" data-product-id="${spot.productId}">
        ${i + 1}
        <div class="hotspot-tooltip">
          <div class="hotspot-tooltip-title">${spot.productName}</div>
          <div class="hotspot-tooltip-price">${spot.price} · View Piece</div>
        </div>
      </div>
    `).join("");

    hotspotsContainer.querySelectorAll(".hotspot-pin").forEach(pin => {
      pin.addEventListener("click", () => {
        const prodId = pin.dataset.productId;
        if (prodId) window.moonShop.openProductModal(prodId);
      });
    });
  }
}

// --- Atelier Journal ---
function initJournal() {
  const container = document.getElementById("journalGrid");
  if (!container) return;

  container.innerHTML = MOONLK_DATA.journal.map(post => `
    <article class="journal-card">
      <div class="journal-card-media">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </div>
      <div class="journal-card-body">
        <div class="journal-meta">
          <span class="journal-category">${post.category}</span>
          <span>${post.date} · ${post.readTime}</span>
        </div>
        <h4 class="journal-title">${post.title}</h4>
        <p class="journal-excerpt">${post.excerpt}</p>
        <button class="btn-text" style="align-self: flex-start; margin-top: auto;" onclick="openJournalModal('${post.id}')">Read Essay →</button>
      </div>
    </article>
  `).join("");
}

function openJournalModal(journalId) {
  const post = MOONLK_DATA.journal.find(j => j.id === journalId);
  if (!post) return;

  const modal = document.getElementById("journalModal");
  if (!modal) return;

  modal.querySelector(".journal-modal-category").textContent = post.category;
  modal.querySelector(".journal-modal-title").textContent = post.title;
  modal.querySelector(".journal-modal-date").textContent = `${post.date} · ${post.readTime}`;
  modal.querySelector(".journal-modal-image").src = post.image;
  modal.querySelector(".journal-modal-body-text").innerHTML = `
    <p style="font-size: 1.05rem; line-height: 1.8; color: var(--color-charcoal-700); margin-bottom: 1.25rem;">${post.excerpt}</p>
    <p style="line-height: 1.75; color: var(--color-charcoal-600); margin-bottom: 1.25rem;">
      In our Kurunegala workshop nestled near the historic rock ramparts, our patternmakers adhere to a quiet rhythm.
      We believe true luxury is tactile and patient: hand-spun organic threads, natural botanical softening baths, and minimal seams that breathe alongside the human form.
    </p>
    <p style="line-height: 1.75; color: var(--color-charcoal-600);">
      Every piece crafted for MoonLK carries this intention. An understated elegance rooted in the soil of Sri Lanka, made for modern wanderers everywhere.
    </p>
  `;

  window.moonUI.openModal("journalModal");
}
window.openJournalModal = openJournalModal;

// --- Social & Community Feed ---
function initInstagram() {
  const container = document.getElementById("instaGrid");
  if (!container) return;

  container.innerHTML = MOONLK_DATA.instagram.map((item, idx) => `
    <a href="https://www.tiktok.com/@moon.lk4" target="_blank" rel="noopener" class="insta-item" style="display:block; text-decoration:none;">
      <img src="${item.image}" alt="MoonLK Community Feed ${idx + 1}" loading="lazy">
      <div class="insta-overlay">
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.37 0 .72.07 1.05.2v-3.52a6.38 6.38 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.67 6.33 6.33 0 0 0 9.33 22a6.33 6.33 0 0 0 6.33-6.33V8.89a8.28 8.28 0 0 0 4.88 1.57V7a4.87 4.87 0 0 1-.95-.31z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight:600; letter-spacing:0.04em;">Watch on TikTok</span>
        </div>
      </div>
    </a>
  `).join("");
}

function openInstaLightbox(index) {
  window.open("https://www.tiktok.com/@moon.lk4", "_blank");
}
window.openInstaLightbox = openInstaLightbox;

// --- Atelier Flagship Booking Modal ---
function initAtelierBooking() {
  const openBtns = document.querySelectorAll("[data-open-booking]");
  openBtns.forEach(b => b.addEventListener("click", () => {
    window.moonUI.openModal("bookingModal");
  }));

  const form = document.getElementById("atelierBookingForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("bookName")?.value;
    const date = document.getElementById("bookDate")?.value;
    const time = document.getElementById("bookTime")?.value;

    window.moonUI.closeModal("bookingModal");
    window.moonUI.showToast(
      `Private fitting requested for ${name} on ${date} at ${time}. Our Kurunegala concierge will reach out.`,
      "success"
    );
    form.reset();
  });
}

// --- VIP Newsletter ---
function initNewsletter() {
  const form = document.getElementById("vipNewsletterForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterEmail");
    if (!input || !input.value) return;

    window.moonUI.showToast(
      `Welcome to the MoonLK Atelier Club. Use code "MOONLK10" for 10% off your order.`,
      "success"
    );
    // Automatically apply privilege code in state
    window.moonState.applyCoupon("MOONLK10");
    input.value = "";
  });
}

// --- Currency Controls ---
function initCurrencyControls() {
  const current = window.moonState.currency;
  document.querySelectorAll(".currency-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.currency === current);
    btn.addEventListener("click", () => {
      document.querySelectorAll(".currency-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      window.moonState.setCurrency(btn.dataset.currency);
      window.moonUI.showToast(`Currency switched to ${btn.dataset.currency}`, "info");
    });
  });
}

// --- Search Overlay & Shortcuts ---
function initSearch() {
  const searchTriggers = document.querySelectorAll("[data-open-search]");
  searchTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      window.moonUI.openModal("searchModal");
      setTimeout(() => {
        document.getElementById("overlaySearchInput")?.focus();
      }, 100);
    });
  });

  // Shortcut Ctrl+K / Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      window.moonUI.openModal("searchModal");
      setTimeout(() => {
        document.getElementById("overlaySearchInput")?.focus();
      }, 100);
    }
  });

  // Modal search live input
  const input = document.getElementById("overlaySearchInput");
  const resultsContainer = document.getElementById("overlaySearchResults");
  input?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      if (resultsContainer) resultsContainer.innerHTML = `<p style="text-align:center; color:var(--color-charcoal-400); font-size:0.875rem;">Type keywords like "Linen", "Slip Gown", "Blazer", or "Silk"...</p>`;
      return;
    }

    const matches = MOONLK_DATA.products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      if (resultsContainer) resultsContainer.innerHTML = `<p style="text-align:center; color:var(--color-charcoal-600); font-size:0.875rem;">No matching garments found for "${q}".</p>`;
      return;
    }

    if (resultsContainer) {
      resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-row" style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem 0; border-bottom:1px solid var(--color-border); cursor:pointer;" onclick="window.moonUI.closeModal('searchModal'); window.moonShop.openProductModal('${p.id}');">
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <img src="${p.images[0]}" style="width:40px; height:52px; object-fit:cover; border-radius:2px;" alt="${p.name}">
            <div>
              <div style="font-weight:600; font-size:0.875rem; color:var(--color-charcoal-900);">${p.name}</div>
              <div style="font-size:0.75rem; color:var(--color-charcoal-400); text-transform:uppercase;">${p.category} · ${p.material}</div>
            </div>
          </div>
          <span style="font-weight:600; font-size:0.8125rem;">${window.moonState.formatPrice(p.priceLKR)}</span>
        </div>
      `).join("");
    }
  });
}

// --- Size Guide Modal ---
function initSizeGuide() {
  document.querySelectorAll("[data-open-size-guide]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.moonUI.openModal("sizeGuideModal");
    });
  });

  const unitBtns = document.querySelectorAll(".size-unit-btn");
  unitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      unitBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const unit = btn.dataset.unit; // 'cm' or 'in'
      document.querySelectorAll(".size-chart-table [data-cm]").forEach(td => {
        td.textContent = unit === "cm" ? td.dataset.cm : td.dataset.in;
      });
    });
  });
}

// --- Global Drawer & Nav Triggers ---
function bindGlobalNavTriggers() {
  // Cart drawer triggers
  document.querySelectorAll("[data-open-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.moonUI.openDrawer("cartDrawer");
    });
  });

  // Wishlist drawer triggers
  document.querySelectorAll("[data-open-wishlist]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.moonUI.openDrawer("wishlistDrawer");
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileNavToggle");
  mobileToggle?.addEventListener("click", () => {
    window.moonUI.openDrawer("mobileNavDrawer");
  });

  // Close drawer buttons
  document.querySelectorAll(".drawer-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      window.moonUI.closeAllDrawers();
    });
  });

  // Close modal buttons
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) modal.classList.remove("active");
      document.body.classList.remove("lock-scroll");
    });
  });

  // Category portal cards: click navigates & filters shop
  document.querySelectorAll(".category-portal-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.targetCategory;
      const targetPill = document.querySelector(`.filter-pill[data-category="${cat}"]`);
      if (targetPill) targetPill.click();

      const shopSec = document.getElementById("shopSection");
      shopSec?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
