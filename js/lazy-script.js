document.addEventListener("DOMContentLoaded", function() {
    function loadResource(lazyElement) {
        if (lazyElement.tagName === 'IMG') {
            lazyElement.src = lazyElement.dataset.src;
            lazyElement.onload = () => {
                lazyElement.classList.add('loaded');
            };
            lazyElement.onerror = () => {
                lazyElement.classList.add('error');
            };
        } else if (lazyElement.tagName === 'VIDEO') {
            lazyElement.src = lazyElement.dataset.src;
            lazyElement.load();  // Trigger video to start loading
            lazyElement.onloadeddata = () => {
                lazyElement.classList.add('loaded');
            };
            lazyElement.onerror = () => {
                lazyElement.classList.add('error');
            };
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
        rootMargin: '0px 0px 50px 0px', // Load slightly before entering the viewport
        threshold: 0.1
    });

    document.querySelectorAll('.lazy').forEach(element => observer.observe(element));
});
