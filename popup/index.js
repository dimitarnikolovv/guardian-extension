const submitButton = document.getElementById("submitButton");

chrome.storage.sync.get(["email"], (data) => {
  if (data["email"]) {
    const email = data["email"];
    emailForm.querySelector("input").value = email;
    submitButton.innerText = "Change";
  }
});
