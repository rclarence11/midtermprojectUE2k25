// Custom Cursor
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        ring.style.left   = e.clientX + 'px';
        ring.style.top    = e.clientY + 'px';
    });
}

// Scroll Progress
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (progressBar) {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        progressBar.style.width = pct + '%';
    }
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile Nav
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// Stat Counter
const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-target]').forEach(el => {
            const target = +el.dataset.target;
            let count = 0;
            const step = Math.ceil(target / 50);
            const t = setInterval(() => {
                count = Math.min(count + step, target);
                el.textContent = count + (target >= 50 ? '+' : '');
                if (count >= target) clearInterval(t);
            }, 35);
        });
        statObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats-inner');
if (statsEl) statObs.observe(statsEl);

// Contact Form
function handleForm(e) {
    e.preventDefault();
    const s = document.getElementById('form-success');
    if (s) { s.classList.add('show'); e.target.reset(); }
}

// Splash particles
function initParticles() {
    const container = document.getElementById('splash-particles');
    if (!container) return;
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('span');
        const size = (Math.random() * 2 + 1.5) + 'px';
        p.style.cssText = `left:${Math.random()*100}%;width:${size};height:${size};animation-duration:${Math.random()*8+6}s;animation-delay:${Math.random()*8}s`;
        container.appendChild(p);
    }
}
initParticles();