import React, { useState } from 'react';
const App = () => {
    const [gainValue, setGainValue] = useState(2); // Default gain value
    const boostVolume = () => {
        if (chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];
                if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('about:')) {
                    chrome.tabs.sendMessage(tab.id, { action: 'enhanceAudio', gainValue }, (response) => {
                        if (response && response.status === 'success') {
                            console.log('Volume boosted successfully');
                        }
                        else {
                            console.error('Failed to boost volume');
                        }
                    });
                }
                else {
                    console.error('Cannot access a chrome:// or about: URL');
                }
            });
        }
        else {
            console.error('Chrome tabs API is not available.');
        }
    };
    return (React.createElement("div", null,
        React.createElement("h1", null, "Volume Booster"),
        React.createElement("input", { type: "range", min: "1", max: "300", value: gainValue, onChange: (e) => setGainValue(Number(e.target.value)) }),
        React.createElement("button", { onClick: boostVolume }, "Boost Volume"),
        React.createElement("p", null,
            "Current Gain: ",
            gainValue)));
};
export default App;
//# sourceMappingURL=App.js.map