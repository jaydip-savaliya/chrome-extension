chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
    console.log("Extension button clicked!", tab);
});
