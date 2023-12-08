chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "isTriggered" && newValue == true) {
      chrome.action.setBadgeText({
        text: "DANGER",
      });
      chrome.action.setBadgeBackgroundColor({
        color: "red",
      });
    }
  }
});

chrome.storage.sync.get(["isTriggered"], (data) => {
  const isTriggered = data["isTriggered"] ? data["isTriggered"] : false;

  // Next state will always be the opposite
  const nextState = isTriggered ? "DANGER" : "SAFE";

  // Set the action badge to the next state
  chrome.action.setBadgeText({
    text: nextState,
  });

  chrome.action.setBadgeBackgroundColor({
    color: isTriggered ? "red" : "green",
  });
});
