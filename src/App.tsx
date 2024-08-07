import React, { useState } from 'react';

const App: React.FC = () => {
  const [gainValue, setGainValue] = useState<number>(2); // Default gain value

  const boostVolume = () => {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('about:')) {
          chrome.tabs.sendMessage(tab.id, { action: 'enhanceAudio', gainValue }, (response) => {
            if (response && response.status === 'success') {
              console.log('Volume boosted successfully');
            } else {
              console.error('Failed to boost volume');
            }
          });
        } else {
          console.error('Cannot access a chrome:// or about: URL');
        }
      });
    } else {
      console.error('Chrome tabs API is not available.');
    }
  };

  return (
    <div>
      <h1>Volume Booster</h1>
      <input
        type="range"
        min="1"
        max="300"
        value={gainValue}
        onChange={(e) => setGainValue(Number(e.target.value))}
      />
      <button onClick={boostVolume}>Boost Volume</button>
      <p>Current Gain: {gainValue}</p>
    </div>
  );
};

export default App;
