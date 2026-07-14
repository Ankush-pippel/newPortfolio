/*==========================
MOBILE MENU TOGGLE
===========================*/
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show-menu');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close menu when a link is clicked (mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        menuToggle.setAttribute('aria-expanded', false);
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

/*==========================
SCROLL REVEAL ANIMATIONS
===========================*/
const revealElements = document.querySelectorAll(
  '.reveal, .service-box, .project-card, .why-grid div, .process div, .stat, #about p'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/*==========================
COUNTER ANIMATION (STATS)
===========================*/
const statNumbers = document.querySelectorAll('.stat h2[data-count]');
let countersStarted = false;

function animateCounters() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'), 10);
    const suffix = stat.getAttribute('data-suffix') || (stat.getAttribute('data-count') === '100' || stat.getAttribute('data-count') === '99' ? '%' : '+');
    let count = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 15);

    const counter = setInterval(() => {
      count++;
      stat.textContent = count + suffix;
      if (count >= target) {
        stat.textContent = target + suffix;
        clearInterval(counter);
      }
    }, stepTime);
  });
}

const statsSection = document.querySelector('.stats');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      animateCounters();
      countersStarted = true;
    }
  });
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);

/*==========================
TYPING EFFECT (HERO)
===========================*/
const typingTarget = document.getElementById('typing');

if (typingTarget) {
  const words = [
    'Freelance Web Developer',
    'Business Website Expert',
    'Landing Page Specialist',
    'SEO Friendly Developer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 300;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}

/*==========================
SCROLL TO TOP BUTTON
===========================*/
const scrollTopBtn = document.createElement('div');
scrollTopBtn.classList.add('scroll-top');
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.setAttribute('role', 'button');
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*==========================
SMOOTH SCROLLING (ANCHOR LINKS)
===========================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

/*==========================
ACTIVE NAV LINK ON SCROLL
===========================*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-menu a.nav-link');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active-link'));
        const activeLink = document.querySelector(`#nav-menu a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active-link');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));
}