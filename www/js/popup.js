// initialize elements
let instructions = document.getElementById("instructions");
let stateToggle = document.getElementById("stateToggle");
let review = document.getElementById("review");

function addFormListeners(){
    // add event listener to black list button
    stateToggle.addEventListener("click", function(){ 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.storage.sync.get(['blacklist'], function(result) {
                let hostname = new URL(tabs[0].url).hostname;
                let matchIndex = -1;
                let list = result['blacklist'] || [];
                list.forEach(function(item, index) {
                    if (item == hostname) matchIndex = index;
                });
                // update list if the hostname exists in chrome storage
                if (matchIndex >= 0) {
                    list.splice(matchIndex, 1);
                }
                else {
                    list.push(hostname);
                }
                // upload new blacklist
                chrome.storage.sync.set({'blacklist': list}, function(){
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                    updateState();
                });
            });
        });
    });

    // add event listener to review link
    review.addEventListener("click", function(){ 
        chrome.tabs.create({ url:'https://chrome.google.com' });
    });
}

// set active state of toggle button from chrome storage
function updateState(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.sync.get(['blacklist'], function(result) {
            let hostname = new URL(tabs[0].url).hostname;
            let state = "disabled";
            let list = result['blacklist'] || [];
            list.forEach(function(item){
                if (item == hostname) state = "enabled";
            });
            // update html by state
            if (state == "enabled"){
                stateToggle.innerHTML = "Disable";
                instructions.innerHTML = 'Select <em>Disable</em> to scroll more on this website.';
                stateToggle.setAttribute('data-state', 'enabled');
            }
            else if (state == "disabled") {
                stateToggle.innerHTML = "Enable";
                instructions.innerHTML = 'Select <em>Enable</em> to scroll less on this website.';
                stateToggle.setAttribute('data-state', 'disabled');
            }
        });
    });
    
}

// instantiate functions
addFormListeners();
updateState();