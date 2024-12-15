document.addEventListener('DOMContentLoaded', () => {
    // Initialize skill sliders
    const skillSliders = document.querySelectorAll('.skill-slider');

    skillSliders.forEach(slider => {
        // Update progress bar when slider value changes
        slider.addEventListener('input', function () {
            const progressBar = this.nextElementSibling;
            progressBar.style.width = `${this.value}%`;
        });

        // Save state after change
        slider.addEventListener('change', function () {
            if (window.saveState) {
                window.saveState();
            }
        });
    });
}); 