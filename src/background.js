"use strict";
chrome.runtime.onInstalled.addListener(() => {
    console.log('Volume Booster extension installed.');
});
chrome.action.onClicked.addListener((tab) => {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('about:')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        }, () => {
            if (chrome.runtime.lastError) {
                console.error(`Failed to inject content script: ${chrome.runtime.lastError.message}`);
            }
            else {
                console.log('Content script injected successfully.');
            }
        });
    }
    else {
        console.error('Cannot access a chrome:// or about: URL');
    }
});
//# sourceMappingURL=background.js.map