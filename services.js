function showService(id) {
  const panels = document.querySelectorAll('.service-detail');
  panels.forEach(panel => panel.style.display = 'none');

  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => item.classList.remove('active'));

  const target = document.getElementById('service-' + id);
  if (target) target.style.display = 'block';

  const clicked = event.currentTarget;
  clicked.classList.add('active');
}
