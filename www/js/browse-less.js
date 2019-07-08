var options = { active: true };

// send data back to chrome extension listener
function sendOptions(options){
    document.dispatchEvent(new CustomEvent('optionListener', {
        detail: JSON.stringify(options),
    }));
}

//alert('browse less installed');