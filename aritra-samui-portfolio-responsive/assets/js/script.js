/* =========================================================
   Aritra Samui — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initThemeToggle();
  initNavScroll();
  initMobileNav();
  initActiveNavLink();
  initScrollReveal();
  initTypewriterRole();
  initHeroStats();
  initStackDiagramTracker();
  initLayerScanCursor();
  initProjectFilter();
  initProjectCardLinks();
  initContactForm();
});

/* ---------- footer year ---------- */
function initYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- nav background on scroll ---------- */
function initNavScroll(){
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- mobile nav toggle ---------- */
function initMobileNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- highlight active nav link based on section in view ---------- */
function initActiveNavLink(){
  const links = document.querySelectorAll('[data-nav]');
  const sections = Array.from(links)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = '#' + entry.target.id;
      links.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------- generic scroll-reveal for [data-reveal] and skill layers ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('[data-reveal], .skill-layer');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- light / dark theme toggle ---------- */
function initThemeToggle(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

/* ---------- hero role typewriter ---------- */
function initTypewriterRole(){
  const el = document.getElementById('typewriterWord');
  if (!el) return;

  const roles = ['Full-Stack Developer', 'Software Engineer', 'AI/ML Engineer', 'Data Analyst'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const HOLD_TIME = 1400;

  const tick = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  };

  tick();
}

/* ---------- animated hero stat counters ---------- */
function initHeroStats(){
  const nums = document.querySelectorAll('.hero-stat-num');
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
}

/* ---------- stack diagram: highlight layer under cursor + status text ---------- */
function initStackDiagramTracker(){
  const layers = document.querySelectorAll('.stack-layer');
  const status = document.getElementById('stackCurrent');
  if (!layers.length || !status) return;

  const names = {
    ui: 'reading layer: interface',
    api: 'reading layer: logic & api',
    db: 'reading layer: data',
    infra: 'reading layer: infra'
  };

  layers.forEach(layer => {
    layer.addEventListener('mouseenter', () => {
      status.textContent = names[layer.dataset.layer] || '';
    });
  });
}

/* ---------- thin accent line that follows vertical scroll position ---------- */
function initLayerScanCursor(){
  const scan = document.getElementById('layerScan');
  if (!scan) return;

  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      scan.style.top = e.clientY + 'px';
      scan.style.opacity = '0.35';
      ticking = false;
    });
  });

  window.addEventListener('mouseleave', () => {
    scan.style.opacity = '0';
  });
}

/* ---------- project cards: whole card opens its project link ---------- */
function initProjectCardLinks(){
  const cards = document.querySelectorAll('.project-card[data-url]');
  if (!cards.length) return;

  cards.forEach(card => {
    const url = card.dataset.url;

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // let inner Live/Code links behave normally
      window.open(url, '_blank', 'noopener');
    });

    card.addEventListener('keydown', (e) => {
      if (e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(url, '_blank', 'noopener');
      }
    });
  });
}

/* ---------- project gallery filter ---------- */
function initProjectFilter(){
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('projectEmpty');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}

/* ---------- contact form via Web3Forms ----------
   Sends real email straight from the form, no email app needed.
   Setup (one-time, ~1 minute):
   1. Go to https://web3forms.com and enter your email — it emails
      you a free Access Key instantly, no account/password needed.
   2. Paste that key into the hidden "access_key" input's value
      in index.html (search for YOUR_WEB3FORMS_ACCESS_KEY).
   Until that key is set, the form will show a setup reminder
   instead of silently failing.
------------------------------------------------------------ */
function initContactForm(){
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  const status = document.getElementById('formStatus');
  if (!form) return;

  const accessKeyInput = form.querySelector('input[name="access_key"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in every field before sending.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('That email address doesn\u2019t look right.', 'error');
      return;
    }
    if (!accessKeyInput || accessKeyInput.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('Form isn\u2019t fully set up yet \u2014 add a Web3Forms access key in index.html.', 'error');
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await res.json();

      if (result.success) {
        setStatus('Message sent — thanks! I\u2019ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Web3Forms error:', err);
      setStatus('Something went wrong sending that. Try emailing me directly.', 'error');
    } finally {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  });

  function setStatus(text, type){
    status.textContent = text;
    status.classList.remove('is-success', 'is-error');
    status.classList.add(type === 'success' ? 'is-success' : 'is-error');
  }
}
