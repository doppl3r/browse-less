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

    // listen to url event from new script
    document.addEventListener('updateURL', function (e) {
        var data = e.detail;
        console.log(data['url']);
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