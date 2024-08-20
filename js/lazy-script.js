document.addEventListener("DOMContentLoaded", function() {
    function loadResource(lazyElement) {
        if (lazyElement.tagName === 'IMG' || lazyElement.tagName === 'VIDEO') {
            lazyElement.src = lazyElement.dataset.src;
            lazyElement.classList.add('loaded');
        }
        lazyElement.classList.remove('lazy');
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadResource(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px', // Trigger loading slightly before the element comes into view
        threshold: 0.1 // Load when 10% of the element is visible
    });

    const lazyElements = document.querySelectorAll('.lazy');
    lazyElements.forEach(element => observer.observe(element));
});
