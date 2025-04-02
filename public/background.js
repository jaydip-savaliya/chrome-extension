chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("index.html"),
            type: "popup",
            width: 400,
            height: 500,
            top: 100,
            left: 100
        });
    }
});
