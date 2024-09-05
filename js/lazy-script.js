document.addEventListener("DOMContentLoaded", function() {
    // Calculate load time when the window is fully loaded
    window.addEventListener("load", function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        document.getElementById('load-time').textContent = loadTime;
    });

    // Calculate total page size by summing the size of all resources loaded
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
