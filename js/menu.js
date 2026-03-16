/**
 * Menu — Laser Quest Boulogne
 * Handles burger menu, mobile navigation, dropdown handling
 */

(function () {
  'use strict';

  function init() {
    document.addEventListener('DOMContentLoaded', function () {
      const burger     = document.querySelector('.burger');
      const mobileMenu = document.querySelector('.mobile-menu');
      const body       = document.body;

      if (!burger || !mobileMenu) return;

      // Toggle mobile menu
      burger.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.contains('open');
        toggleMenu(!isOpen);
      });

      function toggleMenu(open) {
        if (open) {
          burger.classList.add('open');
          mobileMenu.classList.add('open');
          burger.setAttribute('aria-expanded', 'true');
          burger.setAttribute('aria-label', 'Fermer le menu');
          body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Ouvrir le menu');
          body.style.overflow = '';
        }
      }

      // Close menu on outside click
      document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
          if (mobileMenu.classList.contains('open')) {
            toggleMenu(false);
          }
        }
      });

      // Close menu on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          toggleMenu(false);
          burger.focus();
        }
      });

      // Close menu when a mobile nav link is clicked
      const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .btn');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
          toggleMenu(false);
        });
      });

      // Handle resize — close menu if window is resized to desktop width
      let resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (window.innerWidth > 1024 && mobileMenu.classList.contains('open')) {
            toggleMenu(false);
          }
        }, 150);
      });

      // Set initial aria attributes
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      burger.setAttribute('aria-controls', 'mobile-menu');
      mobileMenu.setAttribute('id', 'mobile-menu');
      mobileMenu.setAttribute('aria-label', 'Menu de navigation');

      // Mark active nav item
      setActiveNavLinks();
    });
  }

  function setActiveNavLinks() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const currentFile = currentPath.split('/').pop() || 'index.html';

    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkFile = href.split('/').pop() || 'index.html';

      // Handle root path
      const isHome = (currentFile === '' || currentFile === 'index.html' || currentFile === 'index')
        && (linkFile === 'index.html' || linkFile === '' || href === '/' || href === './');

      const isActive = isHome || (linkFile && linkFile === currentFile) ||
        (href !== '/' && href !== './' && currentPath.includes(href.replace('.html', '')));

      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Tabs functionality
  function initTabs() {
    document.addEventListener('DOMContentLoaded', function () {
      const tabBtns = document.querySelectorAll('.tab-btn');
      const tabPanels = document.querySelectorAll('.tab-panel');

      tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          const targetId = this.getAttribute('data-tab');
          if (!targetId) return;

          // Update buttons
          tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

          // Update panels
          tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('hidden', '');
          });

          const target = document.getElementById(targetId);
          if (target) {
            target.classList.add('active');
            target.removeAttribute('hidden');
          }
        });
      });
    });
  }

  // Accordion functionality
  function initAccordions() {
    document.addEventListener('DOMContentLoaded', function () {
      const accordionItems = document.querySelectorAll('.accordion-item');

      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', function () {
          const isOpen = item.classList.contains('open');

          // Close all accordions (optional: remove for multi-open)
          accordionItems.forEach(i => {
            i.classList.remove('open');
            const h = i.querySelector('.accordion-header');
            if (h) h.setAttribute('aria-expanded', 'false');
          });

          if (!isOpen) {
            item.classList.add('open');
            header.setAttribute('aria-expanded', 'true');
          }
        });

        // Keyboard support
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
          }
        });
      });
    });
  }

  init();
  initTabs();
  initAccordions();
})();
