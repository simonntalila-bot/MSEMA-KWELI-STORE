document.addEventListener('DOMContentLoaded', function () {

    // ══════════════════════════════════
    //  GUTA DATA — Tanzania
    // ══════════════════════════════════
    var gutaData = {
        diesel: {
            name: 'Guta la Diesel',
            color: '#1a1a2e',
            models: [
                { name: 'Massey Ferguson 275', engine: 'Perkins 3.9L Diesel', load: '2,500 kg', price: 18500000, img: 'img-guta.jpg' },
                { name: 'Massey Ferguson 385', engine: 'Perkins 4.2L Diesel', load: '3,000 kg', price: 22000000, img: 'img-guta.jpg' },
                { name: 'Massey Ferguson 135', engine: 'Perkins 2.5L Diesel', load: '1,500 kg', price: 8500000, img: 'img-guta.jpg' },
                { name: 'John Deere 5050D', engine: 'John Deere 3.0L Diesel', load: '2,000 kg', price: 16500000, img: 'img-guta.jpg' },
                { name: 'John Deere 5075E', engine: 'John Deere 3.0L Diesel', load: '2,500 kg', price: 19500000, img: 'img-guta.jpg' },
                { name: 'Ford New Holland 4630', engine: 'Ford 3.3L Diesel', load: '2,000 kg', price: 14000000, img: 'img-guta.jpg' },
                { name: 'Foton TD954', engine: 'Weichai 3.9L Diesel', load: '3,500 kg', price: 15500000, img: 'img-guta.jpg' },
                { name: 'Dongfeng 504', engine: 'Changchai 3.2L Diesel', load: '2,000 kg', price: 11500000, img: 'img-guta.jpg' },
                { name: 'Mahindra 575 DI', engine: 'Mahindra 2.5L Diesel', load: '1,800 kg', price: 12000000, img: 'img-guta.jpg' },
                { name: 'Sonalika 750 III', engine: 'Sonalika 3.5L Diesel', load: '2,200 kg', price: 13500000, img: 'img-guta.jpg' },
                { name: 'Kubota M7060', engine: 'Kubota 3.3L Diesel', load: '2,000 kg', price: 17000000, img: 'img-guta.jpg' },
                { name: 'TAFE 45 DI', engine: 'TAFE 2.2L Diesel', load: '1,200 kg', price: 7500000, img: 'img-guta.jpg' }
            ]
        },
        petrol: {
            name: 'Guta la Petrol',
            color: '#e67e22',
            models: [
                { name: 'Massey Ferguson 135 Petrol', engine: 'Petrol 2.2L', load: '1,200 kg', price: 6500000, img: 'img-guta.jpg' },
                { name: 'Ford 2000 Petrol', engine: 'Petrol 2.4L', load: '1,500 kg', price: 7000000, img: 'img-guta.jpg' },
                { name: 'Foton BF304', engine: 'Petrol 3.0L', load: '1,800 kg', price: 8500000, img: 'img-guta.jpg' },
                { name: 'Dongfeng 244 Petrol', engine: 'Petrol 2.4L', load: '1,500 kg', price: 7200000, img: 'img-guta.jpg' },
                { name: 'Mahindra 265 DI Petrol', engine: 'Petrol 2.0L', load: '1,000 kg', price: 5800000, img: 'img-guta.jpg' },
                { name: 'Kubota B1502', engine: 'Petrol 1.5L', load: '800 kg', price: 5500000, img: 'img-guta.jpg' }
            ]
        },
        'two-wheel': {
            name: 'Guta la 2-Wheel',
            color: '#2ecc71',
            models: [
                { name: 'Hand Tractor 2-Wheel 8HP', engine: '8HP Diesel', load: '500 kg', price: 1800000, img: 'img-guta.jpg' },
                { name: 'Hand Tractor 2-Wheel 10HP', engine: '10HP Diesel', load: '700 kg', price: 2200000, img: 'img-guta.jpg' },
                { name: 'Hand Tractor 2-Wheel 12HP', engine: '12HP Diesel', load: '800 kg', price: 2600000, img: 'img-guta.jpg' },
                { name: 'Hand Tractor 2-Wheel 15HP', engine: '15HP Diesel', load: '1,000 kg', price: 3200000, img: 'img-guta.jpg' },
                { name: 'Kubota Hand Tractor 2-Wheel', engine: 'Kubota 14HP', load: '900 kg', price: 3500000, img: 'img-guta.jpg' },
                { name: 'Yanmar Hand Tractor 2-Wheel', engine: 'Yanmar 12HP', load: '800 kg', price: 3800000, img: 'img-guta.jpg' }
            ]
        },
        'three-wheel': {
            name: 'Guta la 3-Wheel',
            color: '#3498db',
            models: [
                { name: 'TVS King Cargo 3-Wheel', engine: '200cc Petrol', load: '500 kg', price: 4500000, img: 'img-guta.jpg' },
                { name: 'Bajaj Maxima 3-Wheel Cargo', engine: '236cc Diesel', load: '600 kg', price: 5200000, img: 'img-guta.jpg' },
                { name: 'Piaggio Ape Cargo 3-Wheel', engine: '200cc Diesel', load: '500 kg', price: 4800000, img: 'img-guta.jpg' },
                { name: 'TukTuk Cargo 3-Wheel 250cc', engine: '250cc Petrol', load: '700 kg', price: 3800000, img: 'img-guta.jpg' },
                { name: 'China 3-Wheel Cargo 300cc', engine: '300cc Petrol', load: '800 kg', price: 3200000, img: 'img-guta.jpg' },
                { name: 'Joylong 3-Wheel Cargo', engine: '220cc Diesel', load: '600 kg', price: 4000000, img: 'img-guta.jpg' }
            ]
        },
        'four-wheel': {
            name: 'Guta la 4-Wheel',
            color: '#9b59b6',
            models: [
                { name: 'Foton Tunland 4x4', engine: '2.8L Diesel Turbo', load: '1,500 kg', price: 12500000, img: 'img-guta.jpg' },
                { name: 'JAC T6 4x4', engine: '2.0L Diesel Turbo', load: '1,200 kg', price: 11000000, img: 'img-guta.jpg' },
                { name: 'Great Wall Steed 4x4', engine: '2.0L Diesel Turbo', load: '1,000 kg', price: 10500000, img: 'img-guta.jpg' },
                { name: 'Isuzu D-Max 4x4', engine: '1.9L Diesel Turbo', load: '1,200 kg', price: 14500000, img: 'img-guta.jpg' },
                { name: 'Toyota Hilux 4x4', engine: '2.4L Diesel Turbo', load: '1,100 kg', price: 15500000, img: 'img-guta.jpg' },
                { name: 'Mitsubishi L200 4x4', engine: '2.4L Diesel Turbo', load: '1,000 kg', price: 14000000, img: 'img-guta.jpg' },
                { name: 'Nissan Navara 4x4', engine: '2.3L Diesel Turbo', load: '1,000 kg', price: 13500000, img: 'img-guta.jpg' },
                { name: 'Ford Ranger 4x4', engine: '2.2L Diesel Turbo', load: '1,100 kg', price: 14000000, img: 'img-guta.jpg' }
            ]
        }
    };

    // ══════════════════════════════════
    //  STATE
    // ══════════════════════════════════
    var validBrands = ['diesel', 'petrol', 'two-wheel', 'three-wheel', 'four-wheel'];
    var hashBrand = window.location.hash.replace('#', '').toLowerCase();
    var currentBrand = validBrands.indexOf(hashBrand) !== -1 ? hashBrand : 'diesel';
    var cart = JSON.parse(localStorage.getItem('gt_cart') || '[]');
    var container = document.getElementById('modelsContainer');

    // ══════════════════════════════════
    //  RENDER MODELS
    // ══════════════════════════════════
    function renderModels(brand) {
        var data = gutaData[brand];
        if (!data) return;
        var html = '<div class="brand-section">' +
            '<div class="brand-section-header">' +
                '<div class="brand-section-name"><span class="dot" style="background:' + data.color + '"></span> ' + data.name + '</div>' +
            '</div>' +
            '<div class="models-grid">';
        data.models.forEach(function (m) {
            html += '<div class="model-card">' +
                '<div class="model-img"><img src="' + m.img + '" alt="' + data.name + ' ' + m.name + '" loading="lazy"></div>' +
                '<div class="model-body">' +
                    '<span class="model-brand-tag">' + data.name + '</span>' +
                    '<h3 class="model-name">' + m.name + '</h3>' +
                    '<p class="model-specs"><i class="fas fa-cog"></i> ' + m.engine + '</p>' +
                    '<p class="model-specs"><i class="fas fa-weight-hanging"></i> ' + m.load + '</p>' +
                    '<p class="model-price">Tsh ' + m.price.toLocaleString('en-US') + '</p>' +
                    '<div class="model-actions">' +
                        '<button class="btn btn-sm btn-details btn-view-details" data-brand="' + data.name + '" data-name="' + m.name + '" data-price="' + m.price + '" data-img="' + m.img + '"><i class="fas fa-info-circle"></i> Maelezo</button>' +
                        '<button class="btn btn-sm btn-primary btn-pay" data-brand="' + data.name + '" data-name="' + m.name + '" data-price="' + m.price + '" data-img="' + m.img + '"><i class="fas fa-shopping-cart"></i> Sasa</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        html += '</div></div>';
        container.innerHTML = html;
        attachModelEvents();
    }

    // ══════════════════════════════════
    //  BRAND SELECTOR
    // ══════════════════════════════════
    function selectBrand(brand) {
        document.querySelectorAll('.brand-card').forEach(function (c) { c.classList.remove('active'); });
        var active = document.querySelector('.brand-card[data-brand="' + brand + '"]');
        if (active) active.classList.add('active');
        currentBrand = brand;
        window.location.hash = brand;
        renderModels(brand);
    }

    document.querySelectorAll('.brand-card').forEach(function (card) {
        card.addEventListener('click', function () {
            selectBrand(card.getAttribute('data-brand'));
        });
    });

    window.addEventListener('hashchange', function () {
        var h = window.location.hash.replace('#', '').toLowerCase();
        if (validBrands.indexOf(h) !== -1 && h !== currentBrand) {
            selectBrand(h);
        }
    });

    // ══════════════════════════════════
    //  CART
    // ══════════════════════════════════
    var cartDrawer = document.getElementById('cartDrawer');
    var cartOverlay = document.getElementById('cartOverlay');
    var cartItemsEl = document.getElementById('cartItems');
    var cartTotalEl = document.getElementById('cartTotal');

    function saveCart() { localStorage.setItem('gt_cart', JSON.stringify(cart)); }

    function formatPrice(n) { return 'Tsh ' + Number(n).toLocaleString('en-US'); }

    function addToCart(brand, name, price, img) {
        var key = brand + ' ' + name;
        var existing = cart.find(function (c) { return c.key === key; });
        if (existing) { existing.qty += 1; } else {
            cart.push({ key: key, brand: brand, name: name, price: price, img: img, qty: 1 });
        }
        saveCart(); updateCartUI();
        showToast(name + ' imeongezwa kwenye kikapu!');
    }

    function removeFromCart(key) {
        cart = cart.filter(function (c) { return c.key !== key; });
        saveCart(); updateCartUI();
    }

    function updateCartUI() {
        var total = cart.reduce(function (s, c) { return s + c.price * c.qty; }, 0);
        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p class="cart-empty">Kikapu chako ni tupu.</p>';
        } else {
            var html = '';
            cart.forEach(function (item) {
                html += '<div class="cart-item">' +
                    '<img src="' + item.img + '" class="cart-item-img" alt="">' +
                    '<div class="cart-item-info"><div class="cart-item-name">' + item.key + '</div>' +
                    '<div class="cart-item-price">' + formatPrice(item.price) + ' x' + item.qty + '</div></div>' +
                    '<button class="cart-item-remove" data-key="' + item.key + '"><i class="fas fa-trash"></i></button></div>';
            });
            cartItemsEl.innerHTML = html;
            cartItemsEl.querySelectorAll('.cart-item-remove').forEach(function (btn) {
                btn.addEventListener('click', function () { removeFromCart(btn.getAttribute('data-key')); });
            });
        }
        cartTotalEl.textContent = formatPrice(total);
    }

    function openCart() { cartDrawer.classList.add('active'); cartOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeCart() { cartDrawer.classList.remove('active'); cartOverlay.classList.remove('active'); document.body.style.overflow = ''; }

    cartOverlay.addEventListener('click', closeCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartItems').addEventListener('click', function () {
        if (cart.length > 0) openCart();
    });

    document.getElementById('checkoutBtn').addEventListener('click', function () {
        if (cart.length === 0) return;
        var total = cart.reduce(function (s, c) { return s + c.price * c.qty; }, 0);
        openPayModal(cart[0].brand, cart[0].name, total, cart[0].img);
        closeCart();
    });

    // ══════════════════════════════════
    //  PAY NOW
    // ══════════════════════════════════
    var payOverlay = document.getElementById('payOverlay');
    var payForm = document.getElementById('payForm');
    var paySuccess = document.getElementById('paySuccess');

    function openPayModal(brand, name, price, img) {
        document.getElementById('payImg').src = img;
        document.getElementById('payName').textContent = name;
        document.getElementById('payBrand').textContent = brand;
        document.getElementById('payPrice').textContent = 'Tsh ' + price.toLocaleString('en-US');
        document.getElementById('payTotal').textContent = 'Tsh ' + price.toLocaleString('en-US');
        payForm.style.display = '';
        paySuccess.classList.remove('active');
        payForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); });
        payOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        payOverlay.setAttribute('data-price', price);
        payOverlay.setAttribute('data-brand', brand);
        payOverlay.setAttribute('data-name', name);
    }

    function closePay() { payOverlay.classList.remove('active'); document.body.style.overflow = ''; }
    document.getElementById('payClose').addEventListener('click', closePay);
    payOverlay.addEventListener('click', function (e) { if (e.target === payOverlay) closePay(); });

    payForm.addEventListener('submit', function (e) {
        e.preventDefault();
        payForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); });
        var valid = true;
        ['payNameInput', 'payPhone', 'payLocation'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el.value.trim()) { el.closest('.form-group').classList.add('error'); valid = false; }
        });
        if (!valid) return;
        var payload = {
            name: document.getElementById('payNameInput').value.trim(),
            phone: document.getElementById('payPhone').value.trim(),
            product_name: payOverlay.getAttribute('data-brand') + ' ' + payOverlay.getAttribute('data-name'),
            quantity: 1,
            message: 'Eneo: ' + document.getElementById('payLocation').value.trim(),
            total_price: parseInt(payOverlay.getAttribute('data-price'), 10),
            date: new Date().toLocaleDateString('en-GB')
        };
        // save order to localStorage for admin dashboard
        var history = JSON.parse(localStorage.getItem('gt_cart_history') || '[]');
        history.push(payload);
        localStorage.setItem('gt_cart_history', JSON.stringify(history));
        // also save to main cart history
        var mainHistory = JSON.parse(localStorage.getItem('pk_cart_history') || '[]');
        mainHistory.push(payload);
        localStorage.setItem('pk_cart_history', JSON.stringify(mainHistory));
        payForm.style.display = 'none';
        paySuccess.classList.add('active');
        cart = []; saveCart(); updateCartUI();
    });

    // ══════════════════════════════════
    //  TOAST
    // ══════════════════════════════════
    var toastEl = document.getElementById('toast');
    var toastTimer;
    function showToast(msg) {
        toastEl.textContent = msg; toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
    }

    // ══════════════════════════════════
    //  MODEL CARD EVENTS
    // ══════════════════════════════════
    function attachModelEvents() {
        document.querySelectorAll('.btn-pay').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openPayModal(btn.getAttribute('data-brand'), btn.getAttribute('data-name'),
                    parseInt(btn.getAttribute('data-price'), 10), btn.getAttribute('data-img'));
            });
        });
        document.querySelectorAll('.btn-view-details').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var name = btn.getAttribute('data-name');
                var brand = btn.getAttribute('data-brand');
                var price = parseInt(btn.getAttribute('data-price'), 10);
                var img = btn.getAttribute('data-img');
                // Find full model data
                var modelData = null;
                Object.keys(gutaData).forEach(function (bk) {
                    gutaData[bk].models.forEach(function (m) {
                        if (m.name === name && m.price === price) modelData = m;
                    });
                });
                var specs = modelData ? '<p><strong><i class="fas fa-cog"></i> Engine:</strong> ' + modelData.engine + '</p><p><strong><i class="fas fa-weight-hanging"></i> Uwezo wa Kubeba:</strong> ' + modelData.load + '</p>' : '';
                alert(brand + ' — ' + name + '\n\n' + specs + '\nBei: Tsh ' + price.toLocaleString('en-US'));
            });
        });
    }

    // ══════════════════════════════════
    //  HAMBURGER
    // ══════════════════════════════════
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active'); navLinks.classList.toggle('active');
    });

    // ══════════════════════════════════
    //  INIT
    // ══════════════════════════════════
    selectBrand(currentBrand);
    updateCartUI();
});