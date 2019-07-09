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
        let prev_scroll_position = t.getAttribute(attrName);
        let next_scroll_position = t.scrollTop;
        let scroll_diff = next_scroll_position - prev_scroll_position;
        let opacity = t.style.opacity;
        if (opacity == "" || opacity > 1) opacity = 1;
        opacity -= scroll_diff / 1000;
        t.style.opacity = opacity;
        t.setAttribute(attrName, t.scrollTop);
    }
}

// instantiate functions
addScrollListener();