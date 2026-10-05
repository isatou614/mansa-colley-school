/* ============================================================
   SITE.JS — Mobile menu, scroll-reveal, active nav, forms
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initActiveNav();
  initYear();
  initForms();
});

/* ---- Mobile menu ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const close = () => menu.classList.remove('open');
  const toggle = () => menu.classList.toggle('open');

  hamburger.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* ---- Scroll reveal ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

/* ---- Active nav highlighting ---- */
function initActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(`.nav-link[data-page="${page}"], .mobile-link[data-page="${page}"]`)
    .forEach(link => link.classList.add('active'));
}

/* ---- Footer copyright year ---- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---- Formspree AJAX submit ---- */
function initForms() {
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          showFormMessage(form, 'success', '✅ Thanks — we\'ll be in touch soon.');
          form.reset();
        } else {
          showFormMessage(form, 'error', '❌ Something went wrong. Please try again or contact us directly.');
        }
      } catch (err) {
        showFormMessage(form, 'error', '❌ Something went wrong. Please check your connection and try again.');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      }
    });
  });
}

function showFormMessage(form, type, text) {
  let msg = form.querySelector('.form-msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'form-msg';
    form.appendChild(msg);
  }
  msg.textContent = text;
  msg.style.cssText = `margin-top:12px;padding:10px 14px;border-radius:8px;font-size:13.5px;font-weight:600;${
    type === 'success'
      ? 'background:var(--g0);color:var(--g7);border:1px solid var(--g1);'
      : 'background:#fef2f2;color:#991b1b;border:1px solid #fecaca;'
  }`;
}
