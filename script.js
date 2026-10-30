(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');

  // Header shadow on scroll
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('open');
    })
  );

  // Program filters
  const filters = document.querySelectorAll('.filter');
  const programs = document.querySelectorAll('.program');
  filters.forEach((btn) =>
    btn.addEventListener('click', () => {
      filters.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      const cat = btn.dataset.filter;
      programs.forEach((p) => p.classList.toggle('hidden', cat !== 'all' && p.dataset.cat !== cat));
    })
  );

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  const revealTargets = document.querySelectorAll('.section-head, .card, .feature, .person, .steps li, .faq details, .enquiry');
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));

  } else {
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

  // Enquiry form (client-side validation; wire to a backend or form service to receive submissions)
  const form = document.getElementById('enquiry-form');
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((input) => {
      const ok = input.checkValidity();
      input.closest('.field').classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.className = 'form-status err';
      status.textContent = 'Please fill in the student name, a valid phone number and class.';
      return;
    }
    status.className = 'form-status ok';
    status.textContent = 'Thank you! We will get back to you soon.';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
