export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  console.log("manifest", browser.runtime.getManifest());
  // chrome.action.enable();
  chrome.action.onClicked.addListener(() => {
    // alert("clicked");
    chrome.tabs.create({
      url: "options.html",
    });
  });
});
