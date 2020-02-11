// Set CDN's _.js path... inject script with source into DOM's head
const cdnTag = 'https://codepen.io/elico5/pen/bGddMyK.js';
const code = `
    var s = document.createElement('script');
    s.setAttribute('src', '${cdnTag}');
    document.head.appendChild(s);
`;

// Listener on extension icon
chrome.browserAction.onClicked.addListener(function(tab) {
    // Execute code in current tab's context
    chrome.tabs.executeScript(tab.id, { code });
});