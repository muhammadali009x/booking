
window.lazyLoadOptions = {
    elements_selector: ".lazy",
    // ... more custom settings?
};

// Listen to the initialization event and get the instance of LazyLoad
window.addEventListener('LazyLoad::Initialized', function (event) {
    window.lazyLoadInstance = event.detail.instance;
}, false);
