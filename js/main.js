/**
 * Main JS — Laser Quest Boulogne
 * Core functionality: scroll effects, reveal animations, back-to-top, misc
 */

(function () {
  'use strict';

  /* ────────────────────────────────────────
     Sticky Navbar on Scroll
  ──────────────────────────────────────── */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY = window.scrollY;

          if (scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('navbar-transparent');
          } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-transparent');
          }

          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on init
  }

  /* ────────────────────────────────────────
     Scroll Reveal Animations (IntersectionObserver)
  ──────────────────────────────────────── */
  function initScrollReveal() {
    const revealSelectors = [
      '.reveal',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));
    if (!elements.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Once triggered, don't watch anymore
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ────────────────────────────────────────
     Back to Top Button
  ──────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard support
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ────────────────────────────────────────
     Animated Counter
  ──────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const el      = entry.target;
          const target  = parseInt(el.getAttribute('data-count'), 10);
          const suffix  = el.getAttribute('data-suffix') || '';
          const prefix  = el.getAttribute('data-prefix') || '';
          const duration = 1500;

          if (prefersReducedMotion) {
            el.textContent = prefix + target + suffix;
            observer.unobserve(el);
            return;
          }

          let start = 0;
          const step = target / (duration / 16);
          const startTime = performance.now();

          function update(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * ease);
            el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  }

  /* ────────────────────────────────────────
     Hero Particles (canvas-free, CSS-based)
  ──────────────────────────────────────── */
  function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create a few floating particles
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    `;

    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      const size  = Math.random() * 3 + 1;
      const x     = Math.random() * 100;
      const delay = Math.random() * 8;
      const dur   = Math.random() * 10 + 12;
      const color = Math.random() > 0.6
        ? 'rgba(255, 45, 45, 0.6)'
        : Math.random() > 0.5
          ? 'rgba(0, 212, 255, 0.4)'
          : 'rgba(255, 107, 53, 0.5)';

      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        left: ${x}%;
        bottom: -10px;
        animation: heroParticle ${dur}s ease-in-out ${delay}s infinite;
        box-shadow: 0 0 ${size * 4}px ${color};
      `;

      particleContainer.appendChild(p);
    }

    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.appendChild(particleContainer);
    }
  }

  /* ────────────────────────────────────────
     Form Validation & Enhancement
  ──────────────────────────────────────── */
  function initForms() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('.form-control[required]');

      inputs.forEach(input => {
        // Show validation state on blur
        input.addEventListener('blur', function () {
          validateInput(this);
        });

        // Clear error on input
        input.addEventListener('input', function () {
          clearError(this);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        inputs.forEach(input => {
          if (!validateInput(input)) {
            valid = false;
          }
        });

        if (valid) {
          showFormSuccess(form);
        }
      });
    });
  }

  function validateInput(input) {
    const value = input.value.trim();
    let error   = '';

    if (input.hasAttribute('required') && !value) {
      error = 'Ce champ est requis';
    } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Adresse e-mail invalide';
    } else if (input.type === 'tel' && value && !/^[\d\s\+\-\(\)\.]{7,}$/.test(value)) {
      error = 'Numéro de téléphone invalide';
    }

    if (error) {
      showError(input, error);
      return false;
    }

    showSuccess(input);
    return true;
  }

  function showError(input, message) {
    clearError(input);
    input.style.borderColor = 'var(--color-error)';

    const msg = document.createElement('span');
    msg.className     = 'form-error-msg';
    msg.textContent   = message;
    msg.style.cssText = 'display:block;color:var(--color-error);font-size:0.75rem;margin-top:4px;';
    input.parentNode.insertBefore(msg, input.nextSibling);
  }

  function showSuccess(input) {
    clearError(input);
    input.style.borderColor = 'var(--color-success)';
  }

  function clearError(input) {
    input.style.borderColor = '';
    const msg = input.parentNode.querySelector('.form-error-msg');
    if (msg) msg.remove();
  }

  function showFormSuccess(form) {
    form.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;">
        <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
        <h3 style="font-size:1.5rem;margin-bottom:0.5rem;color:var(--color-success);">Message envoyé !</h3>
        <p style="color:var(--color-text-muted);">Nous vous recontacterons dans les plus brefs délais.</p>
      </div>
    `;
  }

  /* ────────────────────────────────────────
     Smooth Anchor Scrolling
  ──────────────────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ────────────────────────────────────────
     Lazy Images
  ──────────────────────────────────────── */
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '200px' }
    );

    images.forEach(img => observer.observe(img));
  }

  /* ────────────────────────────────────────
     Initialize All
  ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();
    initCounters();
    initHeroParticles();
    initForms();
    initSmoothScroll();
    initLazyImages();

    // Page load animation
    document.body.style.opacity = '0';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity    = '1';
      });
    });
  });

})();
