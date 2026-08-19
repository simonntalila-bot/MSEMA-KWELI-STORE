document.addEventListener('DOMContentLoaded', function () {

    // ══════════════════════════════════
    //  MOTORCYCLE DATA
    // ══════════════════════════════════
    var motorcycles = {
        bajaj: {
            name: 'Bajaj',
            color: '#0066cc',
            models: [
                { name: 'Boxer 100', price: 1350000, img: 'img-pikipiki.jpg' },
                { name: 'Boxer 125', price: 1650000, img: 'img-pikipiki.jpg' },
                { name: 'Boxer 150', price: 1950000, img: 'img-pikipiki.jpg' },
                { name: 'Platina 100', price: 1400000, img: 'img-pikipiki.jpg' },
                { name: 'Platina 125', price: 1700000, img: 'img-pikipiki.jpg' },
                { name: 'Pulsar 125', price: 2100000, img: 'img-pikipiki.jpg' },
                { name: 'Pulsar 150', price: 2500000, img: 'img-pikipiki.jpg' },
                { name: 'Pulsar NS125', price: 2800000, img: 'img-pikipiki.jpg' },
                { name: 'Pulsar NS160', price: 3200000, img: 'img-pikipiki.jpg' },
                { name: 'Pulsar NS200', price: 3800000, img: 'img-pikipiki.jpg' },
                { name: 'CT 100', price: 1200000, img: 'img-pikipiki.jpg' },
                { name: 'Discover 125', price: 1800000, img: 'img-pikipiki.jpg' }
            ]
        },
        tvs: {
            name: 'TVS',
            color: '#e31837',
            models: [
                { name: 'HLX 125', price: 1600000, img: 'img-pikipiki.jpg' },
                { name: 'HLX 125 5G', price: 1750000, img: 'img-pikipiki.jpg' },
                { name: 'HLX Plus', price: 1900000, img: 'img-pikipiki.jpg' },
                { name: 'HLX 150', price: 2200000, img: 'img-pikipiki.jpg' },
                { name: 'Stryker 125', price: 1550000, img: 'img-pikipiki.jpg' },
                { name: 'Apache RTR 160', price: 2800000, img: 'img-pikipiki.jpg' },
                { name: 'Apache RTR 200', price: 3500000, img: 'img-pikipiki.jpg' },
                { name: 'Ntorq 125', price: 2100000, img: 'img-pikipiki.jpg' }
            ]
        },
        haojue: {
            name: 'Haojue',
            color: '#009944',
            models: [
                { name: 'HAOJUE 110', price: 1100000, img: 'img-pikipiki.jpg' },
                { name: 'HJ 125', price: 1450000, img: 'img-pikipiki.jpg' },
                { name: 'HJ 150', price: 1800000, img: 'img-pikipiki.jpg' },
                { name: 'SK Rider 150', price: 2200000, img: 'img-pikipiki.jpg' },
                { name: 'DR 160', price: 2500000, img: 'img-pikipiki.jpg' }
            ]
        },
        honda: {
            name: 'Honda',
            color: '#cc0000',
            models: [
                { name: 'CB 125', price: 1800000, img: 'img-pikipiki.jpg' },
                { name: 'CB 150', price: 2300000, img: 'img-pikipiki.jpg' },
                { name: 'CB Hornet 160', price: 2800000, img: 'img-pikipiki.jpg' },
                { name: 'CBR 150R', price: 3500000, img: 'img-pikipiki.jpg' },
                { name: 'CBR 250RR', price: 5500000, img: 'img-pikipiki.jpg' },
                { name: 'Dream 110', price: 1350000, img: 'img-pikipiki.jpg' },
                { name: 'Wave 110', price: 1250000, img: 'img-pikipiki.jpg' },
                { name: 'CRF 150L', price: 4200000, img: 'img-pikipiki.jpg' }
            ]
        },
        yamaha: {
            name: 'Yamaha',
            color: '#0033a0',
            models: [
                { name: 'MT-15', price: 3200000, img: 'img-pikipiki.jpg' },
                { name: 'R15 V4', price: 3800000, img: 'img-pikipiki.jpg' },
                { name: 'FZ-S 150', price: 2500000, img: 'img-pikipiki.jpg' },
                { name: 'FZ 25', price: 3500000, img: 'img-pikipiki.jpg' },
                { name: 'R25', price: 6500000, img: 'img-pikipiki.jpg' },
                { name: 'XSR 155', price: 3600000, img: 'img-pikipiki.jpg' },
                { name: 'NMAX 155', price: 4500000, img: 'img-pikipiki.jpg' },
                { name: 'Aerox 155', price: 4200000, img: 'img-pikipiki.jpg' }
            ]
        },
        shineray: {
            name: 'Shineray',
            color: '#ff6600',
            models: [
                { name: 'XY 200', price: 1800000, img: 'img-pikipiki.jpg' },
                { name: 'XY 250', price: 2200000, img: 'img-pikipiki.jpg' },
                { name: 'SS 250', price: 2500000, img: 'img-pikipiki.jpg' },
                { name: 'X5 200', price: 1900000, img: 'img-pikipiki.jpg' },
                { name: 'Jiajie 150', price: 1500000, img: 'img-pikipiki.jpg' },
                { name: 'Chopper 250', price: 3000000, img: 'img-pikipiki.jpg' }
            ]
        }
    };

    // ══════════════════════════════════
    //  STATE
    // ══════════════════════════════════
    var validBrands = ['bajaj', 'tvs', 'haojue', 'honda', 'yamaha', 'shineray'];
    var hashBrand = window.location.hash.replace('#', '').toLowerCase();
    var currentBrand = validBrands.indexOf(hashBrand) !== -1 ? hashBrand : 'bajaj';
    var cart = JSON.parse(localStorage.getItem('pk_cart') || '[]');
    var container = document.getElementById('modelsContainer');

    // ══════════════════════════════════
    //  RENDER MODELS
    // ══════════════════════════════════
    function renderModels(brand) {
        var data = motorcycles[brand];
        if (!data) return;
        var html = '<div class="brand-section">' +
            '<div class="brand-section-header">' +
                '<div class="brand-section-name"><span class="dot" style="background:' + data.color + '"></span> ' + data.name + '</div>' +
                '<span class="brand-section-link">Tazama zote →</span>' +
            '</div>' +
            '<div class="models-grid">';
        data.models.forEach(function (m) {
            html += '<div class="model-card">' +
                '<div class="model-img"><img src="' + m.img + '" alt="' + data.name + ' ' + m.name + '" loading="lazy"></div>' +
                '<div class="model-body">' +
                    '<span class="model-brand-tag">' + data.name + '</span>' +
                    '<h3 class="model-name">' + m.name + '</h3>' +
                    '<p class="model-price">Tsh ' + m.price.toLocaleString('en-US') + '</p>' +
                    '<div class="model-actions">' +
                        '<button class="btn btn-sm btn-details btn-view-details" data-brand="' + data.name + '" data-name="' + m.name + '" data-price="' + m.price + '" data-img="' + m.img + '">View Details</button>' +
                        '<button class="btn btn-sm btn-primary btn-pay" data-brand="' + data.name + '" data-name="' + m.name + '" data-price="' + m.price + '" data-img="' + m.img + '">Order Now</button>' +
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

    function saveCart() { localStorage.setItem('pk_cart', JSON.stringify(cart)); }

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
                    '<button class="cart-item-remove" data-key="' + item.key + '">✕</button></div>';
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
        // store current price for submit
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
        // send to backend
        var payload = {
            name: document.getElementById('payNameInput').value.trim(),
            phone: document.getElementById('payPhone').value.trim(),
            product_name: payOverlay.getAttribute('data-brand') + ' ' + payOverlay.getAttribute('data-name'),
            quantity: 1,
            message: 'Eneo: ' + document.getElementById('payLocation').value.trim(),
            total_price: parseInt(payOverlay.getAttribute('data-price'), 10),
            date: new Date().toLocaleDateString('en-GB')
        };
        payForm.style.display = 'none';
        paySuccess.classList.add('active');
        // save order to localStorage for admin dashboard
        var history = JSON.parse(localStorage.getItem('pk_cart_history') || '[]');
        history.push(payload);
        localStorage.setItem('pk_cart_history', JSON.stringify(history));
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
        document.querySelectorAll('.btn-view-details').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openPayModal(btn.getAttribute('data-brand'), btn.getAttribute('data-name'),
                    parseInt(btn.getAttribute('data-price'), 10), btn.getAttribute('data-img'));
            });
        });
        document.querySelectorAll('.btn-pay').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openPayModal(btn.getAttribute('data-brand'), btn.getAttribute('data-name'),
                    parseInt(btn.getAttribute('data-price'), 10), btn.getAttribute('data-img'));
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