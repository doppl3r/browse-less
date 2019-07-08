var s = document.createElement('script');
s.src = chrome.extension.getURL('/www/js/script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() { s.remove(); };

// listen for data being sent from page script
document.addEventListener('yourCustomEvent', function (e) {
    var data = JSON.parse(e.detail);
    console.log('received', data);
});