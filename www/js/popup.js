(function() {
    // Initialize elements
    var togglePage = document.getElementById("togglePage");
    var toggleWebsite = document.getElementById("toggleWebsite");
    var slider = document.getElementById("scale");
    var review = document.getElementById("review");

    function init() {
        // Update popup UI
        updateToggle('href');
        updateToggle('hostname');
        updateSlider(slider);

        // Add event listeners
        addFormListeners();
        addMessageListener();
    }

    function addFormListeners() {
        // Add event listener to black list button
        togglePage.addEventListener("click", function(){ updateListByType('href'); });
        toggleWebsite.addEventListener("click", function(){ updateListByType('hostname'); });
        slider.oninput = function() { updateSlider(this, 'set'); };

        // Add event listener to review link
        review.addEventListener("click", function(){ 
            chrome.tabs.create({ url:'https://chrome.google.com/webstore/detail/browse-less/cdbbbaknlcfhdjgnhemhlpemkbnfgoam/reviews?hl=en-US' });
        });
    }

    function updateListByType(listType) {
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

                // Update UI after sending list to Chrome storage
                chrome.storage.sync.set({[listType]: list}, function(){
                    updateToggle(listType);
                    sendMessageToMain({ [listType]: list });
                });
            });
        });
    }

    function updateSlider(slider, action = 'get') {
        // Get value from settings then update UI
        if (action == 'get') {
            chrome.storage.sync.get({ 'scale': 2 }, function(result) {
                slider.value = result.scale;
                updateSlider(slider, 'set'); // Recursively sync data and update UI
            });
        }

        // Set settings value then update UI
        if (action == 'set') {
            chrome.storage.sync.set({scale: slider.value}, function() {
                var value = ((slider.value - slider.min) / (slider.max - slider.min) * 100);
                slider.style.background = 'linear-gradient(to right, rgba(72, 133, 237, 0.25) 0%, rgba(72, 133, 237, 0.25) ' + value + '%, #dddddd ' + value + '%, #dddddd 100%)';
                sendMessageToMain({ 'scale': slider.value });
            });
        }
    }

    // Set active state of toggle button from chrome storage
    function updateToggle(listType) {
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