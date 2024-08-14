document.addEventListener("DOMContentLoaded", function() {
    // Function to load the resource when it becomes visible
    function loadResource(lazyElement) {
        if (lazyElement.tagName === 'IMG') {
            lazyElement.src = lazyElement.dataset.src; // Load the image
        } else if (lazyElement.tagName === 'VIDEO') {
            lazyElement.src = lazyElement.dataset.src; // Load the video
        } else {
            // For any other elements that might be lazy loaded
            lazyElement.src = lazyElement.dataset.src;
        }
        lazyElement.classList.remove('lazy'); // Remove lazy class once loaded
    }

    // Setup Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadResource(entry.target); // Load resource when it comes into view
                observer.unobserve(entry.target); // Stop observing once loaded
            }
        });
    });

    // Get all elements with the class 'lazy' and observe them
    const lazyElements = document.querySelectorAll('.lazy');
    lazyElements.forEach(element => observer.observe(element));

    // Calculate load time when the window is fully loaded
    window.addEventListener("load", function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        document.getElementById('load-time').textContent = loadTime;
    });

    // Calculate total page size by summing the size of all resources loaded
    window.addEventListener("load", function() {
        const resources = performance.getEntriesByType("resource");
        let totalSize = 0;
        resources.forEach(resource => {
            if (resource.transferSize) {  // Only include resources that have a transfer size
                totalSize += resource.transferSize;
            }
        });

        // Convert total size from bytes to kilobytes
        const totalSizeKB = (totalSize / 1024).toFixed(2);
        document.getElementById('page-size').textContent = totalSizeKB;
    });
});
