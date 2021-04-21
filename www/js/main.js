// Get chrome storage state
function init(){
    // Append script if chrome storage state is active
    chrome.storage.sync.get(null, function(items) {
        var href = window.location.href;
        var hostname = new URL(href).hostname;
        var state = "inactive";
        var listHref = items['href'] || [];
        var listHostname = items['hostname'] || [];

        // Loop through each href list item for matching string
        listHref.forEach(function(item){ if (item == href) state = "active"; });
        listHostname.forEach(function(item){ if (item == hostname) state = "active"; });

        // Add script if any match exists
        if (state == "active"){ appendScript(); }
    });
}

// Append browse-less.js to the current page
function appendScript(){
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('/www/js/browse-less.js');
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() { s.remove(); };
}

// Initialize application
init();