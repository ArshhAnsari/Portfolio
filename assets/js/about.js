/* assets/js/about.js */

// ── 5-card photo stack: click/drag to cycle ──
(function() {
  const stack  = document.getElementById('photoStack');
  if (!stack) return;

  const cards  = Array.from(stack.querySelectorAll('.photo-card'));
  const dots   = Array.from(document.querySelectorAll('.stack-dot'));
  const TOTAL  = cards.length;

  // rotation offsets per depth position (0=top, 4=bottom)
  const ROTS   = [4.2, 1.5, -1.8, -3.5, -5.0];
  const SCALES = [1.00, 0.97, 0.94, 0.91, 0.88];
  const TY     = [0, 4, 8, 12, 16]; // px translateY for depth
  const OPAC   = [1, 0.92, 0.84, 0.76, 0.68];

  // current order: order[0] = topmost card index
  let order = cards.map((_, i) => i).reverse(); // [4,3,2,1,0] → card 4 on top
  let topIdx = 0; // which position in `order` is the top
  let cycleCount = 0;

  function applyLayout(animated) {
    cards.forEach(c => {
      c.style.transition = animated
        ? 'transform .4s cubic-bezier(.34,1.3,.64,1), opacity .3s ease'
        : 'none';
      c.style.boxShadow = ''; // reset on cycle
    });
    order.forEach((cardIdx, depth) => {
      const c = cards[cardIdx];
      const r = ROTS[depth], s = SCALES[depth], ty = TY[depth], op = OPAC[depth];
      c.style.transform = `rotate(${r}deg) scale(${s}) translateY(${ty}px) translateZ(0)`;
      c.style.zIndex    = TOTAL - depth;
      c.style.opacity   = op;
      c.style.cursor    = depth === 0 ? 'grab' : 'default';
      c.classList.toggle('is-top', depth === 0);
    });
    // dots
    dots.forEach((d, i) => d.classList.toggle('active', i === (cycleCount % TOTAL)));
  }

  // send top card to bottom
  function cycleNext() {
    cycleCount++;
    const topCard = order.shift();
    order.push(topCard);
    applyLayout(true);
  }

  applyLayout(false);

  // ── Hover: lift top card + fan stack ──
  const ROTS_HOVER   = [4.2,  4.8, -3.2, -5.5, -7.0]; // cards fan wider
  const SCALES_HOVER = [1.04, 0.96, 0.92, 0.89, 0.86]; // top lifts, rest compress
  const TY_HOVER     = [-6,   8,    14,   18,   22  ]; // top rises, rest sink

  stack.addEventListener('mouseenter', () => {
    cards.forEach(c => {
      c.style.transition = 'transform .25s cubic-bezier(.34,1.3,.64,1), box-shadow .25s ease, opacity .25s ease';
    });

    order.forEach((cardIdx, depth) => {
      const c  = cards[cardIdx];
      const r  = ROTS_HOVER[depth];
      const s  = SCALES_HOVER[depth];
      const ty = TY_HOVER[depth];
      c.style.transform = `rotate(${r}deg) scale(${s}) translateY(${ty}px) translateZ(0)`;

      // top card gets deeper shadow on hover
      if (depth === 0) {
        c.style.boxShadow = '0 20px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.12)';
      }
    });
  });

  stack.addEventListener('mouseleave', () => {
    // only reset if not currently dragging
    if (dragging) return;
    applyLayout(true); // snaps back to default positions
    // reset top card shadow
    cards[order[0]].style.boxShadow = '';
  });

  // click to cycle
  stack.addEventListener('click', e => {
    if (!dragged) cycleNext();
  });

  // drag to cycle (swipe left/down sends to back)
  let dragging = false, dragged = false, sx = 0, sy = 0;
  const topCard = () => cards[order[0]];

  stack.addEventListener('mousedown', e => {
    dragging = true; dragged = false;
    sx = e.clientX; sy = e.clientY;
    topCard().style.transition = 'none';
    topCard().style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragged = true;
    topCard().style.transform = `rotate(${ROTS[0]}deg) translate(${dx}px,${dy}px) translateZ(0)`;
  });
  document.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (dragged && (Math.abs(dx) > 60 || Math.abs(dy) > 60)) {
      cycleNext();
    } else {
      topCard().style.transition = 'transform .3s ease';
      topCard().style.transform  = `rotate(${ROTS[0]}deg) scale(${SCALES[0]}) translateZ(0)`;
      topCard().style.cursor     = 'grab';
    }
    setTimeout(() => { dragged = false; }, 50);
  });

  // touch
  stack.addEventListener('touchstart', e => {
    const t = e.touches[0]; dragging = true; dragged = false;
    sx = t.clientX; sy = t.clientY;
    topCard().style.transition = 'none';
  }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragged = true;
    topCard().style.transform = `rotate(${ROTS[0]}deg) translate(${dx}px,${dy}px) translateZ(0)`;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (!dragging) return;
    dragging = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (dragged && (Math.abs(dx) > 50 || Math.abs(dy) > 50)) {
      cycleNext();
    } else {
      if (!dragged) cycleNext(); // tap = cycle
      else {
        topCard().style.transition = 'transform .3s ease';
        topCard().style.transform  = `rotate(${ROTS[0]}deg) scale(${SCALES[0]}) translateZ(0)`;
      }
    }
    setTimeout(() => { dragged = false; }, 50);
  });
})();
