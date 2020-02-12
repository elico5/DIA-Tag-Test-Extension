const GET_BACKGROUND_STATE = 'GET_BACKGROUND_STATE';
const TOGGLE_ACTIVITY = 'TOGGLE_ACTIVITY';
const JS_SOURCE_CHANGE = 'JS_SOURCE_CHANGE';
const CHANGE_BACKGROUND_STATE = 'CHANGE_BACKGROUND_STATE';
const CHANGE_BACKGROUND_STATE_REQUEST = { type: CHANGE_BACKGROUND_STATE };
const enabledState = [true, '../ui/icons/enabled.png'];
const disabledState = [false, '../ui/icons/disabled.png'];

// Initialization flags, set jsInject path to CDN source
let jsSource = '';
let [flag, path] = disabledState;

// Helper... respond with background state
const respond = function(sendResponse) {
    sendResponse({ flag, jsSource });
};
// Background communication endpoints
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == GET_BACKGROUND_STATE) {
        respond(sendResponse);
    } else if (request.type == TOGGLE_ACTIVITY) {
        [flag, path] = flag ? disabledState : enabledState;
        chrome.browserAction.setIcon({ path });
        respond(sendResponse);
    } else if (request.type == JS_SOURCE_CHANGE) {
        jsSource = request.jsSource;
        respond(sendResponse);
    }
});

// Listener on tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Inject script into active tab's DOM (into head?)
    if (flag && changeInfo.status == 'complete' && tab.active) {
        const code = `
            const s = document.createElement('script');
            s.setAttribute('src', '${jsSource}');
            document.head.appendChild(s);
        `;
        chrome.tabs.executeScript(tabId, { code });
    }
});

// // Listener on icon click
// chrome.browserAction.onClicked.addListener(function() {
//     if (flag) {
//         [flag, path] = disabled;
//     } else {
//         [flag, path] = enabled;
//     }
//     chrome.browserAction.setIcon({ path });
//     console.log('hitting');
// });