
let currentTestimonial = 0;
const totalTestimonials = 3;
let autoRotate;

function goToTestimonial(index) {
  document.querySelectorAll('.testimonial-slide').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.t-dot').forEach(d => d.classList.remove('active'));

  currentTestimonial = index;
  document.querySelectorAll('.testimonial-slide')[index].classList.add('active');
  document.querySelectorAll('.t-dot')[index].classList.add('active');
}

function nextTestimonial() {
  goToTestimonial((currentTestimonial + 1) % totalTestimonials);
}

autoRotate = setInterval(nextTestimonial, 4000);

const carousel = document.querySelector('.testimonials');
if (carousel) {
  carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
  carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(nextTestimonial, 4000);
  });
}


function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const statsBar = document.querySelector('.stats-bar');
let counted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
    }
  });
}, { threshold: 0.3 });

if (statsBar) observer.observe(statsBar);
