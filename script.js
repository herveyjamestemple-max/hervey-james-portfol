const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const progress = document.querySelector('.scroll-progress');
const cursorLight = document.querySelector('.cursor-light');
const heroVisual = document.querySelector('.hero-visual');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function closeMenu() {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${amount * 100}%`;
  const current = sections.reduce((active, section) => {
    return window.scrollY + 180 >= section.offsetTop ? section.id : active;
  }, 'top');
  navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

if (!reduceMotion.matches) {
  window.addEventListener('pointermove', event => {
    cursorLight.style.transform = `translate(${event.clientX - 210}px, ${event.clientY - 210}px)`;
    if (!heroVisual) return;
    const x = (event.clientX / window.innerWidth - .5) * 12;
    const y = (event.clientY / window.innerHeight - .5) * 12;
    heroVisual.style.setProperty('--pointer-x', `${x}px`);
    heroVisual.style.setProperty('--pointer-y', `${y}px`);
  }, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const interestData = {
  web: { index: '1', visual: 'graphic-web', title: 'Making the browser<br>feel like a place.', text: 'I enjoy the mix of structure, visual detail, and interaction that comes with building for the web. HTML, CSS, and JavaScript are a practical way to turn a thought into something other people can use.', tags: ['HTML', 'CSS', 'JavaScript'] },
  systems: { index: '2', visual: 'graphic-system', title: 'Getting closer to<br>the operating system.', text: 'Linux and computer systems make technology feel less like a sealed box. I am interested in understanding the layers beneath the interface and learning by trying things for myself.', tags: ['Linux', 'Systems', 'Command line'] },
  security: { index: '3', visual: 'graphic-security', title: 'Asking how things<br>can be understood.', text: 'Cybersecurity and pentesting concepts interest me because they reward careful thinking. I am exploring the ideas and vocabulary, with a focus on learning responsibly.', tags: ['Security concepts', 'Pentesting', 'Curiosity'] },
  hardware: { index: '4', visual: 'graphic-hardware', title: 'The physical side<br>of the machine.', text: 'Computer hardware and software are connected in ways that are easy to overlook. I like learning what is inside a system and how those parts work together.', tags: ['Hardware', 'Software', 'Systems'] },
  games: { index: '5', visual: 'graphic-games', title: 'Small experiments<br>with a sense of play.', text: 'Basic game development is another way to practice logic, interaction, and feedback. Pygame gives me a direct, approachable place to experiment.', tags: ['Pygame', 'Python', 'Experimenting'] }
};
const interestPanel = document.querySelector('.interest-panel');
const interestTabs = document.querySelectorAll('.interest-tab');
function updateInterest(key) {
  const item = interestData[key];
  const graphic = interestPanel.querySelector('.panel-graphic');
  graphic.className = `panel-graphic ${item.visual}`;
  graphic.innerHTML = `<span>${key === 'web' ? '&lt;/&gt;' : key === 'systems' ? '>_' : key === 'security' ? '[]' : key === 'hardware' ? 'HW' : '++'}</span><i></i><i></i><i></i>`;
  interestPanel.querySelector('h3').innerHTML = item.title;
  interestPanel.querySelector('p').textContent = item.text;
  interestPanel.querySelector('.panel-tags').innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
}
interestTabs.forEach(tab => tab.addEventListener('click', () => {
  interestTabs.forEach(other => {
    const selected = other === tab;
    other.classList.toggle('is-selected', selected);
    other.setAttribute('aria-selected', String(selected));
  });
  updateInterest(tab.dataset.interest);
}));

const filterButtons = document.querySelectorAll('.filter-button');
const skillItems = document.querySelectorAll('.skill-item');
const skillNote = document.querySelector('.skill-note');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(other => other.classList.toggle('is-active', other === button));
  const filter = button.dataset.filter;
  skillItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && !item.dataset.category.split(' ').includes(filter)));
  skillNote.textContent = 'Select a technology to see a little more.';
  skillItems.forEach(item => item.classList.remove('is-selected'));
}));
skillItems.forEach(item => item.addEventListener('click', () => {
  skillItems.forEach(other => other.classList.remove('is-selected'));
  item.classList.add('is-selected');
  skillNote.textContent = item.dataset.note;
}));

const projectToggle = document.querySelector('.project-toggle');
const projectNote = document.querySelector('.project-note');
projectToggle?.addEventListener('click', () => {
  const isOpen = projectToggle.getAttribute('aria-expanded') === 'true';
  projectToggle.setAttribute('aria-expanded', String(!isOpen));
  projectToggle.querySelector('span').textContent = isOpen ? '+' : '-';
  projectNote.hidden = isOpen;
});

document.getElementById('footer-year').textContent = new Date().getFullYear();
