// get chrome storage state
function init(){
    // append script if chrome storage state is active
    chrome.storage.sync.get(['blacklist'], function(result) {
        let hostname = new URL(location.href).hostname;
        let state = "enabled";
        let list = result['blacklist'] || [];
        list.forEach(function(item){
            if (item == hostname) state = "disabled";
        });
        if (state == "enabled"){
            // instantiate functions
            appendScript();
        }
    });
}

// append browse-less.js to the current page
function appendScript(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/www/js/browse-less.js');
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() { s.remove(); };
}

// initialize application
init();