// get chrome storage state
function init(){
    // append script if chrome storage state is active
    chrome.storage.sync.get(['active'], function(result) {
        let state = result['active'];
        if (state == true || state == null){
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

init();