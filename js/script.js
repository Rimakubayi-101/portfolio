// ============ Typing effect ============
const roles = ["Sytsem Analsyt", "Information System", "Data Analyst"];
const textElement = document.getElementById("typingText");
let roleIndex = 0, charIndex = 0, typingSpeed = 85, deletingSpeed = 40, isDeleting = false;
function typeEffect() {
  try {
    if (!textElement) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      textElement.textContent = "I am a " + currentRole.substring(0, charIndex);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 450);
      } else {
        setTimeout(typeEffect, deletingSpeed);
      }
    } else {
      charIndex++;
      textElement.textContent = "I am a " + currentRole.substring(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1700);
      } else {
        setTimeout(typeEffect, typingSpeed);
      }
    }
  } catch (error) {
    console.error('TypeEffect error:', error);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

// ============ Active nav indicator + header scroll styles ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const siteHeader = document.querySelector('header');

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const hrefId = link.getAttribute('href') ? link.getAttribute('href').substring(1) : '';
    if (hrefId === current) link.classList.add('active');
  });
  if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 20);
}

// ============ Skills tab tag animation (legacy support for Tech Stack tab) ============
function animateSkillTags() {
  const leftTags = document.querySelectorAll('.skills-left .skill-tag');
  const rightTags = document.querySelectorAll('.skills-right .skill-tag');
  leftTags.forEach((tag, i) => {
    setTimeout(() => { tag.style.opacity = '1'; tag.style.transform = 'translateX(0)'; }, i * 55);
  });
  rightTags.forEach((tag, i) => {
    setTimeout(() => { tag.style.opacity = '1'; tag.style.transform = 'translateX(0)'; }, i * 55);
  });
}
function resetSkillTags() {
  const all = document.querySelectorAll('#techstack .skill-tag');
  all.forEach(t => { t.style.opacity = '0'; t.style.transform = ''; });
}

// ============ Scroll handler ============
function handleScroll() {
  updateActiveNav();
  toggleBackToTop();
}
window.addEventListener('scroll', handleScroll, { passive: true });

// ============ Contact form submission ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const fD = new FormData(contactForm);
    const payload = {
      name: fD.get('name'),
      email: fD.get('email'),
      message: fD.get('message')
    };
    const URL = 'https://formsubmit.co/ajax/risimakubayi6@gmail.com';
    const btn = contactForm.querySelector('.submit-btn');
    const origHTML = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.style.opacity = '0.75'; }
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    } catch (err) {
      alert('Sorry, there was a problem sending your message. Please try again later.');
    } finally {
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.innerHTML = origHTML; }
    }
  });
}

// ============ Back-to-top ============
const backToTop = document.getElementById('backToTop');
function toggleBackToTop() {
  if (!backToTop) return;
  const show = window.scrollY > 500;
  backToTop.style.opacity = show ? '1' : '0';
  backToTop.style.pointerEvents = show ? 'auto' : 'none';
  backToTop.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
}
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggleBackToTop();
}

// ============ Mobile hamburger ============
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navClose = document.getElementById('navClose');
if (hamburger && navLinksContainer) {
  function closeNav() {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('active');
  }
  function openNav() {
    hamburger.classList.add('active');
    navLinksContainer.classList.add('active');
  }
  hamburger.addEventListener('click', () => {
    if (navLinksContainer.classList.contains('active')) closeNav();
    else openNav();
  });
  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
      closeNav();
    }
  });
}

// ============ Tab switching ============
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        const tabId = this.getAttribute('data-tab');
        const target = document.getElementById(tabId);
        if (target) {
          target.classList.add('active');
          if (tabId === 'techstack') {
            resetSkillTags();
            setTimeout(animateSkillTags, 120);
          }
        }
      });
    });
  }

  // Initial scroll sync
  document.body.style.visibility = 'visible';
  handleScroll();
});
