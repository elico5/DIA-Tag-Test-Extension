// Initialize constants... can these be imported?
const GET_BACKGROUND_STATE = 'GET_BACKGROUND_STATE';
const GET_BACKGROUND_STATE_REQUEST = { type: GET_BACKGROUND_STATE };
const TOGGLE_ACTIVITY = 'TOGGLE_ACTIVITY';
const TOGGLE_ACTIVITY_REQUEST = { type: TOGGLE_ACTIVITY };
const JS_SOURCE_CHANGE = 'JS_SOURCE_CHANGE';

// ----- Helpers -----

// Generate message for JS_SOURCE_CHANGE
const generateMessageJS = function(jsSource) {
    return {
        type: JS_SOURCE_CHANGE,
        jsSource
    };
};
// Populate popup.html according to extension state
const updatePopup = function(backgroundState) {
    const { flag, jsSource } = backgroundState;
    document.getElementById('js-source').value = jsSource;
    document.getElementById('toggle-button').innerHTML = flag ? 'Disable Extension' : 'Enable Extension';
}

// -------------------

// Get background state for popup
const getStateFromBackground = function() {
    chrome.runtime.sendMessage(GET_BACKGROUND_STATE_REQUEST, function(response) {
        updatePopup(response);
    });
};

// Toggle extension activity
const toggleActivity = function() {
    chrome.runtime.sendMessage(TOGGLE_ACTIVITY_REQUEST, function(response) {
        updatePopup(response);
    });
};

// Alter source for JS injection
const updateInjectScript = function() {
    const JS_SOURCE_CHANGE_REQUEST = generateMessageJS(document.getElementById('js-source').innerHTML);
    chrome.runtime.sendMessage(JS_SOURCE_CHANGE_REQUEST, function(response) {
        updatePopup(response);
    });
};

// Add event listeners to popup DOM
window.addEventListener('DOMContentLoaded', getStateFromBackground);
document.getElementById('toggle-button').addEventListener('click', toggleActivity);
document.getElementById('source-button').addEventListener('click', updateInjectScript);

