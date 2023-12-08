const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', async (event) => {
  const email = event.target.querySelector('input').value;
  await chrome.storage.sync.set({ ['email']: email });
});
