// Set CDN's _.js path... inject script with source into DOM's head
const cdnTag = 'https://codepen.io/elico5/pen/bGddMyK.js';
const code = `
    var s = document.createElement('script');
    s.setAttribute('src', '${cdnTag}');
    document.head.appendChild(s);
`;

// Initialization flags
const enabled = [true, './icons/enabled.png'], disabled = [false, './icons/disabled.png'];
let [flag, path] = disabled;

// Listener on icon click
chrome.browserAction.onClicked.addListener(function() {
    if (flag) {
        [flag, path] = disabled;
    } else {
        [flag, path] = enabled;
    }
    chrome.browserAction.setIcon({ path });
    console.log('hitting');
});

// Listener on tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Inject script into current tab's head
    if (flag && changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.executeScript(tabId, { code });
    }
});
