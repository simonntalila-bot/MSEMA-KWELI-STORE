document.addEventListener('DOMContentLoaded', function () {

    // ══════════════════════════════════
    //  LANGUAGE SYSTEM
    // ══════════════════════════════════
    var translations = {
        sw: {
            tagline: 'QUALITY \u2022 TRUST \u2022 SERVICE',
            nav_home: 'Home',
            nav_about: 'Kuhusu Sisi',
            nav_contact: 'Wasiliana Nasi',
            hero_title: 'WELCOME TO MSEMA KWEL STORE',
            hero_subtitle: 'Bidhaa bora kwa mahitaji yako ya usafiri, biashara na ujenzi.',
            cta_contact: 'Wasiliana Nasi',
            why_title: 'Kwa Nini MSEMA KWEL STORE?',
            why_trust_title: 'Kuaminika',
            why_trust_desc: 'Huduma yenye uwazi na mawasiliano rahisi.',
            why_fast_title: 'Haraka',
            why_fast_desc: 'Pata bidhaa unayotafuta bila kupitia hatua nyingi.',
            why_service_title: 'Huduma Bora',
            why_service_desc: 'Tupo tayari kukusaidia kupata bidhaa inayokufaa.',
            about_title: 'Kuhusu MSEMA KWEL STORE',
            about_desc: 'MSEMA KWEL STORE ni duka linalouza Pikipiki, Bajaji, Guta, Magodolo na Mabati. Tunazingatia urahisi wa mteja kupata taarifa za bidhaa na kuwasiliana nasi kwa haraka.',
            cta_contact2: 'Wasiliana Nasi',
            contact_title: 'Wasiliana na MSEMA KWEL STORE',
            contact_subtitle: 'Una swali kuhusu bidhaa? Tuma maombi yako na tutawasiliana nawe.',
            contact_phone: 'Simu',
            contact_phone_val: 'Weka namba ya duka hapa',
            contact_whatsapp: 'Weka WhatsApp number hapa',
            contact_location: 'Location',
            contact_location_val: 'Weka eneo la duka hapa',
            form_name: 'Jina lako',
            form_phone: 'Namba ya simu',
            form_product: 'Bidhaa',
            form_message: 'Ujumbe',
            form_select: 'Chagua bidhaa...',
            err_name: 'Tafadhali weka jina lako.',
            err_phone: 'Tafadhali weka namba yako ya simu.',
            err_product: 'Tafadhali chagua bidhaa.',
            err_message: 'Tafadhali andika ujumbe wako.',
            btn_submit: 'Tuma Maombi',
            success_title: 'Maombi yako yametumwa!',
            success_desc: 'Asante kwa kuwasiliana na MSEMA KWEL STORE. Tutawasiliana nawe hivi karibuni.',
            footer_tagline: 'Bidhaa bora. Huduma yenye kuaminika.',
            footer_menu: 'Menu'
        },
        en: {
            tagline: 'QUALITY \u2022 TRUST \u2022 SERVICE',
            nav_home: 'Home',
            nav_about: 'About Us',
            nav_contact: 'Contact Us',
            hero_title: 'WELCOME TO MSEMA KWEL STORE',
            hero_subtitle: 'Quality products for your transport, business and construction needs.',
            cta_contact: 'Contact Us',
            why_title: 'Why MSEMA KWEL STORE?',
            why_trust_title: 'Trusted',
            why_trust_desc: 'Transparent service with easy communication.',
            why_fast_title: 'Fast',
            why_fast_desc: 'Get the product you are looking for without many steps.',
            why_service_title: 'Great Service',
            why_service_desc: 'We are ready to help you find the right product.',
            about_title: 'About MSEMA KWEL STORE',
            about_desc: 'MSEMA KWEL STORE is a shop selling Motorcycles, TukTuks, Trailers, Wood and Iron Sheets. We focus on making it easy for customers to get product information and contact us quickly.',
            cta_contact2: 'Contact Us',
            contact_title: 'Contact MSEMA KWEL STORE',
            contact_subtitle: 'Have a question about our products? Send your inquiry and we will get back to you.',
            contact_phone: 'Phone',
            contact_phone_val: 'Enter store phone number here',
            contact_whatsapp: 'Enter WhatsApp number here',
            contact_location: 'Location',
            contact_location_val: 'Enter store location here',
            form_name: 'Your Name',
            form_phone: 'Phone Number',
            form_product: 'Product',
            form_message: 'Message',
            form_select: 'Select a product...',
            err_name: 'Please enter your name.',
            err_phone: 'Please enter your phone number.',
            err_product: 'Please select a product.',
            err_message: 'Please enter your message.',
            btn_submit: 'Submit Inquiry',
            success_title: 'Your inquiry has been sent!',
            success_desc: 'Thank you for contacting MSEMA KWEL STORE. We will get back to you soon.',
            footer_tagline: 'Quality products. Reliable service.',
            footer_menu: 'Menu'
        }
    };

    var currentLang = 'sw';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'sw' ? 'sw' : 'en');
        var t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });
        var langFlag = document.getElementById('langFlag');
        var langLabel = document.getElementById('langLabel');
        if (langFlag) langFlag.textContent = lang === 'sw' ? '\uD83C\uDDFF\uD83C\uDDFA' : '\uD83C\uDDEC\uD83C\uDDE7';
        if (langLabel) langLabel.textContent = lang === 'sw' ? 'SW' : 'EN';
        localStorage.setItem('msemakwel_lang', lang);
    }

    var savedLang = localStorage.getItem('msemakwel_lang');
    if (savedLang) setLanguage(savedLang);

    var langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', function () {
            setLanguage(currentLang === 'sw' ? 'en' : 'sw');
        });
    }

    // ══════════════════════════════════
    //  NAVBAR
    // ══════════════════════════════════
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('.nav-link').forEach(function (l) {
        l.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ══════════════════════════════════
    //  CONTACT FORM
    // ══════════════════════════════════
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        contactForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); });
        var valid = true;
        ['cName', 'cPhone', 'cMessage'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el.value.trim()) {
                el.closest('.form-group').classList.add('error');
                valid = false;
            }
        });
        if (!valid) return;
        alert(currentLang === 'sw' ? 'Maombi yako yametumwa! Tutawasiliana nawe hivi karibuni.' : 'Your inquiry has been sent! We will contact you soon.');
        contactForm.reset();
    });
});
