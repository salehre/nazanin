(function () {

  /* ── Pixel stars ── */
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 70; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const sz = Math.random() < 0.6 ? 2 : 3;          // pixel squares: 2 or 3px
    s.style.cssText = [
      `width:${sz}px`, `height:${sz}px`,
      `left:${Math.random()*100}%`,
      `top:${Math.random()*100}%`,
      `--d:${(Math.random()*3+2).toFixed(1)}s`,
      `--delay:${(Math.random()*6).toFixed(1)}s`,
      `--op:${(Math.random()*0.5+0.15).toFixed(2)}`
    ].join(';');
    frag.appendChild(s);
  }
  document.querySelector('.pixel-bg').appendChild(frag);

  /* ── Elements ── */
  const yesBtn   = document.getElementById('yesBtn');
  const noBtn    = document.getElementById('noBtn');
  const counter  = document.getElementById('noCounter');
  let noHits = 0;

  const messages = [
    '', 'really?', 'come on...', 'are you sure?',
    'think again!', 'last chance!', 'ok fine...',
    'YES is right there!', 'just press YES :(', 'fuck it you cant regect me'
  ];

  /* ── NO: smooth floating escape ── */
  let floating = false;
  let animId   = null;

  // current position (used when switching to fixed)
  let posX = 0, posY = 0;
  // target position
  let tgtX = 0, tgtY = 0;

  function getNoCenter() {
    const r = noBtn.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  }

  function initFloat() {
    if (floating) return;
    const r = noBtn.getBoundingClientRect();
    posX = r.left; posY = r.top;
    tgtX = r.left; tgtY = r.top;
    noBtn.classList.add('floating');
    noBtn.style.left = posX + 'px';
    noBtn.style.top  = posY + 'px';
    floating = true;
    smoothLoop();
  }

  function smoothLoop() {
    posX += (tgtX - posX) * 0.07;
    posY += (tgtY - posY) * 0.07;
    noBtn.style.left = posX + 'px';
    noBtn.style.top  = posY + 'px';
    animId = requestAnimationFrame(smoothLoop);
  }

  function flee(mx, my) {
    initFloat();
    const c  = getNoCenter();
    const dx = c.x - mx, dy = c.y - my;
    const d  = Math.hypot(dx, dy) || 1;

    const W = document.documentElement.clientWidth;
    const H = document.documentElement.clientHeight;
    const r = noBtn.getBoundingClientRect();
    const step = Math.min(W, H) * 0.28;

    let nx = posX + (dx/d) * step;
    let ny = posY + (dy/d) * step;
    const m = 12;
    nx = Math.max(m, Math.min(W - r.width  - m, nx));
    ny = Math.max(m, Math.min(H - r.height - m, ny));
    tgtX = nx; tgtY = ny;
  }

  /* proximity check on mousemove over document — feels truly smooth */
  document.addEventListener('mousemove', function(e) {
    const c = getNoCenter();
    const d = Math.hypot(e.clientX - c.x, e.clientY - c.y);
    if (d < 80) flee(e.clientX, e.clientY);
  });

  /* ── NO click: grow YES ── */
  noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    noHits = Math.min(noHits + 1, 9);

    // grow yes
    yesBtn.dataset.hits = noHits;

    // fade no
    noBtn.dataset.fade  = noHits;

    // counter message
    counter.textContent = messages[noHits] || '';

    // flee away on click too
    flee(e.clientX, e.clientY);
  });

  noBtn.addEventListener('touchstart', function(e) {
    const t = e.touches[0];
    flee(t.clientX, t.clientY);
  }, { passive: true });

  /* ── YES ── */
  yesBtn.addEventListener('click', function() {
    window.location.href = 'success.html';
  });

})();
