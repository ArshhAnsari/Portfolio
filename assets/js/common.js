/* assets/js/common.js */

// ── Dark mode ──
const html = document.documentElement;
const darkLabel = document.getElementById('dark-label');
const darkIcon = document.getElementById('dark-icon');

// Dark is the default — only opt-out to light if the user explicitly chose it
if (localStorage.getItem('dark') !== 'false') {
  html.classList.add('dark');
}

function toggleDark() {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('dark', isDark);
  updateDarkUI(isDark);
}

function updateDarkUI(isDark) {
  if (darkLabel) {
    darkLabel.textContent = isDark ? 'SWITCH TO LIGHT MODE' : 'SWITCH TO DARK MODE';
  }
  // swap to sun icon when dark
  if (darkIcon) {
    darkIcon.innerHTML = isDark
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
      : '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>';
  }
}
updateDarkUI(html.classList.contains('dark'));

// ── Mobile menu ──
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
  }
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      revealObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.08 });

document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal initialization
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Navigation Active State Logic
  const path = window.location.pathname;
  const isAboutPage = path.includes('about.html');

  if (isAboutPage) {
    document.querySelectorAll('a[href*="about.html"]').forEach(a => a.classList.add('active'));
  } else {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

    function scrollSpy() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      let activeId = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // 120px offset to trigger active state slightly early
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeId = id;
        }
      });

      // Force active section to the last one if page is scrolled to the absolute bottom
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 15);
      if (isAtBottom && sections.length > 0) {
        activeId = sections[sections.length - 1].getAttribute('id');
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (activeId && (href === `#${activeId}` || href.endsWith(`#${activeId}`))) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', scrollSpy);
    window.addEventListener('resize', scrollSpy);
    scrollSpy(); // Run initially to highlight section if loading on an anchor
  }
});
