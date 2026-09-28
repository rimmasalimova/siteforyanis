const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const reviewDialog = document.querySelector('.review-dialog');
document.querySelectorAll('[data-review]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    reviewDialog.querySelector('img').src = link.href;
    reviewDialog.querySelector('img').alt = link.querySelector('img').alt;
    reviewDialog.querySelector('#review-title').textContent = link.dataset.review;
    reviewDialog.querySelector('.original-link').href = link.href;
    reviewDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
reviewDialog.querySelector('.dialog-close').addEventListener('click', () => reviewDialog.close());
reviewDialog.addEventListener('click', event => {
  const rect = reviewDialog.getBoundingClientRect();
  if (event.target === reviewDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) reviewDialog.close();
});
reviewDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
