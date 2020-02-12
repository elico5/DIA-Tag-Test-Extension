const GET_BACKGROUND_STATE = 'GET_BACKGROUND_STATE';
const GET_BACKGROUND_STATE_REQUEST = { type: GET_BACKGROUND_STATE };

const execute = function(backgroundState) {
    const { flag, jsSource } = backgroundState;
    if (flag && jsSource) {
        injectJS(jsSource);
    }
};

// Inject JS helper
const injectJS = function(jsSource) {
    const s = document.createElement('script');
    s.setAttribute('src', jsSource);
    document.head.appendChild(s);
};

// Execute with extension state
chrome.runtime.sendMessage(GET_BACKGROUND_STATE_REQUEST, function(response) {
    execute(response);
});