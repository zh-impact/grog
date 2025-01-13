export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  console.log("manifest", browser.runtime.getManifest());

  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
      index: tab.index + 1,
      url: "main.html",
    });
  });
});
