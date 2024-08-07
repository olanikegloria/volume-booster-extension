"use strict";
const enhanceAudio = (gainValue) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        console.error('AudioContext is not supported in this browser.');
        return;
    }
    const audioContext = new AudioContext();
    const mediaElements = document.querySelectorAll('video, audio');
    if (mediaElements.length === 0) {
        console.error('No audio or video elements found on the page.');
        return;
    }
    mediaElements.forEach((mediaElement) => {
        if (!mediaElement.dataset.connected) {
            const source = audioContext.createMediaElementSource(mediaElement);
            const gainNode = audioContext.createGain();
            gainNode.gain.value = gainValue / 10; // Normalize the gain value (1 to 100) to 0.1 to 10
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            mediaElement.dataset.connected = 'true'; // Mark the media element as connected
            console.log(`Audio enhanced successfully with gain value: ${gainValue}`);
        }
    });
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Content script received message:', request);
    if (request.action === 'enhanceAudio') {
        enhanceAudio(request.gainValue);
        sendResponse({ status: 'success' });
    }
});
console.log('Content script loaded.');
//# sourceMappingURL=content.js.map