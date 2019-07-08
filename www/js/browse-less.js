let options = { active: true };
let prev_scroll_position = window.scrollY;
let ticking = false;

// send data back to chrome extension listener
function sendOptions(options){
    document.dispatchEvent(new CustomEvent('optionListener', {
        detail: JSON.stringify(options),
    }));
}

// add scroll listener
function addScrollListener(){
    document.addEventListener('scroll', function(e){
        let next_scroll_position = window.scrollY;
        let scroll_diff = next_scroll_position - prev_scroll_position;
        let opacity = document.body.style.opacity;
        if (opacity == "" || opacity > 1) opacity = 1;
        prev_scroll_position = next_scroll_position;
        opacity -= scroll_diff / 1000;
        document.body.style.opacity = opacity;
    });
}



// instantiate functions
addScrollListener();

//alert('browse less installed');