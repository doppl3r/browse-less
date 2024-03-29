(function() {
    // Define local variables
    var listHref = [];
    var listHostname = [];
    var scrollScale = 5; // Default

    function init() {
        // Update data from Chrome Storage
        updateDataFromChrome();

        // Add listeners
        addScrollListener();
        addMessageListener();
    }

    function updateDataFromChrome() {
        chrome.storage.sync.get(null, function(items) {
            listHref = items['href'] || [];
            listHostname = items['hostname'] || [];
            scrollScale = items['scale'] || scrollScale;
        });
    }

    function isBlacklisted() {
        var href = window.location.href
        var hostname = new URL(href).hostname;
        var blacklisted_page = 0;
        var blacklisted_host = 0;

        // Loop through each href list item for matching string
        listHref.forEach(function(item){ if (item == href) blacklisted_page = 1; });
        listHostname.forEach(function(item){ if (item == hostname) blacklisted_host = 1; });
        
        // Add script if one match exists. Return false if 2 matches exist (aka "whitelist page")
        return blacklisted_page + blacklisted_host == 1;
    }

    function addScrollListener() {
        // Add scroll listener to document
        document.addEventListener('scroll', checkScroll, true);
    }

    function checkScroll(e, t) { // e = event, t = target
        // Check all scrollable elements within the document
        t = (t == undefined) ? e.target : t;
        if (t.scrollTop == undefined){
            t.childNodes.forEach(function(child){
                // Use recursion to find scrollable child
                checkScroll(e, child);
            });
        }
        else {
            let attrName = "data-scroll-top";
            let prevScrollPosition = t.getAttribute(attrName);
            let nextScrollPosition = t.scrollTop;
            let scrollDiff = nextScrollPosition - prevScrollPosition;
            let opacity = t.style.opacity;
            if (opacity == "" || opacity > 1) opacity = 1;
            opacity -= scrollDiff / (t.clientHeight * scrollScale);
            if (isBlacklisted() == false) opacity = 1; // Reset opacity if not blacklisted
            t.style.opacity = opacity;
            t.setAttribute(attrName, t.scrollTop); // Update scroll position attribute
        }
    }

    function sendMessageToPopup(message) {
        // Send message { key: value } from main.js to popup.js
        chrome.runtime.sendMessage(message, function(response) {
            console.log('Browse Less', response);
        });
    }

    function addMessageListener() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log('Browse Less', request);
                updateDataFromChrome(); // Update data when popup is updated
                sendResponse({ success: request });
            }
        );
    }

    // Initialize application
    init();
})();