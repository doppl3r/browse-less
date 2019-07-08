// append browse-less.js to the current page
function appendScript(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/www/js/browse-less.js');
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() { s.remove(); };
}

// listen for data being sent from browse-less.js
function addOptionListener(){
    document.addEventListener('optionListener', function (e) {
        var data = JSON.parse(e.detail);
        console.log('received', data);
    });
}

// instantiate functions
appendScript();
addOptionListener();