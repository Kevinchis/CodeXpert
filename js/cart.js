// Cart Toggle
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.querySelector('.close-cart');

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Add to cart
function addToCart(plan) {
    // Plan details based on selection
    const plans = {
        basico: {
            name: 'Plan Básico',
            price: 299,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        profesional: {
            name: 'Plan Profesional',
            price: 599,
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
        },
        premium: {
            name: 'Plan Premium',
            price: 999,
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80'
        }
    };
    
    const selectedPlan = plans[plan];
    
    // Check if item already in cart
    const existingItemIndex = cart.findIndex(item => item.name === selectedPlan.name);
    
    if (existingItemIndex !== -1) {
        // Increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({
            ...selectedPlan,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    
    // Show cart sidebar
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    
    // Show success message
    alert(`${selectedPlan.name} ha sido añadido al carrito.`);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Añade algún plan antes de proceder al pago.');
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Por favor, inicia sesión o regístrate para completar tu compra.');
        loginModal.classList.add('active');
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        return;
    }
    
    // Here you would typically redirect to a checkout page or process payment
    // For this example, we'll just show a success message
    alert(`¡Gracias por tu compra, ${currentUser.name.split(' ')[0]}! Tu pedido ha sido procesado.`);
    
    // Clear cart
    cart = [];
    localStorage.removeItem('cart');
    
    // Update UI
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    
    // Close cart
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        addToCart(plan);
    });
});

// Initialize cart on page load
updateCartCount();
renderCartItems();
updateCartTotal();