document.addEventListener('DOMContentLoaded', () => {
    // Cart State
    let cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Open Cart
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    // Close Cart
    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close Cart on Outside Click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const imageSrc = card.querySelector('img').src;

            const product = { title, price, imageSrc };
            addToCart(product);

            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Añadido';
            button.style.backgroundColor = '#333';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);
        });
    });

    function addToCart(product) {
        cart.push(product);
        updateCartUI();
        cartModal.classList.add('active'); // Auto open cart
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    function updateCartUI() {
        // Update Count
        cartCountElement.textContent = cart.length;

        // Update Total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Render Items
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <button class="remove-btn" style="margin-left: auto; background: none; border: none; cursor: pointer; color: #888;">&times;</button>
                `;

                // Remove functionality
                cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                    removeFromCart(index);
                });

                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    // Warranty Modal Logic
    const warrantyModal = document.getElementById('warranty-modal');
    const warrantyLink = document.getElementById('warranty-link');
    const navWarrantyLink = document.getElementById('nav-warranty-link');
    const closeWarrantyBtn = warrantyModal.querySelector('.close-modal');

    function openWarranty(e) {
        e.preventDefault();
        warrantyModal.classList.add('active');
    }

    warrantyLink.addEventListener('click', openWarranty);
    navWarrantyLink.addEventListener('click', openWarranty);

    closeWarrantyBtn.addEventListener('click', () => {
        warrantyModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === warrantyModal) {
            warrantyModal.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
