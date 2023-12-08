let email = '';
const emailForm = document.getElementById('emailForm');
const submitButton = document.getElementById('submitButton');

await chrome.storage.sync.get(['email'], (data) => {
  if (data['email']) {
    email = data['email'];
    emailForm.querySelector('input').value = email;
    submitButton.innerText = 'Change';
  }
});

// Immediately persist options changes
emailForm.addEventListener('submit', async (event) => {
  email = event.target.value;
  await chrome.storage.sync.set({ ['email']: email });
});
