// add form event listeners
function addFormListeners(){
    // add event listener to toggle button
    document.getElementById("id-browse-less").addEventListener("click", function(e){
        var state = e.target.checked;
        chrome.storage.sync.set({ "active": state });
    });

    // add event listener to review link
    document.getElementById("id-review").addEventListener("click", function(){ 
        chrome.tabs.create({ url:'https://chrome.google.com' });
    });

    // add event listener to refresh button
    document.getElementById("id-refresh").addEventListener("click", function(){ 
        // refresh current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    });
}

// set active state of toggle button from chrome storage
function setToggleState(){
    chrome.storage.sync.get(['active'], function(result) {
        let state = result['active'];
        // set storage state to true if undefined
        if (state == undefined){
            state = true;
            chrome.storage.sync.set({ "active": true });
        }
        document.getElementById("id-browse-less").checked = state;
    });
}

// instantiate functions
addFormListeners();
setToggleState();