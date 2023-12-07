chrome.storage.sync.get(["isTriggered"], (data) => {
  const isTriggered = data["isTriggered"] ? data["isTriggered"] : false;

  console.log("test", isTriggered);

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
