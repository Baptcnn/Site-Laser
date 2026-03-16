/**
 * Theme Toggle — Laser Quest Boulogne
 * Handles dark/light mode with localStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'lq-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  // Determine initial theme (localStorage → system preference → dark default)
  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;

    // Prefer system setting if no override stored
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }
    return DARK; // Default to dark (gaming atmosphere)
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach(btn => {
      const sunIcon  = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');

      if (sunIcon && moonIcon) {
        if (theme === DARK) {
          sunIcon.style.display  = 'block';
          moonIcon.style.display = 'none';
          btn.setAttribute('aria-label', 'Passer en mode clair');
          btn.setAttribute('title',      'Mode clair');
        } else {
          sunIcon.style.display  = 'none';
          moonIcon.style.display = 'block';
          btn.setAttribute('aria-label', 'Passer en mode sombre');
          btn.setAttribute('title',      'Mode sombre');
        }
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DARK;
    const next    = current === DARK ? LIGHT : DARK;
    applyTheme(next);

    // Subtle animation feedback
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
  }

  function init() {
    // Apply theme immediately (before DOM fully loaded to avoid flash)
    const theme = getInitialTheme();
    applyTheme(theme);

    // Attach click handlers after DOM ready
    document.addEventListener('DOMContentLoaded', function () {
      const toggleBtns = document.querySelectorAll('.theme-toggle');
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
      });

      // Listen for system preference changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          // Only follow system if user hasn't explicitly set a preference
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? DARK : LIGHT);
          }
        });
      }

      // Keyboard shortcut: Alt+T
      document.addEventListener('keydown', function (e) {
        if (e.altKey && e.key === 't') {
          e.preventDefault();
          toggleTheme();
        }
      });
    });
  }

  // Run immediately so theme is applied before first paint
  init();

  // Expose to global scope for inline usage
  window.toggleTheme = toggleTheme;
})();
