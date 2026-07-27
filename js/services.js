/* ============================================================
   SERVICES.JS — Scroll-spy pour la nav d'ancres sticky
============================================================ */

(function () {
    var sections = document.querySelectorAll('.service-section[id]');
    var navInner = document.querySelector('.services-nav-inner');
    var links = document.querySelectorAll('.snav-link');
    if (!sections.length || !links.length) return;

    var linkById = {};
    links.forEach(function (link) {
        var id = link.getAttribute('href').replace('#', '');
        linkById[id] = link;
    });

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.remove('active');
        });
        var activeLink = linkById[id];
        if (!activeLink) return;

        activeLink.classList.add('active');

        // Recentre le lien actif dans la barre horizontale scrollable
        if (navInner) {
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        {
            // Ne considère une section "active" que lorsqu'elle occupe
            // une bande centrale de l'écran, sous le header + la nav sticky
            rootMargin: '-140px 0px -60% 0px',
            threshold: 0
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
})();