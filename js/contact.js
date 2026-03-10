/* ============================================================
   CONTACT.JS — Validation et soumission du formulaire
============================================================ */

(function () {
    var form = document.getElementById('contact-form');
    var successBox = document.getElementById('form-success');
    var submitBtn = form ? form.querySelector('.form-submit') : null;
    if (!form) return;

    /* --- Helpers -------------------------------------------- */
    function showError(input, msg) {
        input.classList.add('error');
        var err = input.closest('.form-group').querySelector('.form-error');
        if (err) err.textContent = msg;
    }

    function clearError(input) {
        input.classList.remove('error');
        var err = input.closest('.form-group').querySelector('.form-error');
        if (err) err.textContent = '';
    }

    function isEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    /* --- Validation en temps réel (blur) -------------------- */
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
        el.addEventListener('blur', function () { validateField(el); });
        el.addEventListener('input', function () {
            if (el.classList.contains('error')) validateField(el);
        });
    });

    function validateField(el) {
        var val = el.value.trim();

        if (el.hasAttribute('required') && !val) {
            showError(el, 'Ce champ est requis.');
            return false;
        }

        if (el.type === 'email' && val && !isEmail(val)) {
            showError(el, 'Adresse email invalide.');
            return false;
        }

        if (el.id === 'rgpd' && !el.checked) {
            showError(el, 'Veuillez accepter la politique de confidentialité.');
            return false;
        }

        clearError(el);
        return true;
    }

    /* --- Validation complète du formulaire ------------------ */
    function validateForm() {
        var valid = true;
        var fields = form.querySelectorAll('input[required], textarea[required], select[required]');

        fields.forEach(function (el) {
            if (!validateField(el)) valid = false;
        });

        // Checkbox RGPD
        var rgpd = form.querySelector('#rgpd');
        if (rgpd && !rgpd.checked) {
            showError(rgpd, 'Veuillez accepter la politique de confidentialité.');
            valid = false;
        }

        return valid;
    }

    /* --- Soumission ----------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            // Focus sur le premier champ en erreur
            var firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        // État chargement
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        /*
          ICI : remplace le setTimeout par ton vrai appel fetch/AJAX
          vers ton backend (PHP, Formspree, EmailJS, Netlify Forms…)
    
          Exemple Formspree :
          fetch('https://formspree.io/f/TON_ID', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          }).then(function(r) {
            if (r.ok) showSuccess();
            else showFormError();
          });
        */

        // Simulation (3s) — à remplacer par le vrai envoi
        setTimeout(function () {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            showSuccess();
        }, 1800);
    });

    function showSuccess() {
        form.style.display = 'none';
        successBox.removeAttribute('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

})();