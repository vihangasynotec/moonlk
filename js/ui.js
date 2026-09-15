/**
 * MoonLK Clothing - UI Micro-Interactions, Drawers, Modals & Toast Controller
 */

class MoonLKUI {
  constructor() {
    this.toastContainer = null;
    this.initToastContainer();
    this.bindGlobalEvents();
  }

  initToastContainer() {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = "toast animate-fade-in";
    
    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (type === "wishlist") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // --- Drawer Management ---
  openDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    const overlay = document.getElementById("drawerOverlay");
    if (!drawer || !overlay) return;

    overlay.classList.add("active");
    drawer.classList.add("active");
    document.body.classList.add("lock-scroll");
  }

  closeAllDrawers() {
    const drawers = document.querySelectorAll(".drawer, .mobile-nav-drawer");
    const overlay = document.getElementById("drawerOverlay");
    drawers.forEach(d => d.classList.remove("active"));
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("lock-scroll");
  }

  // --- Modal Management ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    document.body.classList.add("lock-scroll");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("active");
    // Check if any other modal is open
    const openModals = document.querySelectorAll(".modal-overlay.active");
    if (openModals.length === 0) {
      document.body.classList.remove("lock-scroll");
    }
  }

  closeAllModals() {
    const modals = document.querySelectorAll(".modal-overlay");
    modals.forEach(m => m.classList.remove("active"));
    document.body.classList.remove("lock-scroll");
  }

  // --- Global Event Bindings ---
  bindGlobalEvents() {
    // Sticky header detection
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    });

    // Close drawers when clicking overlay
    const overlay = document.getElementById("drawerOverlay");
    overlay?.addEventListener("click", () => this.closeAllDrawers());

    // Close drawers with ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllDrawers();
        this.closeAllModals();
      }
    });

    // Close modals on overlay backdrop click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          document.body.classList.remove("lock-scroll");
        }
      });
    });

    // Accordions
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".accordion-trigger");
      if (trigger) {
        const item = trigger.closest(".accordion-item");
        const isOpen = item.classList.contains("open");
        // Close siblings if desired
        item.parentElement.querySelectorAll(".accordion-item").forEach(el => el.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      }
    });
  }
}

window.moonUI = new MoonLKUI();
