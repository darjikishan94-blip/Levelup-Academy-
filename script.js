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

  // Animated counters
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

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

    const countIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countIo.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach((el) => countIo.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('visible'));
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  // Testimonial slider
  const quotes = document.querySelectorAll('.quote');
  const dotsWrap = document.querySelector('.slider-dots');
  let current = 0;
  let timer;
  const show = (i) => {
    current = (i + quotes.length) % quotes.length;
    quotes.forEach((q, idx) => q.classList.toggle('active', idx === current));
    dotsWrap.querySelectorAll('button').forEach((d, idx) => d.setAttribute('aria-selected', String(idx === current)));
  };
  quotes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const restart = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show(current + 1), 6000);
  };
  show(0);
  restart();

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
      status.textContent = 'Please fill in the student name, a valid phone number and grade.';
      return;
    }
    status.className = 'form-status ok';
    status.textContent = 'Thank you! We will call you within one working day.';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
