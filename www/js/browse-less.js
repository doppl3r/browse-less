// send data back to chrome extension listener
function sendOptions(options){
    document.dispatchEvent(new CustomEvent('optionListener', {
        detail: JSON.stringify(options),
    }));
}

// add scroll listener
function addScrollListener(){
    document.addEventListener('scroll', checkScroll, true);
}

// check all scrollable elements within the document
function checkScroll(e, t){ // e = event, t = target
    t = (t == undefined) ? e.target : t;
    if (t.scrollTop == undefined){
        t.childNodes.forEach(function(child){
            // use recursion to find scrollable child
            checkScroll(e, child);
        });
    }
    else {
        let attrName = "data-scroll-top";
        let prevScrollPosition = t.getAttribute(attrName);
        let nextScrollPosition = t.scrollTop;
        let scrollDiff = nextScrollPosition - prevScrollPosition;
        let scrollScale = 1; // 1 = clientHeight
        let opacity = t.style.opacity;
        if (opacity == "" || opacity > 1) opacity = 1;
        opacity -= scrollDiff / (t.clientHeight * scrollScale);
        t.style.opacity = opacity;
        t.setAttribute(attrName, t.scrollTop); // update scroll position attribute
    }
}

// instantiate functions
addScrollListener();
sendURL();