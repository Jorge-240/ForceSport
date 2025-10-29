// Productos de la tienda
const products = [
    {
        id: 1,
        name: "FortaRun",
        brand: "adidas",
        type: "running",
        price: 199900,
        image: "adidas.jpg",
        description: "Zapatillas deportivas Adidas en blanco y negro, con un diseño moderno y minimalista. Destacan las tres franjas icónicas en blanco sobre el fondo negro del upper, y una suela texturizada y cómoda, ideales para entrenamiento o uso casual."
    },
    {
        id: 2,
        name: "Air Force One",
        brand: "nike",
        type: "running",
        price: 239900,
        image: "nike-air-force-one.jpg",
        description: "Zapatillas Nike con tecnología de amortiguación avanzada. Diseño aerodinámico y materiales transpirables para máximo rendimiento en carrera."
    },
    {
        id: 3,
        name: "Jordan 5",
        brand: "nike",
        type: "futbol",
        price: 89900,
        image: "Air-Jordan-5.jpeg",
        description: "Botines Nike para basketball con tecnología de tracción superior. Diseño clásico con materiales resistentes para el campo de juego."
    },
    {
        id: 4,
        name: "VS Pace Mens Trainers",
        brand: "adidas",
        type: "casual",
        price: 120000,
        image: "s-l400.jpg",
        description: "Zapatillas Adidas casuales con diseño clásico. Perfectas para uso diario con comodidad y estilo."
    },
    {
        id: 5,
        name: "Infernus V3",
        brand: "nike",
        type: "gym",
        price: 70000,
        image: "CK0898_TMA_D2.webp",
        description: "Zapatillas Nike para gimnasio con soporte lateral mejorado. Ideales para levantamiento de pesas y entrenamiento funcional."
    },
    {
        id: 6,
        name: "Court Vision",
        brand: "nike",
        type: "casual",
        price: 120000,
        image: "zapatilla-nike-court-vision-low-negro-1.webp",
        description: "Zapatillas Nike Court Vision con estilo retro. Diseño clásico de baloncesto adaptado para uso casual."
    },
    {
        id: 7,
        name: "Classic AeroFit Z",
        brand: "adidas",
        type: "casual",
        price: 30000,
        image: "Ultrarun_5_W.avif",
        description: "Zapatillas Adidas clásicas con diseño minimalista. Perfectas para el día a día con estilo atemporal."
    },
    {
        id: 8,
        name: "Classic Core 99",
        brand: "reebok",
        type: "casual",
        price: 55000,
        image: "s-l1200.jpg",
        description: "Zapatillas Reebok clásicas con colores vibrantes. Diseño retro con comodidad moderna."
    },
    {
        id: 9,
        name: "Air Max 270",
        brand: "nike",
        type: "running",
        price: 120000,
        image: "image.avif",
        description: "Zapatillas Nike con tecnología Air Max. Amortiguación superior y diseño futurista para corredores."
    }
];

// Estado de la aplicación
let cart = [];
let currentSlide = 0;
let heroSlides = [];

// Funciones de utilidad
function getImagePath(imageName) {
    // Detectar si estamos en la carpeta pages/ o en la raíz
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return `../assets/images/${imageName}`;
    } else {
        return `assets/images/${imageName}`;
    }
}

function getCartFromStorage() {
    const savedCart = localStorage.getItem('forceSportCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCartToStorage() {
    localStorage.setItem('forceSportCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

// Funciones de productos
function loadHomeProducts() {
    const homeProducts = document.getElementById('homeProducts');
    if (!homeProducts) return;
    
    const popularProducts = products.slice(0, 3); // Primeros 3 productos como populares
    
    homeProducts.innerHTML = popularProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${getImagePath(product.image)}" alt="${product.name}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${formatPrice(product.price)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
    `).join('');
}

// Funciones del Hero Slider
function initHeroSlider() {
    // Definir imágenes del slider y a qué producto deben dirigir
    heroSlides = [
        { image: 'classics.webp', productId: 7 },            // Classic AeroFit Z (adidas)
        { image: 'reebok-basketball.webp', productId: 8 },   // Classic Core 99 (reebok)
        { image: 'campus.jpeg', productId: 4 }   // VS Pace Mens Trainers (adidas)
    ];
    
    const sliderTrack = document.getElementById('sliderTrack');
    const heroDots = document.getElementById('heroDots');
    
    if (!sliderTrack || !heroDots) return;
    
    // Crear slides
    sliderTrack.innerHTML = heroSlides.map(slide => `
        <div class="slider-slide">
            <img src="${getImagePath(slide.image)}" alt="slide">
        </div>
    `).join('');
    
    // Crear puntos de navegación
    heroDots.innerHTML = heroSlides.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
    `).join('');
    
    // Iniciar auto-slide
    startAutoSlide();
}

function goToSlide(slideIndex) {
    const sliderTrack = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.hero-dots .dot');
    
    if (!sliderTrack || !dots) return;
    
    currentSlide = slideIndex;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar puntos activos
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    goToSlide(currentSlide);
}

function startAutoSlide() {
    setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
}

function loadCatalogProducts() {
    const catalogProducts = document.getElementById('catalogProducts');
    if (!catalogProducts) return;
    
    catalogProducts.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${getImagePath(product.image)}" alt="${product.name}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-brand">${product.brand.toUpperCase()}</div>
            <div class="product-price">$${formatPrice(product.price)}</div>
            <div class="product-actions">
                <button class="details-btn" onclick="showProductDetail(${product.id}, 'catalog')">Detalles</button>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        </div>
    `).join('');
}

function showProductDetail(productId, source = 'home') {
    // Guardar el ID del producto en localStorage para la página de detalles
    localStorage.setItem('selectedProductId', productId);

    // Construir la URL correctamente dependiendo de si ya estamos en /pages/
    const currentPath = window.location.pathname;
    let targetUrl;
    if (currentPath.includes('/pages/')) {
        // Ya estamos dentro de pages/ (ej: /ForceSport/pages/catalog.html)
        targetUrl = `detail.html?id=${productId}&src=${source}`;
    } else {
        // Desde la raíz (ej: /ForceSport/index.html)
        targetUrl = `pages/detail.html?id=${productId}&src=${source}`;
    }

    // Redirigir a la página de detalles
    window.location.href = targetUrl;
}

function loadProductDetailFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        // Si no hay ID en la URL, intentar obtenerlo del localStorage
        const savedId = localStorage.getItem('selectedProductId');
        if (savedId) {
            productId = parseInt(savedId);
        } else {
            // Redirigir al catálogo si no hay producto seleccionado
            const currentPath = window.location.pathname;
            const catalogUrl = currentPath.includes('/pages/') ? 'catalog.html' : 'pages/catalog.html';
            window.location.href = catalogUrl;
            return;
        }
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        const currentPath = window.location.pathname;
        const catalogUrl = currentPath.includes('/pages/') ? 'catalog.html' : 'pages/catalog.html';
        window.location.href = catalogUrl;
        return;
    }
    
    // Cargar detalles del producto
    document.getElementById('detailImage').src = getImagePath(product.image);
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${formatPrice(product.price)}`;
    
    // Actualizar botón de agregar al carrito
    const addToCartBtn = document.getElementById('addToCartDetail');
    addToCartBtn.onclick = () => addToCart(product.id);
}

function filterProducts() {
    const brandFilter = document.getElementById('brandFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (!brandFilter || !typeFilter || !searchFilter) return;
    
    const brand = brandFilter.value.toLowerCase();
    const type = typeFilter.value.toLowerCase();
    const search = searchFilter.value.toLowerCase();
    
    // Actualizar estado visual de los botones de marca
    document.querySelectorAll('.brand-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.brand === brand) {
            btn.classList.add('active');
        }
    });
    
    const filteredProducts = products.filter(product => {
        const matchesBrand = !brand || product.brand === brand;
        const matchesType = !type || product.type === type;
        const matchesSearch = !search || 
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search);
        
        return matchesBrand && matchesType && matchesSearch;
    });
    
    const catalogProducts = document.getElementById('catalogProducts');
    if (!catalogProducts) return;
    
    catalogProducts.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${getImagePath(product.image)}" alt="${product.name}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-brand">${product.brand.toUpperCase()}</div>
            <div class="product-price">$${formatPrice(product.price)}</div>
            <div class="product-actions">
                <button class="details-btn" onclick="showProductDetail(${product.id}, 'catalog')">Detalles</button>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        </div>
    `).join('');
}

function setupCatalogFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (brandFilter) brandFilter.addEventListener('change', filterProducts);
    if (typeFilter) typeFilter.addEventListener('change', filterProducts);
    if (searchFilter) searchFilter.addEventListener('input', filterProducts);
    
    // Marcar botón de marca como activo si viene de URL
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    if (brand) {
        // Remover clase active de todos los botones de marca
        document.querySelectorAll('.brand-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase active al botón correspondiente
        const activeBtn = document.querySelector(`[data-brand="${brand}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

function openCart() {
    updateCartDisplay();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'block';
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 2rem;">Tu carrito está vacío</p>';
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${getImagePath(item.image)}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * 0.10; // 10% de descuento
    const subtotalAfterDiscount = subtotal - discount;
    const tax = subtotalAfterDiscount * 0.19; // 19% de IVA
    const total = subtotalAfterDiscount + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${formatPrice(subtotal)}`;
    if (discountEl) discountEl.textContent = `$${formatPrice(discount)}`;
    if (taxEl) taxEl.textContent = `$${formatPrice(tax)}`;
    if (totalEl) totalEl.textContent = `$${formatPrice(total)}`;
}

function checkout() {
    console.log('Checkout function called');
    console.log('Cart length:', cart.length);
    
    if (cart.length === 0) {
        console.log('Cart is empty, showing warning');
        // Cerrar el modal del carrito primero
        closeCartModal();
        
        // Mostrar alerta después de un pequeño delay para que se cierre el modal
        setTimeout(() => {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'Tu carrito está vacío. Agrega algunos productos antes de realizar el pago.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#0066cc',
                background: '#1a1a1a',
                color: '#ffffff',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title-dark',
                    content: 'swal-content-dark'
                },
                zIndex: 20000
            });
        }, 100);
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = total * 0.10;
    const subtotalAfterDiscount = total - discount;
    const tax = subtotalAfterDiscount * 0.19;
    const finalTotal = subtotalAfterDiscount + tax;
    
    console.log('Final total:', finalTotal);
    
    // Cerrar el modal del carrito primero
    closeCartModal();
    
    // Mostrar alerta de pago exitoso con SweetAlert2 después de un pequeño delay
    setTimeout(() => {
        Swal.fire({
        icon: 'success',
        title: '¡PAGO EXITOSO!',
        html: `
            <div style="text-align: center;">
                <p style="color: #cccccc; margin-bottom: 1rem;">Tu compra ha sido procesada correctamente</p>
                <div style="background: rgba(0, 102, 204, 0.1); border: 1px solid #0066cc; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Total pagado:</span>
                        <span style="color: #00aaff; font-weight: bold; font-size: 1.2rem;">$${formatPrice(finalTotal)}</span>
                    </div>
                    <div style="font-size: 0.9rem; color: #888;">
                        ${cart.length} producto${cart.length > 1 ? 's' : ''} comprado${cart.length > 1 ? 's' : ''}
                    </div>
                </div>
                <p style="color: #00aaff; font-weight: bold;">¡Gracias por elegir ForceSport!</p>
            </div>
        `,
        confirmButtonText: '¡Excelente!',
        confirmButtonColor: '#0066cc',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
            popup: 'swal-dark',
            title: 'swal-title-dark',
            content: 'swal-content-dark'
        },
        showConfirmButton: true,
        timer: 0,
        allowOutsideClick: false,
        zIndex: 20000
        }).then(() => {
            // Limpiar carrito después de la compra
            cart = [];
            saveCartToStorage();
            updateCartCount();
        });
    }, 100);
}

function showCheckoutSuccess(finalTotal, cartItems) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        border: 2px solid #0066cc;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        color: white;
        box-shadow: 0 20px 40px rgba(0, 102, 204, 0.3);
        animation: slideIn 0.4s ease;
        position: relative;
        overflow: hidden;
    `;
    
    // Agregar efecto de brillo
    modal.innerHTML = `
        <div style="
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(0, 102, 204, 0.1), transparent);
            animation: shine 2s infinite;
            pointer-events: none;
        "></div>
        <div style="position: relative; z-index: 2;">
            <div style="
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #0066cc, #00aaff);
                border-radius: 50%;
                margin: 0 auto 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                animation: bounce 0.6s ease;
            ">✓</div>
            
            <h2 style="
                color: #00aaff;
                font-size: 2rem;
                margin-bottom: 1rem;
                font-weight: 900;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            ">¡PAGO EXITOSO!</h2>
            
            <p style="
                color: #cccccc;
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                line-height: 1.5;
            ">Tu compra ha sido procesada correctamente</p>
            
            <div style="
                background: rgba(0, 102, 204, 0.1);
                border: 1px solid #0066cc;
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            ">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Total pagado:</span>
                    <span style="color: #00aaff; font-weight: bold; font-size: 1.2rem;">$${formatPrice(finalTotal)}</span>
                </div>
                <div style="font-size: 0.9rem; color: #888;">
                    ${cartItems.length} producto${cartItems.length > 1 ? 's' : ''} comprado${cartItems.length > 1 ? 's' : ''}
                </div>
            </div>
            
            <div style="
                background: linear-gradient(135deg, #0066cc, #00aaff);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            " onclick="closeCheckoutModal()">
                ¡Gracias por elegir ForceSport!
            </div>
        </div>
    `;
    
    // Agregar estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
    `;
    document.head.appendChild(style);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Cerrar al hacer clic fuera del modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeCheckoutModal();
        }
    });
}

function closeCheckoutModal() {
    const overlay = document.querySelector('[style*="z-index: 10000"]');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

function showCustomAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? '#ff6b6b' : '#0066cc'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

function showCartNotification() {
    // Usar SweetAlert2 para notificación del carrito
    Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: 'Producto agregado al carrito',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
            popup: 'swal-dark',
            title: 'swal-title-dark'
        },
        zIndex: 20000
    });
}

function toggleFavorite(productId) {
    // Funcionalidad de favoritos (puede expandirse)
    console.log('Toggle favorite:', productId);
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    cart = getCartFromStorage();
    updateCartCount();
    
    // Inicializar slider del hero si estamos en la página home
    if (document.getElementById('sliderTrack')) {
        initHeroSlider();
    }
    
    // Cargar productos populares si estamos en la página home
    if (document.getElementById('homeProducts')) {
        loadHomeProducts();
    }
    
    // Configurar event listeners del carrito
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const continueShopping = document.getElementById('continueShopping');
    const checkout = document.getElementById('checkout');
    
    console.log('Checkout button found:', checkout);
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartModal);
    if (continueShopping) continueShopping.addEventListener('click', closeCartModal);
    if (checkout) {
        console.log('Adding event listener to checkout button');
        checkout.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Checkout button clicked!');
            checkout();
        });
    } else {
        console.log('Checkout button not found!');
    }
    
    // Cerrar modal al hacer clic fuera
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
});

// Funciones globales para uso en HTML
window.showProductDetail = showProductDetail;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleFavorite = toggleFavorite;
window.openCart = openCart;
window.closeCartModal = closeCartModal;
window.goToSlide = goToSlide;
window.closeCheckoutModal = closeCheckoutModal;
window.checkout = checkout;