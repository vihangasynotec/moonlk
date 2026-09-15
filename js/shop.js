/**
 * MoonLK Clothing - Catalog, Filtering, Search, Product Modals, and Cart Rendering
 */

class MoonLKShop {
  constructor() {
    this.currentCategory = "all";
    this.currentSort = "featured";
    this.searchQuery = "";
    this.currentView = "grid"; // 'grid' (4-col) or 'editorial' (2-col)

    this.selectedModalProduct = null;
    this.selectedModalSize = null;
    this.selectedModalColor = null;

    this.init();
  }

  init() {
    this.bindShopControls();
    this.bindStateSync();
  }

  bindStateSync() {
    // Listen to reactive state changes
    window.moonState.subscribe((event, payload) => {
      if (event === "cart_updated") {
        this.renderCartDrawer();
        this.updateHeaderCounters();
      } else if (event === "wishlist_updated") {
        this.renderWishlistDrawer();
        this.updateWishlistIcons();
        this.updateHeaderCounters();
      } else if (event === "currency_changed") {
        this.renderProducts();
        this.renderCartDrawer();
        this.renderWishlistDrawer();
        if (this.selectedModalProduct) {
          this.updateModalPrice();
        }
      }
    });
  }

  bindShopControls() {
    // Category tabs
    document.querySelectorAll(".filter-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentCategory = pill.dataset.category || "all";
        this.renderProducts();
      });
    });

    // Sorting dropdown
    const sortSelect = document.getElementById("shopSortSelect");
    sortSelect?.addEventListener("change", (e) => {
      this.currentSort = e.target.value;
      this.renderProducts();
    });

    // Grid vs Editorial view switcher
    const viewGridBtn = document.getElementById("viewGridBtn");
    const viewEditorialBtn = document.getElementById("viewEditorialBtn");
    const productsContainer = document.getElementById("productsGrid");

    viewGridBtn?.addEventListener("click", () => {
      this.currentView = "grid";
      viewGridBtn.classList.add("active");
      viewEditorialBtn?.classList.remove("active");
      productsContainer?.classList.remove("grid-view-editorial");
    });

    viewEditorialBtn?.addEventListener("click", () => {
      this.currentView = "editorial";
      viewEditorialBtn.classList.add("active");
      viewGridBtn?.classList.remove("active");
      productsContainer?.classList.add("grid-view-editorial");
    });

    // Live search input
    const searchInputs = document.querySelectorAll(".live-search-input");
    searchInputs.forEach(input => {
      input.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    });

    // Coupon code form in cart
    const couponForm = document.getElementById("cartCouponForm");
    couponForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("couponInput");
      if (!input) return;
      const res = window.moonState.applyCoupon(input.value);
      if (res.success) {
        window.moonUI.showToast(res.message, "success");
        input.value = "";
      } else {
        window.moonUI.showToast(res.message, "error");
      }
    });
  }

  // --- Filtering & Sorting Data Pipeline ---
  getFilteredProducts() {
    let list = [...MOONLK_DATA.products];

    // Filter by category
    if (this.currentCategory !== "all") {
      list = list.filter(p => p.category === this.currentCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.material.toLowerCase().includes(this.searchQuery) ||
        p.edition.toLowerCase().includes(this.searchQuery) ||
        p.category.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sorting
    switch (this.currentSort) {
      case "price-low":
        list.sort((a, b) => a.priceLKR - b.priceLKR);
        break;
      case "price-high":
        list.sort((a, b) => b.priceLKR - a.priceLKR);
        break;
      case "newest":
        list.sort((a, b) => (b.badge === "NEW" || b.badge === "NEW ARRIVAL" ? 1 : -1));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }

  // --- Render Products Grid ---
  renderProducts() {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    const products = this.getFilteredProducts();

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 class="heading-card" style="margin-bottom: 0.5rem;">No Silhouettes Found</h3>
          <p class="lead-text" style="font-size: 0.9375rem;">Try adjusting your filters or search keywords.</p>
          <button class="btn btn-outline-dark" style="margin-top: 1.5rem;" onclick="moonShop.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => this.createProductCardHTML(product)).join("");
    this.bindCardInteractions();
  }

  resetFilters() {
    this.currentCategory = "all";
    this.searchQuery = "";
    document.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === "all");
    });
    document.querySelectorAll(".live-search-input").forEach(i => i.value = "");
    this.renderProducts();
  }

  createProductCardHTML(product) {
    const isInWishlist = window.moonState.isInWishlist(product.id);
    const formattedPrice = window.moonState.formatPrice(product.priceLKR);
    const secondaryImg = product.images[1] || product.images[0];

    // Status badge class
    let badgeClass = "badge-new";
    if (product.badge === "BESTSELLER") badgeClass = "badge-bestseller";
    if (product.badge === "LIMITED" || product.badge === "LIMITED EDITION") badgeClass = "badge-limited";
    if (product.badge === "ATELIER EXCLUSIVE" || product.badge === "RUNWAY PIECE") badgeClass = "badge-exclusive";

    // Swatches HTML
    const swatchesHTML = product.colorOptions.map(c => `
      <span class="swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
    `).join("");

    // Quick add size pills HTML
    const sizePillsHTML = product.sizes.map(size => `
      <button class="size-pill-btn" data-product-id="${product.id}" data-size="${size}">${size}</button>
    `).join("");

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-card-media">
          ${product.badge ? `<span class="badge ${badgeClass} product-card-badge">${product.badge}</span>` : ""}
          <button class="product-card-wishlist ${isInWishlist ? "active" : ""}" data-wishlist-id="${product.id}" title="Save to Wishlist" aria-label="Save to Wishlist">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${isInWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          <img class="product-card-image" src="${product.images[0]}" alt="${product.name}" loading="lazy">
          <img class="product-card-image-secondary" src="${secondaryImg}" alt="${product.name}" loading="lazy">

          <div class="product-card-quick-add">
            <span class="quick-add-sizes-title">Quick Add Size</span>
            <div class="quick-add-sizes">
              ${sizePillsHTML}
            </div>
          </div>
        </div>

        <div class="product-card-body">
          <span class="product-card-category">${product.category} · ${product.subCategory}</span>
          <h3 class="product-card-title" data-open-modal="${product.id}">${product.name}</h3>
          <div class="product-card-pricing">
            <span class="product-card-price">${formattedPrice}</span>
          </div>
          <div class="product-card-swatches">
            ${swatchesHTML}
          </div>
        </div>
      </article>
    `;
  }

  bindCardInteractions() {
    // Open product modal when clicking card image or title
    document.querySelectorAll(".product-card-media, [data-open-modal]").forEach(el => {
      el.addEventListener("click", (e) => {
        // If clicking on quick-add size pill or wishlist button, don't trigger modal
        if (e.target.closest(".product-card-wishlist") || e.target.closest(".size-pill-btn")) return;
        
        const card = el.closest(".product-card");
        const productId = card?.dataset.productId;
        if (productId) this.openProductModal(productId);
      });
    });

    // Wishlist heart clicks on card
    document.querySelectorAll(".product-card-wishlist").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.wishlistId;
        const added = window.moonState.toggleWishlist(id);
        const product = MOONLK_DATA.products.find(p => p.id === id);
        window.moonUI.showToast(
          added ? `Saved "${product?.name}" to your wishlist.` : `Removed from wishlist.`,
          added ? "wishlist" : "info"
        );
      });
    });

    // Quick-Add size pill clicks
    document.querySelectorAll(".size-pill-btn").forEach(pill => {
      pill.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = pill.dataset.productId;
        const size = pill.dataset.size;
        const res = window.moonState.addToCart(productId, size);
        if (res.success) {
          window.moonUI.showToast(`Added ${res.item.name} (${size}) to Bag`, "success");
          window.moonUI.openDrawer("cartDrawer");
        }
      });
    });
  }

  // --- Product Detail Modal ---
  openProductModal(productId) {
    const product = MOONLK_DATA.products.find(p => p.id === productId);
    if (!product) return;

    this.selectedModalProduct = product;
    this.selectedModalSize = product.sizes[0];
    this.selectedModalColor = product.colorOptions[0] ? product.colorOptions[0].name : "Default";

    const modal = document.getElementById("productModal");
    if (!modal) return;

    // Set Gallery
    const mainImg = modal.querySelector(".product-modal-main-img img");
    const thumbsContainer = modal.querySelector(".product-modal-thumbs");
    if (mainImg) mainImg.src = product.images[0];
    if (thumbsContainer) {
      thumbsContainer.innerHTML = product.images.map((img, idx) => `
        <div class="thumb-item ${idx === 0 ? "active" : ""}" data-thumb-src="${img}">
          <img src="${img}" alt="${product.name} angle ${idx + 1}">
        </div>
      `).join("");

      // Bind thumbnail clicks
      thumbsContainer.querySelectorAll(".thumb-item").forEach(thumb => {
        thumb.addEventListener("click", () => {
          thumbsContainer.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
          thumb.classList.add("active");
          if (mainImg) mainImg.src = thumb.dataset.thumbSrc;
        });
      });
    }

    // Set Details
    const editionEl = modal.querySelector(".product-modal-edition");
    const titleEl = modal.querySelector(".product-modal-title");
    const descEl = modal.querySelector(".product-modal-desc");
    const priceEl = modal.querySelector(".product-modal-price");

    if (editionEl) editionEl.textContent = `${product.edition} · Kurunegala Atelier`;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description;
    if (priceEl) priceEl.textContent = window.moonState.formatPrice(product.priceLKR);

    // Color Swatches
    const colorContainer = modal.querySelector(".modal-colors-wrap");
    const colorLabel = modal.querySelector(".modal-selected-color-name");
    if (colorLabel) colorLabel.textContent = this.selectedModalColor;
    if (colorContainer) {
      colorContainer.innerHTML = product.colorOptions.map((c, idx) => `
        <button class="color-option-btn ${idx === 0 ? "selected" : ""}" 
                style="background-color: ${c.hex};" 
                data-color-name="${c.name}" 
                title="${c.name}"></button>
      `).join("");

      colorContainer.querySelectorAll(".color-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          colorContainer.querySelectorAll(".color-option-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          this.selectedModalColor = btn.dataset.colorName;
          if (colorLabel) colorLabel.textContent = this.selectedModalColor;
        });
      });
    }

    // Sizes
    const sizeContainer = modal.querySelector(".modal-sizes-wrap");
    if (sizeContainer) {
      sizeContainer.innerHTML = product.sizes.map((s, idx) => `
        <button class="size-btn ${idx === 0 ? "selected" : ""}" data-size-val="${s}">${s}</button>
      `).join("");

      sizeContainer.querySelectorAll(".size-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          sizeContainer.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          this.selectedModalSize = btn.dataset.sizeVal;
        });
      });
    }

    // Fabric details bullets
    const craftUl = modal.querySelector(".product-modal-craftsmanship-list");
    if (craftUl && product.details) {
      craftUl.innerHTML = product.details.map(d => `<li>• ${d}</li>`).join("");
    }

    // Material spec
    const matEl = modal.querySelector(".product-modal-material-name");
    if (matEl) matEl.textContent = product.material;

    // Stock warning
    const stockEl = modal.querySelector(".modal-stock-indicator");
    if (stockEl) {
      stockEl.textContent = product.stockCount <= 5 
        ? `Rare silhouette — Only ${product.stockCount} left in Kurunegala Atelier` 
        : `In Stock at Kurunegala Flagship & Ready for Island-wide Dispatch`;
    }

    // Add to Bag Button
    const addBtn = modal.querySelector(".modal-add-bag-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        const res = window.moonState.addToCart(
          product.id, 
          this.selectedModalSize, 
          this.selectedModalColor
        );
        if (res.success) {
          window.moonUI.showToast(`Added ${res.item.name} (${this.selectedModalSize}) to Bag`, "success");
          window.moonUI.closeModal("productModal");
          window.moonUI.openDrawer("cartDrawer");
        }
      };
    }

    // Buy Now Button (Direct checkout)
    const buyNowBtn = modal.querySelector(".modal-buy-now-btn");
    if (buyNowBtn) {
      buyNowBtn.onclick = () => {
        window.moonState.addToCart(
          product.id, 
          this.selectedModalSize, 
          this.selectedModalColor
        );
        window.moonUI.closeModal("productModal");
        window.moonCheckout.openCheckout();
      };
    }

    window.moonUI.openModal("productModal");
  }

  updateModalPrice() {
    if (!this.selectedModalProduct) return;
    const modal = document.getElementById("productModal");
    const priceEl = modal?.querySelector(".product-modal-price");
    if (priceEl) {
      priceEl.textContent = window.moonState.formatPrice(this.selectedModalProduct.priceLKR);
    }
  }

  // --- Render Cart Drawer ---
  renderCartDrawer() {
    const listContainer = document.getElementById("cartItemsList");
    const emptyState = document.getElementById("cartEmptyState");
    const footer = document.getElementById("cartFooter");
    const countBadge = document.getElementById("cartHeaderCount");
    const shippingMeter = document.getElementById("cartShippingProgressBox");

    if (!listContainer) return;

    const cart = window.moonState.cart;
    const totalCount = window.moonState.getCartCount();

    if (countBadge) countBadge.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;

    if (cart.length === 0) {
      listContainer.innerHTML = "";
      listContainer.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
      if (footer) footer.style.display = "none";
      if (shippingMeter) shippingMeter.style.display = "none";
      return;
    }

    listContainer.style.display = "flex";
    if (emptyState) emptyState.style.display = "none";
    if (footer) footer.style.display = "flex";
    if (shippingMeter) shippingMeter.style.display = "block";

    // Free Shipping Progress Calculation
    const subtotal = window.moonState.getCartSubtotalLKR();
    const threshold = window.moonState.freeShippingThresholdLKR;
    const remaining = Math.max(0, threshold - subtotal);
    const percent = Math.min(100, Math.round((subtotal / threshold) * 100));

    const progressFill = document.getElementById("cartShippingFill");
    const progressText = document.getElementById("cartShippingText");

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) {
      if (remaining === 0 || (window.moonState.activeCoupon && window.moonState.activeCoupon.code === "FREESHIP")) {
        progressText.innerHTML = `<strong>✨ You've unlocked Complimentary Island-wide Express Delivery!</strong>`;
      } else {
        progressText.innerHTML = `Add <strong>${window.moonState.formatPrice(remaining)}</strong> more for Complimentary Island-wide Delivery`;
      }
    }

    // Line items HTML
    listContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-cart-item-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-header">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <p class="cart-item-meta">${item.size} · ${item.color}</p>
            </div>
            <button class="cart-item-delete" data-remove-item="${item.id}" title="Remove item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" data-qty-change="-1" data-cart-id="${item.id}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-qty-change="1" data-cart-id="${item.id}">+</button>
            </div>
            <span class="cart-item-price">${window.moonState.formatPrice(item.priceLKR * item.quantity)}</span>
          </div>
        </div>
      </div>
    `).join("");

    // Bind item quantity & remove buttons
    listContainer.querySelectorAll("[data-qty-change]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.cartId;
        const delta = parseInt(btn.dataset.qtyChange, 10);
        const current = cart.find(i => i.id === id);
        if (current) {
          window.moonState.updateCartQuantity(id, current.quantity + delta);
        }
      });
    });

    listContainer.querySelectorAll("[data-remove-item]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.moonState.removeFromCart(btn.dataset.removeItem);
        window.moonUI.showToast("Item removed from Bag", "info");
      });
    });

    // Totals Breakdown
    const subtotalEl = document.getElementById("cartSubtotalVal");
    const discountEl = document.getElementById("cartDiscountVal");
    const discountRow = document.getElementById("cartDiscountRow");
    const shippingEl = document.getElementById("cartShippingVal");
    const grandTotalEl = document.getElementById("cartGrandTotalVal");
    const couponPillWrap = document.getElementById("cartActiveCouponWrap");

    if (subtotalEl) subtotalEl.textContent = window.moonState.formatPrice(subtotal);

    const discount = window.moonState.getCartDiscountLKR();
    if (discount > 0 && discountRow && discountEl) {
      discountRow.style.display = "flex";
      discountEl.textContent = `-${window.moonState.formatPrice(discount)}`;
    } else if (discountRow) {
      discountRow.style.display = "none";
    }

    const shipping = window.moonState.getCartShippingLKR();
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? "Complimentary" : window.moonState.formatPrice(shipping);
    }

    if (grandTotalEl) {
      grandTotalEl.textContent = window.moonState.formatPrice(window.moonState.getCartTotalLKR());
    }

    // Coupon pill
    if (couponPillWrap) {
      if (window.moonState.activeCoupon) {
        couponPillWrap.innerHTML = `
          <div class="applied-coupon-pill">
            <span>Privilege Applied: <strong>${window.moonState.activeCoupon.code}</strong> (${window.moonState.activeCoupon.label})</span>
            <button class="btn-text" style="font-size:0.65rem;" onclick="window.moonState.removeCoupon()">Remove</button>
          </div>
        `;
      } else {
        couponPillWrap.innerHTML = "";
      }
    }
  }

  // --- Render Wishlist Drawer ---
  renderWishlistDrawer() {
    const container = document.getElementById("wishlistItemsList");
    const emptyState = document.getElementById("wishlistEmptyState");
    const countBadge = document.getElementById("wishlistHeaderCount");
    if (!container) return;

    const items = window.moonState.getWishlistProducts();
    if (countBadge) countBadge.textContent = `${items.length} piece${items.length === 1 ? "" : "s"}`;

    if (items.length === 0) {
      container.innerHTML = "";
      container.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
      return;
    }

    container.style.display = "flex";
    if (emptyState) emptyState.style.display = "none";

    container.innerHTML = items.map(product => `
      <div class="cart-item" data-wishlist-item-id="${product.id}">
        <div class="cart-item-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-header">
            <div>
              <h4 class="cart-item-title">${product.name}</h4>
              <p class="cart-item-meta">${product.category} · ${product.material}</p>
            </div>
            <button class="cart-item-delete" data-remove-wishlist="${product.id}" title="Remove">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${window.moonState.formatPrice(product.priceLKR)}</span>
            <button class="btn btn-sm btn-dark" data-move-to-bag="${product.id}">Move to Bag</button>
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll("[data-remove-wishlist]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.moonState.toggleWishlist(btn.dataset.removeWishlist);
      });
    });

    container.querySelectorAll("[data-move-to-bag]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.moveToBag;
        window.moonState.addToCart(id);
        window.moonState.toggleWishlist(id);
        window.moonUI.showToast("Piece moved to your Bag", "success");
        window.moonUI.openDrawer("cartDrawer");
      });
    });
  }

  updateHeaderCounters() {
    const cartCount = window.moonState.getCartCount();
    const wishCount = window.moonState.getWishlistCount();

    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? "flex" : "none";
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = wishCount;
      el.style.display = wishCount > 0 ? "flex" : "none";
    });
  }

  updateWishlistIcons() {
    document.querySelectorAll(".product-card-wishlist").forEach(btn => {
      const id = btn.dataset.wishlistId;
      const isFav = window.moonState.isInWishlist(id);
      btn.classList.toggle("active", isFav);
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", isFav ? "currentColor" : "none");
    });
  }
}

window.moonShop = new MoonLKShop();
