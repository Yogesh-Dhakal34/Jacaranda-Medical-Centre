
let currentSlide = 0;
const totalSlides = 2;

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;

  document.querySelectorAll('.carousel-slide').forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  document.querySelectorAll('.dot-btn').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}


let activeFilter = 'all';

function setFilter(specialty, btn) {
  activeFilter = specialty.toLowerCase();

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('search-input').value = '';

  applyFilters();
}


function filterDoctors() {
  activeFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn').classList.add('active'); // reset to "All"
  applyFilters();
}


function applyFilters() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const allCards = document.querySelectorAll('.doctor-card');
  let visibleCount = 0;

  document.querySelectorAll('.carousel-slide').forEach(slide => {
    slide.style.display = 'grid';
  });

  allCards.forEach(card => {
    const name = card.getAttribute('data-name');
    const specialty = card.getAttribute('data-specialty');

    const matchesFilter = activeFilter === 'all' || specialty === activeFilter;
    const matchesSearch = query === '' || name.includes(query) || specialty.includes(query);

    if (matchesFilter && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  document.querySelectorAll('.carousel-slide').forEach((slide, i) => {
    const hasVisible = slide.querySelectorAll('.doctor-card:not(.hidden)').length > 0;
    slide.style.display = hasVisible ? 'grid' : 'none';
    slide.classList.remove('active');
  });

  const visibleSlides = document.querySelectorAll('.carousel-slide[style="display: grid;"]');
  if (visibleSlides.length > 0) {
    visibleSlides[0].classList.add('active');
  }

  document.getElementById('no-results').style.display = visibleCount === 0 ? 'block' : 'none';

  document.querySelector('.carousel-dots').style.display =
    (query === '' && activeFilter === 'all') ? 'flex' : 'none';
}
