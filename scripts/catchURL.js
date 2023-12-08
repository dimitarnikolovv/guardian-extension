(async () => {
  let url = window.location.href;

  console.log(url);

  await chrome.storage.sync.set({
    ['isTriggered']: true,
  });

  await chrome.storage.sync.get(['email', 'sites'], async (data) => {
    const email = data['email'];

    const sites = data['sites'] ? JSON.parse(data['sites']) : [];

    sites.push({ site: url, date: new Date().toLocaleString('bg') });

    console.log(sites);

    if (sites.length > 0) {
      await chrome.storage.sync.set({
        ['sites']: JSON.stringify(sites),
      });
    }

    if (!email) return;

    const emailData = {
      service_id: 'contact_form_service',
      template_id: 'template_w2y4tin',
      user_id: 'nW3Juf-Lr59vmcQUs',
      template_params: {
        message: `Потенциално опасно търсене е засечено: ${url} , на ${new Date().toLocaleString(
          'bg'
        )}`,
        email,
      },
    };

    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    console.log(emailRes);
  });
})();
