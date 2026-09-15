/**
 * MoonLK Clothing - Multi-Step Luxury Checkout Controller
 * Kurunegala, Sri Lanka
 */

class MoonLKCheckout {
  constructor() {
    this.currentStep = 1;
    this.orderData = {
      customer: {},
      shippingMethod: "islandwide",
      paymentMethod: "cod",
      items: [],
      totals: {}
    };

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Checkout trigger from cart drawer
    const proceedBtn = document.getElementById("cartCheckoutBtn");
    proceedBtn?.addEventListener("click", () => {
      window.moonUI.closeAllDrawers();
      this.openCheckout();
    });

    // Form submission / step navigation
    const checkoutForm = document.getElementById("checkoutForm");
    checkoutForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNextStep();
    });

    // Delivery option change updates totals
    document.querySelectorAll("input[name='checkoutDelivery']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.orderData.shippingMethod = e.target.value;
        this.updateCheckoutSummary();
      });
    });

    // Payment option selection
    document.querySelectorAll("input[name='checkoutPayment']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.orderData.paymentMethod = e.target.value;
        // Toggle credit card fields if card is selected
        const cardFields = document.getElementById("creditCardFields");
        if (cardFields) {
          cardFields.style.display = e.target.value === "card" ? "grid" : "none";
        }
      });
    });
  }

  openCheckout() {
    if (window.moonState.cart.length === 0) {
      window.moonUI.showToast("Your Bag is currently empty.", "error");
      return;
    }

    this.currentStep = 1;
    this.goToStep(1);
    this.updateCheckoutSummary();
    window.moonUI.openModal("checkoutModal");
  }

  goToStep(stepNum) {
    this.currentStep = stepNum;

    // Update Step Indicators
    document.querySelectorAll(".checkout-step-indicator").forEach(ind => {
      const step = parseInt(ind.dataset.step, 10);
      ind.classList.toggle("active", step === stepNum);
      ind.classList.toggle("completed", step < stepNum);
    });

    // Update Step Panels
    document.querySelectorAll(".checkout-step-panel").forEach(panel => {
      const step = parseInt(panel.dataset.step, 10);
      panel.style.display = step === stepNum ? "block" : "none";
    });

    // Modal Title update
    const modalTitle = document.getElementById("checkoutModalTitle");
    if (modalTitle) {
      if (stepNum === 1) modalTitle.textContent = "1. Customer & Delivery Address";
      else if (stepNum === 2) modalTitle.textContent = "2. Delivery Method";
      else if (stepNum === 3) modalTitle.textContent = "3. Payment Selection";
      else if (stepNum === 4) modalTitle.textContent = "Order Confirmed & Atelier Receipt";
    }
  }

  handleNextStep() {
    if (this.currentStep === 1) {
      // Validate customer fields
      const firstName = document.getElementById("checkoutFirstName")?.value.trim();
      const lastName = document.getElementById("checkoutLastName")?.value.trim();
      const email = document.getElementById("checkoutEmail")?.value.trim();
      const phone = document.getElementById("checkoutPhone")?.value.trim();
      const address = document.getElementById("checkoutAddress")?.value.trim();
      const city = document.getElementById("checkoutCity")?.value.trim();
      const district = document.getElementById("checkoutDistrict")?.value;

      if (!firstName || !lastName || !email || !phone || !address || !city) {
        window.moonUI.showToast("Please fill in all required shipping fields.", "error");
        return;
      }

      this.orderData.customer = { firstName, lastName, email, phone, address, city, district };
      this.goToStep(2);
    } else if (this.currentStep === 2) {
      this.goToStep(3);
    } else if (this.currentStep === 3) {
      // Place Order
      this.completeOrder();
    }
  }

  updateCheckoutSummary() {
    const listEl = document.getElementById("checkoutItemsSummary");
    const subtotalEl = document.getElementById("checkoutSubtotalVal");
    const shippingEl = document.getElementById("checkoutShippingVal");
    const discountEl = document.getElementById("checkoutDiscountVal");
    const discountRow = document.getElementById("checkoutDiscountRow");
    const totalEl = document.getElementById("checkoutGrandTotalVal");

    const cart = window.moonState.cart;
    if (listEl) {
      listEl.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; margin-bottom: 0.6rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${item.image}" style="width:36px; height:48px; object-fit:cover; border-radius:2px;" alt="${item.name}">
            <div>
              <div style="font-weight:600; color:var(--color-charcoal-900);">${item.name}</div>
              <div style="font-size:0.7rem; color:var(--color-charcoal-600);">${item.size} · ${item.color} · Qty: ${item.quantity}</div>
            </div>
          </div>
          <span style="font-weight:600;">${window.moonState.formatPrice(item.priceLKR * item.quantity)}</span>
        </div>
      `).join("");
    }

    const subtotal = window.moonState.getCartSubtotalLKR();
    let shipping = window.moonState.getCartShippingLKR();

    if (this.orderData.shippingMethod === "pickup") {
      shipping = 0; // Free pickup at Kurunegala store
    } else if (this.orderData.shippingMethod === "international") {
      shipping = 8500; // DHL International Express
    }

    const discount = window.moonState.getCartDiscountLKR();
    const grandTotal = Math.max(0, subtotal - discount + shipping);

    if (subtotalEl) subtotalEl.textContent = window.moonState.formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "Complimentary" : window.moonState.formatPrice(shipping);
    
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `-${window.moonState.formatPrice(discount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = window.moonState.formatPrice(grandTotal);

    this.orderData.totals = { subtotal, shipping, discount, grandTotal };
  }

  completeOrder() {
    const orderNumber = `MLK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    
    this.orderData.orderNumber = orderNumber;
    this.orderData.orderDate = orderDate;
    this.orderData.items = [...window.moonState.cart];

    // Populate confirmation step
    const orderNumEl = document.getElementById("confirmOrderNumber");
    const orderNameEl = document.getElementById("confirmCustomerName");
    const orderEmailEl = document.getElementById("confirmCustomerEmail");
    const orderDestEl = document.getElementById("confirmDeliveryDestination");
    const orderPaymentMethodEl = document.getElementById("confirmPaymentMethod");
    const orderTotalEl = document.getElementById("confirmOrderTotal");

    if (orderNumEl) orderNumEl.textContent = orderNumber;
    if (orderNameEl) orderNameEl.textContent = `${this.orderData.customer.firstName} ${this.orderData.customer.lastName}`;
    if (orderEmailEl) orderEmailEl.textContent = this.orderData.customer.email;
    if (orderDestEl) {
      if (this.orderData.shippingMethod === "pickup") {
        orderDestEl.textContent = "Self-Pickup at MoonLK Flagship Atelier, 48 Colombo Road, Kurunegala";
      } else {
        orderDestEl.textContent = `${this.orderData.customer.address}, ${this.orderData.customer.city} (${this.orderData.customer.district || "Sri Lanka"})`;
      }
    }

    if (orderPaymentMethodEl) {
      const labels = {
        "cod": "Cash on Delivery / Bank Transfer upon delivery",
        "card": "Credit / Debit Card (Processed Securely)",
        "koko": "Koko / Mintpay 3-Month Interest-Free Installments",
        "bank": "Direct Atelier Bank Transfer"
      };
      orderPaymentMethodEl.textContent = labels[this.orderData.paymentMethod] || "Standard Payment";
    }

    if (orderTotalEl) {
      orderTotalEl.textContent = window.moonState.formatPrice(this.orderData.totals.grandTotal);
    }

    // Go to step 4
    this.goToStep(4);

    // Clear cart in state
    window.moonState.clearCart();
    window.moonUI.showToast(`Order ${orderNumber} placed successfully!`, "success");
  }

  printReceipt() {
    window.print();
  }
}

window.moonCheckout = new MoonLKCheckout();
