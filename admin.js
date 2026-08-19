document.addEventListener('DOMContentLoaded', function () {

    // ══════════════════════════════════
    //  AUTH CHECK
    // ══════════════════════════════════
    var isLoggedIn = localStorage.getItem('msemakwel_admin') === 'true';
    if (!isLoggedIn) {
        document.body.innerHTML = '<div class="not-logged" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;text-align:center"><h2>⛔ Huna ufikiaji</h3><p>Ingia kama admin kwanza.</p><a href="login.html" style="background:#047857;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:700">Ingia Sasa</a></div>';
        return;
    }

    // ══════════════════════════════════
    //  SIDEBAR NAV
    // ══════════════════════════════════
    var sbLinks = document.querySelectorAll('.sb-link[data-page]');
    var pages = document.querySelectorAll('.page');
    var sidebar = document.getElementById('sidebar');

    sbLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var pg = link.getAttribute('data-page');
            sbLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
            pages.forEach(function (p) { p.classList.remove('active'); });
            var target = document.getElementById('page-' + pg);
            if (target) target.classList.add('active');
            sidebar.classList.remove('open');
        });
    });

    // ══════════════════════════════════
    //  MOBILE TOGGLE
    // ══════════════════════════════════
    document.getElementById('sidebarToggle').addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    // ══════════════════════════════════
    //  LOGOUT
    // ══════════════════════════════════
    function doLogout() {
        localStorage.removeItem('msemakwel_admin');
        window.location.href = 'login.html';
    }
    document.getElementById('logoutBtn').addEventListener('click', doLogout);
    document.getElementById('logoutBtnMobile').addEventListener('click', doLogout);

    // ══════════════════════════════════
    //  LOAD DATA
    // ══════════════════════════════════
    var orders = JSON.parse(localStorage.getItem('pk_cart_history') || '[]');
    var gutaOrders = JSON.parse(localStorage.getItem('gt_cart_history') || '[]');
    orders = orders.concat(gutaOrders);
    var messages = JSON.parse(localStorage.getItem('msemakwel_messages') || '[]');
    var settings = JSON.parse(localStorage.getItem('msemakwel_settings') || '{}');

    // unique customers
    var customerMap = {};
    orders.forEach(function (o) {
        var key = o.phone || o.name;
        if (!customerMap[key]) customerMap[key] = { name: o.name, phone: o.phone, product: o.product_name, date: o.date };
    });
    var customers = Object.values(customerMap);

    // ══════════════════════════════════
    //  STATS
    // ══════════════════════════════════
    document.getElementById('statOrders').textContent = orders.length;
    var totalRev = orders.reduce(function (s, o) { return s + (parseInt(o.total_price) || 0); }, 0);
    document.getElementById('statRevenue').textContent = 'Tsh ' + totalRev.toLocaleString('en-US');
    document.getElementById('statMessages').textContent = messages.length;
    document.getElementById('statCustomers').textContent = customers.length;

    // ══════════════════════════════════
    //  RECENT ORDERS
    // ══════════════════════════════════
    var recentOrdersEl = document.getElementById('recentOrders');
    if (orders.length === 0) {
        recentOrdersEl.innerHTML = '<p class="dash-empty">Hakuna maagizo bado.</p>';
    } else {
        var html = '';
        orders.slice(-5).reverse().forEach(function (o) {
            html += '<div class="dash-item"><div class="dash-item-left"><span class="dash-item-name">' + o.product_name + '</span><span class="dash-item-sub">' + o.name + '</span></div><div class="dash-item-right"><span class="dash-item-price">Tsh ' + (parseInt(o.total_price) || 0).toLocaleString('en-US') + '</span><div class="dash-item-date">' + (o.date || '') + '</div></div></div>';
        });
        recentOrdersEl.innerHTML = html;
    }

    // ══════════════════════════════════
    //  RECENT MESSAGES
    // ══════════════════════════════════
    var recentMsgEl = document.getElementById('recentMessages');
    if (messages.length === 0) {
        recentMsgEl.innerHTML = '<p class="dash-empty">Hakuna ujumbe bado.</p>';
    } else {
        var html2 = '';
        messages.slice(-5).reverse().forEach(function (m) {
            html2 += '<div class="dash-item"><div class="dash-item-left"><span class="dash-item-name">' + m.name + '</span><span class="dash-item-sub">' + m.product + ' — ' + m.message.substring(0, 40) + '…</span></div><div class="dash-item-right"><div class="dash-item-date">' + (m.date || '') + '</div></div></div>';
        });
        recentMsgEl.innerHTML = html2;
    }

    // ══════════════════════════════════
    //  ORDERS TABLE
    // ══════════════════════════════════
    var ordersBody = document.getElementById('ordersBody');
    var ordersEmpty = document.getElementById('ordersEmpty');
    if (orders.length === 0) {
        ordersEmpty.classList.remove('hidden');
    } else {
        ordersEmpty.classList.add('hidden');
        var oHtml = '';
        orders.forEach(function (o, i) {
            oHtml += '<tr><td>' + (i + 1) + '</td><td>' + o.name + '</td><td>' + o.phone + '</td><td>' + o.product_name + '</td><td>' + (o.message || '').replace('Eneo: ', '') + '</td><td>Tsh ' + (parseInt(o.total_price) || 0).toLocaleString('en-US') + '</td><td>' + (o.date || '') + '</td><td><span class="badge badge-pending">Inashughulikiwa</span></td></tr>';
        });
        ordersBody.innerHTML = oHtml;
    }

    // ══════════════════════════════════
    //  PRODUCTS TABLE
    // ══════════════════════════════════
    var motorcycles = {
        bajaj: { name: 'Bajaj', models: ['Boxer 100','Boxer 125','Boxer 150','Platina 100','Platina 125','Pulsar 125','Pulsar 150','Pulsar NS125','Pulsar NS160','Pulsar NS200','CT 100','Discover 125'] },
        tvs: { name: 'TVS', models: ['HLX 125','HLX 125 5G','HLX Plus','HLX 150','Stryker 125','Apache RTR 160','Apache RTR 200','Ntorq 125'] },
        haojue: { name: 'Haojue', models: ['HAOJUE 110','HJ 125','HJ 150','SK Rider 150','DR 160'] },
        honda: { name: 'Honda', models: ['CB 125','CB 150','CB Hornet 160','CBR 150R','CBR 250RR','Dream 110','Wave 110','CRF 150L'] },
        yamaha: { name: 'Yamaha', models: ['MT-15','R15 V4','FZ-S 150','FZ 25','R25','XSR 155','NMAX 155','Aerox 155'] },
        shineray: { name: 'Shineray', models: ['XY 200','XY 250','SS 250','X5 200','Jiajie 150','Chopper 250'] }
    };
    var gutaProducts = {
        diesel: { name: 'Guta Diesel', models: ['Massey Ferguson 275','Massey Ferguson 385','Massey Ferguson 135','John Deere 5050D','John Deere 5075E','Ford New Holland 4630','Foton TD954','Dongfeng 504','Mahindra 575 DI','Sonalika 750 III','Kubota M7060','TAFE 45 DI'] },
        petrol: { name: 'Guta Petrol', models: ['Massey Ferguson 135 Petrol','Ford 2000 Petrol','Foton BF304','Dongfeng 244 Petrol','Mahindra 265 DI Petrol','Kubota B1502'] },
        two: { name: 'Guta 2-Wheel', models: ['Hand Tractor 8HP','Hand Tractor 10HP','Hand Tractor 12HP','Hand Tractor 15HP','Kubota Hand Tractor','Yanmar Hand Tractor'] },
        three: { name: 'Guta 3-Wheel', models: ['TVS King Cargo','Bajaj Maxima Cargo','Piaggio Ape Cargo','TukTuk Cargo 250cc','China Cargo 300cc','Joylong Cargo'] },
        four: { name: 'Guta 4-Wheel', models: ['Foton Tunland 4x4','JAC T6 4x4','Great Wall Steed 4x4','Isuzu D-Max 4x4','Toyota Hilux 4x4','Mitsubishi L200 4x4','Nissan Navara 4x4','Ford Ranger 4x4'] }
    };
    var pHtml = '';
    var pIdx = 1;
    Object.keys(motorcycles).forEach(function (bk) {
        var b = motorcycles[bk];
        b.models.forEach(function (m) {
            pHtml += '<tr><td>' + pIdx + '</td><td>' + b.name + '</td><td>' + m + '</td><td>—</td></tr>';
            pIdx++;
        });
    });
    Object.keys(gutaProducts).forEach(function (gk) {
        var g = gutaProducts[gk];
        g.models.forEach(function (m) {
            pHtml += '<tr><td>' + pIdx + '</td><td>' + g.name + '</td><td>' + m + '</td><td>—</td></tr>';
            pIdx++;
        });
    });
    document.getElementById('productsBody').innerHTML = pHtml;

    // ══════════════════════════════════
    //  MESSAGES TABLE
    // ══════════════════════════════════
    var messagesBody = document.getElementById('messagesBody');
    var messagesEmpty = document.getElementById('messagesEmpty');
    if (messages.length === 0) {
        messagesEmpty.classList.remove('hidden');
    } else {
        messagesEmpty.classList.add('hidden');
        var mHtml = '';
        messages.forEach(function (m, i) {
            mHtml += '<tr><td>' + (i + 1) + '</td><td>' + m.name + '</td><td>' + m.phone + '</td><td>' + m.product + '</td><td>' + m.message + '</td><td>' + (m.date || '') + '</td></tr>';
        });
        messagesBody.innerHTML = mHtml;
    }

    // ══════════════════════════════════
    //  CUSTOMERS TABLE
    // ══════════════════════════════════
    var customersBody = document.getElementById('customersBody');
    var customersEmpty = document.getElementById('customersEmpty');
    if (customers.length === 0) {
        customersEmpty.classList.remove('hidden');
    } else {
        customersEmpty.classList.add('hidden');
        var cHtml = '';
        customers.forEach(function (c, i) {
            cHtml += '<tr><td>' + (i + 1) + '</td><td>' + c.name + '</td><td>' + c.phone + '</td><td>' + c.product + '</td><td>' + (c.date || '') + '</td></tr>';
        });
        customersBody.innerHTML = cHtml;
    }

    // ══════════════════════════════════
    //  SETTINGS
    // ══════════════════════════════════
    if (settings.storeName) document.getElementById('setStoreName').value = settings.storeName;
    if (settings.phone) document.getElementById('setPhone').value = settings.phone;
    if (settings.whatsapp) document.getElementById('setWhatsApp').value = settings.whatsapp;
    if (settings.location) document.getElementById('setLocation').value = settings.location;

    document.getElementById('settingsForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var data = {
            storeName: document.getElementById('setStoreName').value.trim(),
            phone: document.getElementById('setPhone').value.trim(),
            whatsapp: document.getElementById('setWhatsApp').value.trim(),
            location: document.getElementById('setLocation').value.trim()
        };
        localStorage.setItem('msemakwel_settings', JSON.stringify(data));
        alert('Mipangilio imehifadhiwa!');
    });
});
