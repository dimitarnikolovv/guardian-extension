const textarea = document.querySelector("textarea");

(async () => {
  if (textarea) {
    const text = textarea.textContent.toLowerCase();
    console.log(text);

    let email;

    const url = chrome.runtime.getURL("./db/data.json");
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let searchedWords = [];

    await chrome.storage.sync.get(["words", "email"], (data) => {
      const parsed = JSON.parse(data["words"]);
      email = data["email"];

      searchedWords.push(...parsed);
    });

    for (const word of data.words) {
      if (text.includes(word.toLowerCase())) {
        console.log("OPASNOST: ", word);

        searchedWords.push({
          search: text,
          word,
          date: new Date().toLocaleString("bg"),
        });

        await chrome.storage.sync.set({
          ["isTriggered"]: true,
        });

        if (email) {
          const emailData = {
            service_id: "contact_form_service",
            template_id: "template_w2y4tin",
            user_id: "nW3Juf-Lr59vmcQUs",
            template_params: {
              message: `Засечена опасност: ${word}, при търсене: ${text}, на ${new Date().toLocaleString(
                "bg"
              )}`,
              email,
            },
          };

          const emailRes = await fetch(
            "https://api.emailjs.com/api/v1.0/email/send",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailData),
            }
          );

          console.log(emailRes);
        }
      }
    }

    if (searchedWords.length > 0) {
      await chrome.storage.sync.set({
        ["words"]: JSON.stringify(searchedWords),
      });
    }
  }

  await chrome.storage.sync.get(["words"], (data) => {
    console.log(JSON.parse(data["words"]));
  });
})();
