(() => {
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const themeKey = body.classList.contains('creative-page') ? 'vinayak-creative-theme' : 'vinayak-professional-theme';
  const config = window.PORTFOLIO_CONFIG || {
    email: 'vinayaksabu8@gmail.com',
    instagram: 'https://www.instagram.com/el.vinu',
    instagramReels: 'https://www.instagram.com/el.vinu/reels/'
  };

  const email = (config && config.email) || 'vinayaksabuofficial@gmail.com';
  const isCreative = body.classList.contains('creative-page');
  const proInstagram = (config && config.instagramPro) || 'https://www.instagram.com/vinayak._.sabu';
  const creatorInstagram = (config && config.instagramCreator) || (config && config.instagram) || 'https://www.instagram.com/el.vinu';
  const pageInstagram = isCreative ? creatorInstagram : proInstagram;

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-instagram-link]').forEach((link) => { link.href = pageInstagram; });
  document.querySelectorAll('[data-instagram-reels]').forEach((link) => { link.href = (config && config.instagramReels) || 'https://www.instagram.com/el.vinu/reels/'; });
  document.querySelectorAll('[data-resume-link]').forEach((link) => { if (config && config.resume) link.href = config.resume; });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = link.href.replace('vinayaksabu8@gmail.com', email);
  });

  const readPreference = () => {
    try { return localStorage.getItem(themeKey); } catch (_) { return null; }
  };
  const savePreference = (value) => {
    try { localStorage.setItem(themeKey, value); } catch (_) { /* Storage may be unavailable. */ }
  };
  const setTheme = (night, persist = true) => {
    body.classList.toggle('is-night', night);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(night));
      const label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = body.classList.contains('creative-page') ? (night ? 'Dark' : 'Light') : (night ? 'Day' : 'Night');
    });
    if (persist) savePreference(night ? 'night' : 'day');
  };
  setTheme(readPreference() === 'night', false);
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => setTheme(!body.classList.contains('is-night')));
  });

  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach((element, index) => element.style.setProperty('--reveal-order', String(index % 5)));
  const sections = [...document.querySelectorAll('main > section')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
    sections.forEach((section) => section.classList.add('motion-active'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -35px' });
    reveals.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-active');
        sectionObserver.unobserve(entry.target);
      });
    }, { threshold: .18, rootMargin: '0px 0px -10%' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Service selection stays usable without a payment-provider setup and builds a clear, pre-filled enquiry.
  const serviceCards = [...document.querySelectorAll('[data-service]')];
  const serviceLabel = document.querySelector('[data-service-label]');
  const bookingLink = document.querySelector('[data-book-link]');
  const selectService = (card) => {
    const service = card.dataset.service;
    serviceCards.forEach((item) => {
      const selected = item === card;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    if (serviceLabel) serviceLabel.textContent = service;
    if (bookingLink) {
      const subject = `Booking request: ${service}`;
      const bodyCopy = `Hi Vinayak,\n\nI would like to discuss: ${service}.\n\nProject / idea:\nTimeline:\nBudget range (optional):\n\nThanks!`;
      bookingLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyCopy)}`;
    }
  };
  serviceCards.forEach((card) => card.addEventListener('click', () => selectService(card)));
  if (serviceCards.length) selectService(serviceCards.find((card) => card.classList.contains('is-selected')) || serviceCards[0]);

  document.querySelectorAll('[data-project-photo-input]').forEach((input) => {
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      const container = input.closest('.project-visual');
      const preview = container && container.querySelector('[data-project-photo-preview]');
      const state = container && container.querySelector('[data-project-photo-state]');
      if (!file || !preview || !state) return;
      preview.src = URL.createObjectURL(file);
      preview.hidden = false;
      state.textContent = `Local preview: ${file.name}`;
    });
  });

  const countUp = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    if (reduceMotion) { element.textContent = `${target}${suffix}`; return; }
    const startedAt = performance.now();
    const duration = 950;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - ((1 - progress) ** 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = [...document.querySelectorAll('[data-count]')];
  if (reduceMotion || !('IntersectionObserver' in window)) counters.forEach(countUp);
  else {
    const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      counterObserver.unobserve(entry.target);
    }), { threshold: .55 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const reelFeed = document.querySelector('[data-reel-feed]');
  const reelUrls = Array.isArray(config.instagramReelUrls) ? config.instagramReelUrls.filter(Boolean) : [];
  if (reelFeed && reelUrls.length) {
    reelFeed.innerHTML = '';
    reelUrls.forEach((url) => {
      const embed = document.createElement('blockquote');
      embed.className = 'instagram-media';
      embed.dataset.instgrmPermalink = url;
      embed.dataset.instgrmVersion = '14';
      reelFeed.append(embed);
    });
    const embedScript = document.createElement('script');
    embedScript.async = true;
    embedScript.src = 'https://www.instagram.com/embed.js';
    document.body.append(embedScript);
  }

  const backToTopButtons = [...document.querySelectorAll('[data-back-to-top]')];
  const updateBackToTop = () => backToTopButtons.forEach((button) => button.classList.toggle('is-visible', window.scrollY > 500));
  backToTopButtons.forEach((button) => button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })));
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  const chaosToggle = document.querySelector('[data-chaos-toggle]');
  if (chaosToggle) {
    chaosToggle.addEventListener('click', () => {
      const active = body.classList.toggle('is-chaos');
      chaosToggle.setAttribute('aria-pressed', String(active));
      chaosToggle.innerHTML = `${active ? 'Okay, normal-ish' : 'Make it weird'} <span>${active ? '↺' : '✦'}</span>`;
    });
  }

  if (reduceMotion || !finePointer) return;

  document.querySelectorAll('[data-tracking-stage]').forEach((stage) => {
    stage.addEventListener('pointermove', (event) => {
      const box = stage.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - .5) * 2;
      const y = ((event.clientY - box.top) / box.height - .5) * 2;
      stage.style.setProperty('--track-x', `${(x * 18).toFixed(1)}px`);
      stage.style.setProperty('--track-y', `${(y * 18).toFixed(1)}px`);
      stage.style.setProperty('--track-portrait-x', `${(x * -9).toFixed(1)}px`);
      stage.style.setProperty('--track-portrait-y', `${(y * -9).toFixed(1)}px`);
    });
    stage.addEventListener('pointerleave', () => {
      ['--track-x', '--track-y', '--track-portrait-x', '--track-portrait-y'].forEach((property) => stage.style.setProperty(property, '0px'));
    });
  });

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOrbit = document.querySelector('.cursor-orbit');
  if (cursorDot && cursorOrbit) {
    body.classList.add('has-custom-cursor');
    let pointerX = -100;
    let pointerY = -100;
    let orbitX = -100;
    let orbitY = -100;
    const renderCursor = () => {
      orbitX += (pointerX - orbitX) * .17;
      orbitY += (pointerY - orbitY) * .17;
      cursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      cursorOrbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`;
      requestAnimationFrame(renderCursor);
    };
    document.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      body.classList.add('cursor-is-visible');
    }, { passive: true });
    document.addEventListener('pointerover', (event) => {
      body.classList.toggle('cursor-is-link', Boolean(event.target.closest('a, button, summary')));
    });
    document.addEventListener('pointerout', (event) => {
      if (!event.relatedTarget) body.classList.remove('cursor-is-visible', 'cursor-is-link');
    });
    renderCursor();
  }

  document.querySelectorAll('.service-card, .social-icons a, .hero-buttons a, .creator-hero-actions > *, .footer > a:last-child').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      element.style.setProperty('--magnet-x', `${(x * 7).toFixed(1)}px`);
      element.style.setProperty('--magnet-y', `${(y * 7).toFixed(1)}px`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--magnet-x', '0px');
      element.style.setProperty('--magnet-y', '0px');
    });
  });
})();
