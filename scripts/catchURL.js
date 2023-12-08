(async () => {
  let url = window.location.href;

  await chrome.storage.sync.set({
    ['isTriggered']: true,
  });

  await chrome.storage.sync.get(['email'], async (data) => {
    const email = data['email'];

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
