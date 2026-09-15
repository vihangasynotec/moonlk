/**
 * MoonLK Clothing - Global Reactive State & Persistence
 * Manages Cart, Wishlist, Currency, Filters, and LocalStorage
 */

class MoonLKState {
  constructor() {
    this.CART_KEY = "moonlk_cart_v1";
    this.WISHLIST_KEY = "moonlk_wishlist_v1";
    this.CURRENCY_KEY = "moonlk_currency_v1";
    this.COUPON_KEY = "moonlk_coupon_v1";

    this.freeShippingThresholdLKR = 25000;
    this.validCoupons = {
      "MOONLK10": { type: "percent", value: 0.10, label: "10% Atelier Welcome Privilege" },
      "KURUNEGALA": { type: "percent", value: 0.15, label: "15% Flagship Special Privilege" },
      "FREESHIP": { type: "shipping", value: 1.0, label: "Complimentary Express Island-wide Shipping" }
    };

    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.currency = this.loadCurrency();
    this.activeCoupon = this.loadCoupon();

    this.subscribers = [];
  }

  // State subscription pattern
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(event, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(event, payload, this);
      } catch (err) {
        console.error("State listener error:", err);
      }
    });
  }

  // --- Currency Handling ---
  loadCurrency() {
    try {
      return localStorage.getItem(this.CURRENCY_KEY) || "LKR";
    } catch {
      return "LKR";
    }
  }

  setCurrency(curr) {
    if (curr !== "LKR" && curr !== "USD") return;
    this.currency = curr;
    try {
      localStorage.setItem(this.CURRENCY_KEY, curr);
    } catch (e) {
      console.warn("Storage warning:", e);
    }
    this.notify("currency_changed", { currency: curr });
  }

  formatPrice(priceLKR) {
    if (this.currency === "USD") {
      const usd = priceLKR * MOONLK_DATA.brand.currencyRateUSD;
      return `$${usd.toFixed(2)}`;
    }
    return `LKR ${priceLKR.toLocaleString("en-US")}`;
  }

  // --- Cart Handling ---
  loadCart() {
    try {
      const stored = localStorage.getItem(this.CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Cart storage error:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.warn("Cart save error:", e);
    }
  }

  addToCart(productId, size, color, quantity = 1) {
    const product = MOONLK_DATA.products.find(p => p.id === productId);
    if (!product) return { success: false, message: "Item not found" };

    const selectedSize = size || product.sizes[0];
    const selectedColor = color || (product.colorOptions[0] ? product.colorOptions[0].name : "Default");

    const existingIndex = this.cart.findIndex(item => 
      item.productId === productId && 
      item.size === selectedSize && 
      item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: `${productId}-${selectedSize}-${selectedColor}`.replace(/\s+/g, "_"),
        productId,
        name: product.name,
        category: product.category,
        priceLKR: product.priceLKR,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      });
    }

    this.saveCart();
    this.notify("cart_updated", { cart: this.cart, addedProduct: product });
    return { success: true, item: product };
  }

  updateCartQuantity(cartItemId, newQty) {
    const item = this.cart.find(i => i.id === cartItemId);
    if (!item) return;

    if (newQty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }

    item.quantity = newQty;
    this.saveCart();
    this.notify("cart_updated", { cart: this.cart });
  }

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter(i => i.id !== cartItemId);
    this.saveCart();
    this.notify("cart_updated", { cart: this.cart });
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.notify("cart_updated", { cart: this.cart });
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartSubtotalLKR() {
    return this.cart.reduce((sum, item) => sum + (item.priceLKR * item.quantity), 0);
  }

  getCartShippingLKR() {
    const subtotal = this.getCartSubtotalLKR();
    if (subtotal === 0) return 0;
    if (this.activeCoupon && this.activeCoupon.code === "FREESHIP") return 0;
    if (subtotal >= this.freeShippingThresholdLKR) return 0;
    return 1200; // Standard express Island-wide delivery in LKR
  }

  getCartDiscountLKR() {
    const subtotal = this.getCartSubtotalLKR();
    if (!this.activeCoupon || subtotal === 0) return 0;

    if (this.activeCoupon.type === "percent") {
      return Math.round(subtotal * this.activeCoupon.value);
    }
    return 0;
  }

  getCartTotalLKR() {
    const subtotal = this.getCartSubtotalLKR();
    if (subtotal === 0) return 0;
    const discount = this.getCartDiscountLKR();
    const shipping = this.getCartShippingLKR();
    return Math.max(0, subtotal - discount + shipping);
  }

  // --- Coupon Logic ---
  loadCoupon() {
    try {
      const code = localStorage.getItem(this.COUPON_KEY);
      if (code && this.validCoupons[code]) {
        return { code, ...this.validCoupons[code] };
      }
      return null;
    } catch {
      return null;
    }
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (this.validCoupons[cleanCode]) {
      this.activeCoupon = { code: cleanCode, ...this.validCoupons[cleanCode] };
      try {
        localStorage.setItem(this.COUPON_KEY, cleanCode);
      } catch (e) {
        console.warn(e);
      }
      this.notify("cart_updated", { cart: this.cart });
      return { success: true, message: `Applied: ${this.activeCoupon.label}` };
    }
    return { success: false, message: "Invalid privilege or coupon code" };
  }

  removeCoupon() {
    this.activeCoupon = null;
    try {
      localStorage.removeItem(this.COUPON_KEY);
    } catch (e) {
      console.warn(e);
    }
    this.notify("cart_updated", { cart: this.cart });
  }

  // --- Wishlist Handling ---
  loadWishlist() {
    try {
      const stored = localStorage.getItem(this.WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(this.wishlist));
    } catch (e) {
      console.warn(e);
    }
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    const exists = this.isInWishlist(productId);
    if (exists) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
    } else {
      this.wishlist.push(productId);
    }
    this.saveWishlist();
    this.notify("wishlist_updated", { 
      wishlist: this.wishlist, 
      productId, 
      added: !exists 
    });
    return !exists;
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  getWishlistProducts() {
    return this.wishlist
      .map(id => MOONLK_DATA.products.find(p => p.id === id))
      .filter(Boolean);
  }
}

// Global instance
window.moonState = new MoonLKState();
