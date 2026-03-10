/* ============================================================
   REALISATIONS.JS
============================================================ */

/* --- Données projets (source de vérité pour la modal) ------- */
var PROJETS = {
    '1': {
        cats: 'Installation · Domotique KNX',
        titre: 'Villa Les Parcs<br /><em>de Ramatuelle</em>',
        desc: 'Installation électrique complète d\'une villa neuve de 450 m² avec intégration domotique KNX full. Éclairage paysager, gestion des volets, alarme intrusion et contrôle d\'accès biométrique. Appareillage Legrand Céliane Gold.',
        meta: [
            { dt: 'Type', dd: 'Villa neuve 450 m²' },
            { dt: 'Prestations', dd: 'Installation complète, KNX, éclairage paysager' },
            { dt: 'Durée', dd: '6 semaines' },
            { dt: 'Lieu', dd: 'Ramatuelle, Var' },
        ],
        imgs: [
            'image/villa-ramatuelle.webp',
            'image/eclairage-villa-couloir.webp',
            'image/eclairage-villa-tableau.webp',
        ]
    },
    '2': {
        cats: 'Éclairage architectural',
        titre: 'Domaine de <em>Gassin</em>',
        desc: 'Conception et réalisation d\'un plan lumière complet pour un domaine viticole. Éclairage des façades, allées, vignes et bâtiments agricoles. 100% LED, pilotage horaire automatique.',
        meta: [
            { dt: 'Prestation', dd: 'Plan lumière complet' },
            { dt: 'Technologie', dd: 'LED basse conso, timer astronomique' },
            { dt: 'Lieu', dd: 'Gassin, Var' },
        ],
        imgs: [
            'image/electricite-gassin.webp',
            'image/electricite-domaine-viticole-gassin.webp',
        ]
    },
    '3': {
        cats: 'Borne IRVE',
        titre: 'Résidence <em>Sainte-Maxime</em>',
        desc: 'Installation de 4 bornes de recharge Wallbox Pulsar Plus 22 kW dans le parking d\'une résidence privée. Gestion de charge intelligente avec répartition dynamique de puissance. Éligible Advenir.',
        meta: [
            { dt: 'Bornes', dd: '4 × Wallbox Pulsar Plus 22 kW' },
            { dt: 'Gestion', dd: 'Charge dynamique partagée' },
            { dt: 'Lieu', dd: 'Sainte-Maxime, Var' },
        ],
        imgs: [
            'image/borne-recharge-electrique-villa.webp',
            'image/borne-recharge-villa-ramatuelle.webp',
        ]
    },
    '4': {
        cats: 'Domotique KNX',
        titre: 'Mas provençal <em>Grimaud</em>',
        desc: 'Rénovation domotique d\'un mas provençal classé. Protocole KNX intégré discrètement dans les murs d\'époque. Gestion éclairage (60 zones), volets, chauffage et arrosage depuis smartphone.',
        meta: [
            { dt: 'Protocole', dd: 'KNX + Somfy RTS' },
            { dt: 'Zones', dd: '60 zones d\'éclairage' },
            { dt: 'Interface', dd: 'App mobile + tablette murale' },
            { dt: 'Lieu', dd: 'Grimaud, Var' },
        ],
        imgs: [
            'image/mas-provençal-eclairage.webp',
            'image/volets-electriques.webp',
        ]
    },
    '5': {
        cats: 'Installation · Éclairage piscine',
        titre: 'Villa <em>Pampelonne</em>',
        desc: 'Rénovation électrique complète avec mise aux normes NF C 15-100. Éclairage paysager basse tension, 12 projecteurs de piscine LED RGB, éclairage terrasse sur variateur. Vue imprenable sur Pampelonne.',
        meta: [
            { dt: 'Surface', dd: '280 m²' },
            { dt: 'Prestations', dd: 'Rénovation complète + éclairage paysager' },
            { dt: 'Piscine', dd: '12 projecteurs LED RGB' },
            { dt: 'Lieu', dd: 'Ramatuelle, Var' },
        ],
        imgs: [
            'image/eclairage-piscine.webp',
            'image/eclairage-jardin.webp',
            'image/eclairage-ramatuelle-jardin.webp',
        ]
    },
    '6': {
        cats: 'Mise aux normes',
        titre: 'Villa <em>La Croix-Valmer</em>',
        desc: 'Mise aux normes NF C 15-100 complète d\'une villa années 80. Remplacement du tableau général, reprise de tous les circuits, installation de protections différentielles et mise à la terre.',
        meta: [
            { dt: 'Norme', dd: 'NF C 15-100 complète' },
            { dt: 'Tableau', dd: 'Hager rénové 3 rangées' },
            { dt: 'Durée', dd: '2 semaines' },
            { dt: 'Lieu', dd: 'La Croix-Valmer, Var' },
        ],
        imgs: [
            'image/eclairage-villa-ramatuelle.webp',
            'image/eclairage-villa-tableau.webp',
        ]
    }
};

/* --- Filtres ----------------------------------------------- */
(function () {
    var btns = document.querySelectorAll('.filtre-btn');
    var cartes = document.querySelectorAll('.projet-card');
    if (!btns.length) return;

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = btn.getAttribute('data-filter');

            // Actif
            btns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            // Affiche / masque
            cartes.forEach(function (card) {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    return;
                }
                var cats = card.getAttribute('data-cat') || '';
                if (cats.indexOf(filter) !== -1) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

/* --- Modal -------------------------------------------------- */
(function () {
    var modal = document.getElementById('modal');
    var backdrop = modal ? modal.querySelector('.modal-backdrop') : null;
    var closeBtn = modal ? modal.querySelector('.modal-close') : null;
    var opens = document.querySelectorAll('.projet-open');
    if (!modal) return;

    function openModal(id) {
        var data = PROJETS[id];
        if (!data) return;

        // Remplir le contenu
        modal.querySelector('.modal-cats').textContent = data.cats;
        modal.querySelector('.modal-titre').innerHTML = data.titre;
        modal.querySelector('.modal-desc').textContent = data.desc;

        // Meta
        var metaEl = modal.querySelector('.modal-meta');
        metaEl.innerHTML = data.meta.map(function (m) {
            return '<div><dt>' + m.dt + '</dt><dd>' + m.dd + '</dd></div>';
        }).join('');

        // Photos
        var mainImg = modal.querySelector('.modal-img-main');
        var thumbsEl = modal.querySelector('.modal-thumbs');

        mainImg.src = data.imgs[0];
        mainImg.alt = data.cats;

        thumbsEl.innerHTML = data.imgs.map(function (src, i) {
            return '<img src="' + src + '" alt="" class="modal-thumb' + (i === 0 ? ' active' : '') + '" data-src="' + src + '" />';
        }).join('');

        // Changement de photo au clic sur miniature
        thumbsEl.querySelectorAll('.modal-thumb').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                mainImg.style.opacity = '0';
                setTimeout(function () {
                    mainImg.src = thumb.getAttribute('data-src');
                    mainImg.style.opacity = '1';
                }, 200);
                thumbsEl.querySelectorAll('.modal-thumb').forEach(function (t) {
                    t.classList.remove('active');
                });
                thumb.classList.add('active');
            });
        });

        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    opens.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(btn.getAttribute('data-id'));
        });
    });

    // Ouvrir aussi en cliquant sur la carte entière
    document.querySelectorAll('.projet-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var btn = card.querySelector('.projet-open');
            if (btn) openModal(btn.getAttribute('data-id'));
        });
    });

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Fermer avec Echap
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
})();