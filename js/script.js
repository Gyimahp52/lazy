// Function to load lazy images and videos when they come into view
document.addEventListener("DOMContentLoaded", function() {
    const lazyElements = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyElement = entry.target;
                if (lazyElement.tagName === 'IMG') {
                    lazyElement.src = lazyElement.dataset.src; // Load the image
                } else if (lazyElement.tagName === 'VIDEO') {
                    lazyElement.src = lazyElement.dataset.src; // Load the video
                }
                lazyElement.classList.remove('lazy');
                observer.unobserve(lazyElement); // Stop observing once loaded
            }
        });
    });

    lazyElements.forEach(element => observer.observe(element));

    // Simulate loading performance metrics for lazy loading
    const data = {
        loadTime: 800, // Simulated load time in milliseconds (faster due to lazy loading)
        pageSize: 5000 // Simulated page size in KB (same size, but perceived load time improved)
    };
    document.getElementById('load-time').textContent = data.loadTime;
    document.getElementById('page-size').textContent = data.pageSize;
});
