(function() {
    // Initialize elements
    var togglePage = document.getElementById("togglePage");
    var toggleWebsite = document.getElementById("toggleWebsite");
    var review = document.getElementById("review");

    function init() {
        // Update popup UI
        updateState('href');
        updateState('hostname');

        // Add event listeners
        addFormListeners();
        addMessageListener();
    }

    function addFormListeners() {
        // Add event listener to black list button
        togglePage.addEventListener("click", function(){ checkListByType('href'); });
        toggleWebsite.addEventListener("click", function(){ checkListByType('hostname'); });

        // Add event listener to review link
        review.addEventListener("click", function(){ 
            chrome.tabs.create({ url:'https://chrome.google.com/webstore/detail/browse-less/cdbbbaknlcfhdjgnhemhlpemkbnfgoam/reviews?hl=en-US' });
        });
    }

    function checkListByType(listType) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.storage.sync.get([listType], function(items) {
                var href = tabs[0].url;
                var hostname = new URL(href).hostname;
                var matchIndex = -1;
                var list = items[listType] || [];
                var target = listType == 'href' ? href : hostname;

                // Loop through each list item for matching index
                list.forEach(function(item, index) {
                    if (item == target) matchIndex = index;
                });

                // Update list if the target exists in chrome storage
                if (matchIndex >= 0) { list.splice(matchIndex, 1); }
                else { list.push(target); }

                // Upload new blacklist
                chrome.storage.sync.set({[listType]: list}, function(){
                    updateState(listType);
                    sendMessageToMain({[listType]: list});
                });
            });
        });
    }

    // Set active state of toggle button from chrome storage
    function updateState(listType) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.storage.sync.get([listType], function(items) {
                var href = tabs[0].url;
                var hostname = new URL(href).hostname;
                var state = "inactive";
                var list = items[listType] || [];
                var target = listType == 'href' ? href : hostname;
                var elem = listType == 'href' ? togglePage : toggleWebsite;

                // Loop through each list item for matching index
                list.forEach(function(item){
                    if (item == target) state = "active";
                });

                // Update html by state
                elem.checked = (state == 'active');
            });
        });
    }

    function sendMessageToMain(message) {
        // Send message { key: value } from popup.js to main.js
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                console.log(response);
            });
        });
    }

    function addMessageListener() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log(request);
                sendResponse({ success: request });
            }
        );
    }

    // Initialize application
    init();
})();