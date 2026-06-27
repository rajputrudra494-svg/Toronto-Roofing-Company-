/* ============================================================
   TORONTO ROOFING GROUP — JavaScript Engine
   Parallax, Particles, Scroll Animations, Tilt Cards,
   Custom Cursor, Counter Animations, Mobile Menu
   ============================================================ */

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. CUSTOM CURSOR
  // ──────────────────────────────────────────────
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states for interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .service-card, .project-card, .why-feature, .testimonial-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });
  }

  // ──────────────────────────────────────────────
  // 2. SCROLL PROGRESS BAR
  // ──────────────────────────────────────────────
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

  // ──────────────────────────────────────────────
  // 3. NAVBAR SCROLL EFFECT
  // ──────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ──────────────────────────────────────────────
  // 4. MOBILE MENU
  // ──────────────────────────────────────────────
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ──────────────────────────────────────────────
  // 5. SCROLL REVEAL ANIMATIONS
  // ──────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Stagger children animations
  function staggerChildren(parentSelector, childSelector, delay) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    parent.querySelectorAll(childSelector).forEach((el, i) => {
      el.style.transitionDelay = (i * delay) + 's';
    });
  }

  staggerChildren('.services-grid', '.service-card', 0.1);
  staggerChildren('.process-timeline', '.process-step', 0.12);
  staggerChildren('.projects-grid', '.project-card', 0.1);
  staggerChildren('.why-features', '.why-feature', 0.1);
  staggerChildren('.testimonials-grid', '.testimonial-card', 0.12);

  // ──────────────────────────────────────────────
  // 6. PARALLAX SCROLLING
  // ──────────────────────────────────────────────
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) - scrollY;
      const parallaxOffset = offset * speed;
      el.style.transform = `translateY(${parallaxOffset * -0.15}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  // Hero-specific parallax
  const heroShapes = document.querySelectorAll('.hero-shape');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroShapes.forEach((shape, i) => {
      const speed = 0.05 + (i * 0.03);
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  // ──────────────────────────────────────────────
  // 7. TILT EFFECT ON CARDS
  // ──────────────────────────────────────────────
  if (window.innerWidth > 1024) {
    const tiltCards = document.querySelectorAll('.service-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

        // Dynamic glow position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', percentX + '%');
        card.style.setProperty('--mouse-y', percentY + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  // ──────────────────────────────────────────────
  // 8. ANIMATED COUNTER
  // ──────────────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = el.dataset.count;
    const isNumber = /^\d+$/.test(target.replace(/,/g, ''));

    if (!isNumber) {
      el.textContent = target;
      return;
    }

    const num = parseInt(target.replace(/,/g, ''), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * num);

      el.textContent = current.toLocaleString() + (target.includes('+') ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ──────────────────────────────────────────────
  // 9. PARTICLE SYSTEM
  // ──────────────────────────────────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ──────────────────────────────────────────────
  // 10. BACK TO TOP
  // ──────────────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────────
  // 11. SMOOTH SECTION LINK SCROLLING
  // ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ──────────────────────────────────────────────
  // 12. ACTIVE NAV LINK HIGHLIGHTING
  // ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ──────────────────────────────────────────────
  // 13. IMAGE PARALLAX ON HERO
  // ──────────────────────────────────────────────
  const heroImage = document.querySelector('.hero-image-container img');
  if (heroImage && window.innerWidth > 1024) {
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrollY < heroHeight) {
        const parallax = scrollY * 0.15;
        heroImage.style.transform = `translateY(${parallax}px) scale(1.05)`;
      }
    }, { passive: true });
  }

  // ──────────────────────────────────────────────
  // 14. MOUSE MOVE HERO DEPTH EFFECT
  // ──────────────────────────────────────────────
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.innerWidth > 1024) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const moveX = (clientX - innerWidth / 2) / innerWidth * 20;
      const moveY = (clientY - innerHeight / 2) / innerHeight * 20;

      const shapes = heroSection.querySelectorAll('.hero-shape');
      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 0.5;
        shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });
  }

})();
