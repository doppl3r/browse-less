var data = {
    any: 'JSON-ifiable data',
    meaning: 'no DOM elements or classes/functions',
};

// send data back to chrome extension listener
document.dispatchEvent(new CustomEvent('yourCustomEvent', {
    detail: JSON.stringify(data),
}));

//alert('test3');