(function () {
  /* ── Stars ── */
  const starsEl = document.querySelector('.stars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `--d:${(Math.random() * 3 + 2).toFixed(1)}s`,
      `--delay:${(Math.random() * 5).toFixed(1)}s`,
      `--op:${(Math.random() * 0.35 + 0.1).toFixed(2)}`
    ].join(';');
    starsEl.appendChild(s);
  }

  /* ── Floating hearts ── */
  const container = document.getElementById('heartsContainer');
  const glyphs = ['❤️', '🤍', '✦', '♡'];
  const W = document.documentElement.clientWidth;
  const H = document.documentElement.clientHeight;

  function spawnHeart() {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    const dur = (Math.random() * 2 + 2.5).toFixed(1);
    const rot  = (Math.random() * 30 - 15).toFixed(0);
    const rot2 = (Math.random() * 30 - 15).toFixed(0);
    h.style.cssText = [
      `left:${Math.random() * W}px`,
      `top:${H - 20}px`,
      `font-size:${(Math.random() * 0.8 + 0.7).toFixed(1)}rem`,
      `--dur:${dur}s`,
      `--rot:${rot}deg`,
      `--rot2:${rot2}deg`
    ].join(';');
    container.appendChild(h);
    setTimeout(() => h.remove(), parseFloat(dur) * 1000 + 200);
  }

  /* Burst on load */
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnHeart, i * 220);
  }

  /* Occasional drizzle */
  setInterval(spawnHeart, 900);
})();
