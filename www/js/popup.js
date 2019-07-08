// add event listener to toggle button
function addToggleListener(){
    document.getElementById("id-browse-less").addEventListener("click", function(e){
        var state = e.target.checked;
        chrome.storage.sync.set({ "active": state });
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
addToggleListener();
setToggleState();