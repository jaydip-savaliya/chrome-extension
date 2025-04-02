chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension Installed");
});

let popupWindowId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
        if (popupWindowId) {
            chrome.windows.get(popupWindowId, (window) => {
                if (chrome.runtime.lastError || !window) {
                    createPopup();
                } else {
                    chrome.windows.update(popupWindowId, { focused: true });
                }
            });
        } else {
            createPopup();
        }
    }
});

function createPopup() {
    chrome.windows.create(
        {
            url: chrome.runtime.getURL("index.html"),
            type: "popup",
            width: 400,
            height: 600,
            top: 100,
            left: 100
        },
        (newWindow) => {
            popupWindowId = newWindow.id;
        }
    );
}

chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === popupWindowId) {
        popupWindowId = null;
    }
});

