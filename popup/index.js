chrome.storage.sync.get(["isTriggered"], (data) => {
  const isTriggered = data["isTriggered"] ? data["isTriggered"] : false;

  console.log("isTriggered", isTriggered);
});
