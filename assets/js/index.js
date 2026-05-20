/* assets/js/index.js */

// ── Typewriter ──
const phrases = [
  'CvExtractor.',
  'Django APIs.',
  'Celery pipelines.',
  'LLM tooling.',
  'n8n automation.',
];

// --Contact--
const contacts = [
  {
    type: 'Email',
    value: 'arshhansari27@gmail.com',
    link: 'mailto:arshhansari27@gmail.com'
  },
  {
    type: 'GitHub',
    value: '@ArshhAnsari',
    link: 'https://github.com/ArshhAnsari'
  },
  {
    type: 'Twitter / X',
    value: '@Arshansari27',
    link: 'https://x.com/Arshansari27'
  },
  {
    type: 'LinkedIn',
    value: 'Mohd Arsh Ansari',
    link: 'https://www.linkedin.com/in/arshansari'
  },
  {
    type: 'Instagram',
    value: 'arshhansari_',
    link: 'https://instagram.com/arshhansari_'
  }
];

let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
if (tw) {
  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      tw.classList.add('is-typing');
      tw.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        tw.classList.remove('is-typing');
        setTimeout(tick, 1600);
        return;
      }
      setTimeout(tick, 60);
    } else {
      tw.classList.add('is-typing');
      tw.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        tw.classList.remove('is-typing');
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 35);
    }
  }
  setTimeout(tick, 800);
}

// ── Card hover arrow animation ──
document.querySelectorAll('.b-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const arrow = card.querySelector('.b-expand svg');
    if (arrow) arrow.style.transform = 'translate(2px, -2px)';
  });
  card.addEventListener('mouseleave', () => {
    const arrow = card.querySelector('.b-expand svg');
    if (arrow) arrow.style.transform = '';
  });
});
