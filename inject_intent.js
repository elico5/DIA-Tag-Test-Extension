// Set CDN's _.js path... inject script with source into DOM's head
const cdnTag = 'https://codepen.io/elico5/pen/bGddMyK.js';
const code = `
    var s = document.createElement('script');
    s.setAttribute('src', '${cdnTag}');
    document.head.appendChild(s);
`;

// Initialization flags
const enabled = [true, {color: "green"}], disabled = [false, {color: "red"}];
let [on, color] = disabled;

// Listener on icon click
chrome.browserAction.onClicked.addListener(function(tab) {
    if (on) {
        [on, color] = disabled;
    } else {
        [on, color] = enabled;
    }
    chrome.browserAction.setBadgeBackgroundColor(color);
    console.log(color);
});

// Listener on tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Inject script into current tab's head
    if (on && changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.executeScript(tabId, { code });
    }
});
