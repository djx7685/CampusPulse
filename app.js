const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('.save-button, .market-item button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('saved');
    const saved = button.classList.contains('saved');
    button.textContent = saved ? '♥' : '♡';
    showToast(saved ? 'Saved to your space' : 'Removed from saved');
  });
});

document.querySelector('#join-study').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.innerHTML = 'Joined <span>✓</span>';
  button.disabled = true;
  showToast('You’re in! The study circle details are saved.');
});

const dialog = document.querySelector('#create-dialog');
document.querySelector('#create-button').addEventListener('click', () => dialog.showModal());
dialog.querySelectorAll('[data-kind]').forEach((button) => {
  button.addEventListener('click', () => showToast(`${button.dataset.kind} creation will be available when you sign in.`));
});

document.querySelector('#search-toggle').addEventListener('click', () => {
  const query = window.prompt('Search campus events, clubs, study groups, and listings');
  if (!query) return;
  const matches = [...document.querySelectorAll('.event-card, .club-row, .study-panel, .market-item')]
    .filter((item) => item.textContent.toLowerCase().includes(query.toLowerCase()));
  document.querySelectorAll('.event-card, .club-row, .study-panel, .market-item').forEach((item) => {
    item.classList.toggle('search-dim', matches.length > 0 && !matches.includes(item));
  });
  showToast(matches.length ? `${matches.length} campus result${matches.length === 1 ? '' : 's'} found` : 'No matching campus posts yet');
});

document.querySelector('#load-events').addEventListener('click', () => showToast('You’re all caught up on this week’s featured events.'));
