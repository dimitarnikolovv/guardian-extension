const exportForm = document.getElementById('exportHistory');

exportForm.addEventListener('submit', async (event) => {
  chrome.storage.sync.get(['sites', 'words'], (data) => {
    const sites = data['sites'] ? JSON.parse(data['sites']) : [];
    const words = data['words'] ? JSON.parse(data['words']) : [];

    const a = document.createElement('a');
    let file = new Blob(['Посетени потенциално опасни сайтове: \n\n'], { type: 'text/plain' });

    for (const site of sites) {
      file = new Blob([file, `Сайт: ${site.site} на дата: ${site.date} \n`], {
        type: 'text/plain',
      });
    }

    file = new Blob([file, '\n\nПотенциално опасни търсения: \n\n'], { type: 'text/plain' });

    for (const word of words) {
      file = new Blob(
        [
          file,
          `Търсене: "${word.search}" засечено заради дума: "${word.word}" на дата: ${word.date} \n`,
        ],
        {
          type: 'text/plain',
        }
      );
    }

    a.href = URL.createObjectURL(file);
    a.download = 'history.txt';
    a.click();
  });
});
