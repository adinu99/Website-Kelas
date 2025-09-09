
// === THEME TOGGLE FIX (multi button) + SAVE TO LOCALSTORAGE ===
const themeButtons = document.querySelectorAll('.theme-toggle');
const themes = [
  {
    name: 'Default',
    bg: '#0b1020',
    card: '#0f1724',
    muted: '#9aa3b2',
    accent1: '#5f22c8',
    accent2: '#06b6d4',
    accent3: '#af1660',
    accent4: '#2b0b43'
  },
  {
    name: 'Red',
    bg: '#0b1020',
    card: '#0f1724',
    muted: '#9aa3b2',
    accent1: '#DC143C',
    accent2: '#F7CAC9',
    accent3: '#f75252ff',
    accent4: '#430b0bff'
  },
  {
    name: 'Blue',
    bg: '#0b1020',
    card: '#0f1724',
    muted: '#9aa3b2',
    accent1: '#0F4C75',
    accent2: '#BBE1FA',
    accent3: '#3282B8',
    accent4: '#0b2743ff'
  },
  {
    name: 'Yellow',
    bg: '#0b1020',
    card: '#0f1724',
    muted: '#c0c6d0ff',
    accent1: '#FF9B00',
    accent2: '#FFE100',
    accent3: '#7B4019',
    accent4: '#433a0bff'
  }
];

// Ambil theme terakhir dari localStorage (kalau ada), default ke 0
let currentTheme = parseInt(localStorage.getItem('themeIndex')) || 0;
applyTheme(currentTheme);

function applyTheme(index) {
  const t = themes[index];
  document.documentElement.style.setProperty('--bg', t.bg);
  document.documentElement.style.setProperty('--card', t.card);
  document.documentElement.style.setProperty('--muted', t.muted);
  document.documentElement.style.setProperty('--accent1', t.accent1);
  document.documentElement.style.setProperty('--accent2', t.accent2);
  document.documentElement.style.setProperty('--accent3', t.accent3);
  document.documentElement.style.setProperty('--accent4', t.accent4);

  // Update semua tombol agar text konsisten
  themeButtons.forEach(b => b.textContent = t.name);
}

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    localStorage.setItem('themeIndex', currentTheme); // simpan pilihan theme
    applyTheme(currentTheme);
  });
});


// TYPING EFFECT (simple)
(function typingEffect() {
  const el = document.getElementById('typing');
  const phrases = ["We Achieve More", "Learn. Build. Grow.", "Future Engineer"];
  let p = 0, i = 0, forward = true;
  function tick() {
    const full = phrases[p];
    el.textContent = full.slice(0, i) + (i % 2 ? "" : "");
    if (forward) { i++; if (i > full.length) { forward = false; setTimeout(tick, 900); return; } }
    else { i--; if (i < 0) { forward = true; p = (p + 1) % phrases.length; } }
    setTimeout(tick, forward ? 80 : 30);
  }
  tick();
})();


// SCROLL PROGRESS
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const val = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = val + '%';
});

// MEMBER TILT EFFECT
const members = document.querySelectorAll('.member');
members.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 12;
    const rotX = (0.5 - y) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
  card.addEventListener('focus', () => card.style.transform = 'scale(1.02) translateY(-6px)');
  card.addEventListener('blur', () => card.style.transform = 'none');
});

// GALLERY LAZY LOAD
document.querySelectorAll('.gallery img').forEach(img => img.setAttribute('loading', 'lazy'));

// FORM HANDLING
function handleGuestForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Nama, Email, dan Pesan wajib diisi.');
    return false;
  }
  const list = document.getElementById('guestList');
  const card = document.createElement('div');
  card.className = 'section-blank';
  card.style.marginTop = '10px';
  card.innerHTML = `<strong>${escapeHtml(name)}</strong> <span class="muted" style="margin-left:8px">${escapeHtml(email)}</span>
                    <div style="margin-top:6px;font-weight:600">${escapeHtml(subject || '—')}</div>
                    <p class="muted" style="margin-top:6px">${escapeHtml(message)}</p>`;
  list.prepend(card);
  e.target.reset();
  alert('Terima kasih! Pesan Anda ditambahkan (client-only).');
  return false;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    ev.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Shortcut "g" to gallery
window.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey) {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  }
});

// Remove hover transforms on touch devices
function adaptForTouch() {
  if ('ontouchstart' in window) {
    document.querySelectorAll('.member').forEach(m => {
      m.removeEventListener('mousemove', () => { });
      m.style.transform = 'none';
    });
  }
}
adaptForTouch();

// Back to top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile menu toggle
// Mobile menu toggle (hamburger animasi jadi X)
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  menuToggle.classList.remove('active');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  const isActive = mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open', isActive);
  menuToggle.classList.toggle('active', isActive); // animasi garis → X
});

// Tutup menu otomatis saat klik link
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});



// Counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("#achievements .stat-card h3");

  const animateCounter = (el) => {
    const originalText = el.getAttribute("data-original") || el.textContent.trim();
    const hasPlus = originalText.includes("+");
    const hasHash = originalText.includes("#");
    const hasPercent = originalText.includes("%");

    const target = parseInt(originalText.replace(/\D/g, ""));
    let start = 0;
    const duration = 3500;
    const startTime = performance.now();

    const easeOutQuad = (t) => t * (2 - t);

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const current = Math.floor(start + (target - start) * easedProgress);

      if (hasHash) {
        el.textContent = `#${current}`;
      } else if (hasPercent) {
        el.textContent = `${current}%`;
      } else if (hasPlus) {
        el.textContent = `${current}+`;
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        animateCounter(el);
      } else {
        el.textContent = "0";
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counter.setAttribute("data-original", counter.textContent.trim());
    observer.observe(counter);
  });
});

const canvas = document.getElementById('particleBackground');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const numParticles = 120; // jumlah partikel
const glowBlur = 8; // blur untuk glow effect

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5, // partikel kecil
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

// Helper untuk konversi HEX ke RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ambil warna terbaru dari CSS variable
  let accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent1')
    .trim();

  const rgb = hexToRgb(accentColor);
  ctx.shadowBlur = glowBlur;
  ctx.shadowColor = `rgba(${rgb}, 0.6)`; // Glow mengikuti warna partikel

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb}, 0.6)`; // 60% opacity
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();


// Pastikan selalu mulai di atas saat reload
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  const welcome = document.getElementById('welcomeScreen');
  const body = document.body;

  // Kunci scroll saat welcome screen aktif
  body.style.overflow = "hidden";

  const totalAnimation = 4000; // durasi splash (ms)

  setTimeout(() => {
    // Fade out
    welcome.classList.add('fade-out');

    // Lepas scroll lock
    body.style.overflow = "auto";

    // Opsional: sembunyikan elemen welcome
    setTimeout(() => {
      welcome.style.display = "none";
    }, 1200);
  }, totalAnimation);
});


