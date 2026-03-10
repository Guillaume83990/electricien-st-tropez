/* ============================================================
   INDEX.JS — Comportements spécifiques à la page Accueil
============================================================ */

/* --- Parallaxe léger sur l'image hero ----------------------- */
(function () {
    const heroImg = document.getElementById('hero-img');
    if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onScroll() {
        const scrollY = window.scrollY;
        const maxShift = 80; // px
        const shift = Math.min(scrollY * 0.25, maxShift);
        heroImg.style.transform = 'scale(1) translateY(' + shift + 'px)';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();