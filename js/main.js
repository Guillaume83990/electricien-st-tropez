/* ============================================================
   MAIN.JS — Comportements globaux Voltaire Électricité
============================================================ */

/* --- Header scroll ------------------------------------------ */
(function () {
    const header = document.getElementById('header');
    if (!header) return;

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // état initial
})();

/* --- Burger menu (mobile) ------------------------------------ */
(function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-main');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
        const open = nav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';

        // Animation burger → croix
        const spans = burger.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Fermer le menu si on clique sur un lien
    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
            burger.setAttribute('aria-expanded', false);
            burger.querySelectorAll('span').forEach(function (s) {
                s.style.transform = '';
                s.style.opacity = '';
            });
        });
    });
})();

/* --- Intersection Observer (animations data-anim) ----------- */
(function () {
    const els = document.querySelectorAll('[data-anim]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(function (el) { observer.observe(el); });
})();

/* --- Compteur slot machine (data-count) --------------------- */
/*
   Chaque chiffre est un "rouleau" vertical :
   les digits 0-9 sont empilés, on translate Y pour afficher le bon.
   Chaque colonne démarre avec un délai décalé → effet mécanique premium.
*/
(function () {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function buildSlot(el) {
        const target = String(el.getAttribute('data-count'));
        el.textContent = ''; // vide le texte brut
        el.style.display = 'inline-flex';
        el.style.alignItems = 'flex-end';
        el.style.overflow = 'hidden';
        el.style.verticalAlign = 'baseline';

        // Crée un rouleau par chiffre
        return target.split('').map(function (digit, colIndex) {
            const d = parseInt(digit, 10);

            // Wrapper clip
            const clip = document.createElement('span');
            clip.style.cssText = [
                'display:inline-block',
                'overflow:hidden',
                'height:1em',
                'line-height:1',
                'vertical-align:bottom',
            ].join(';');

            // Bande verticale contenant 0→9→digit (ou juste 0→digit)
            const band = document.createElement('span');
            band.style.cssText = [
                'display:flex',
                'flex-direction:column',
                'transform:translateY(0)',  // sera animé
                'will-change:transform',
            ].join(';');

            // On empile les chiffres de 0 jusqu'à la cible
            for (let i = 0; i <= d; i++) {
                const span = document.createElement('span');
                span.textContent = i;
                span.style.cssText = 'display:block;line-height:1;height:1em;';
                band.appendChild(span);
            }

            clip.appendChild(band);
            el.appendChild(clip);

            return { band, d, colIndex };
        });
    }

    function animateSlot(reels, totalCols) {
        reels.forEach(function (reel) {
            const { band, d, colIndex } = reel;
            const delay = colIndex * 80; // décalage entre chaque digit

            // Position finale : translateY de -(d * 1em) pour afficher le bon digit
            // On utilise une transition CSS injectée inline
            setTimeout(function () {
                band.style.transition = 'transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)';
                band.style.transform = 'translateY(-' + (d * 1) + 'em)';
            }, delay);
        });
    }

    const obs = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const reels = buildSlot(entry.target);
                    // Léger délai pour laisser le DOM se peindre
                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                            animateSlot(reels, reels.length);
                        });
                    });
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(function (el) { obs.observe(el); });
})();