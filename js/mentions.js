/* ============================================================
   MENTIONS.JS — Highlight de la nav latérale au scroll
============================================================ */
(function () {
    var links = document.querySelectorAll('.mnav-link');
    var sections = document.querySelectorAll('.mention-section[id]');
    if (!links.length || !sections.length) return;

    function getOffset() {
        var header = document.getElementById('header');
        return (header ? header.offsetHeight : 70) + 40;
    }

    function updateActive() {
        var scrollY = window.scrollY;
        var offset = getOffset();
        var current = null;

        sections.forEach(function (s) {
            if (scrollY + offset >= s.offsetTop) current = s.id;
        });

        links.forEach(function (link) {
            var href = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active', href === current);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    /* Scroll fluide avec offset */
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = link.getAttribute('href').replace('#', '');
            var target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.scrollY - getOffset();
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
})();