const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeNavigation() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

document.querySelectorAll('[data-year], #footer-year').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

const copyButton = document.querySelector('[data-copy]');
const copyStatus = document.querySelector('.copy-status');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Copy is unavailable here. Use the email link instead.';
  }
});

