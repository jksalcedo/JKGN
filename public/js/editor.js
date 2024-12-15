document.addEventListener('DOMContentLoaded', () => {
    const templateContainer = document.querySelector('.resume-container');
    const profileImage = document.getElementById('profile-image-upload');

    // Initialize buttons
    const pdfBtn = document.getElementById('pdfBtn');
    const imageBtn = document.getElementById('imageBtn');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const colorBtn = document.getElementById('colorBtn');
    const editorTools = document.querySelector('.editor-tools');

    // Create template switcher
    const templateBtn = document.createElement('button');
    templateBtn.id = 'templateBtn';
    templateBtn.className = 'toolbar-btn primary';
    templateBtn.innerHTML = '<i class="fas fa-file-alt"></i> Templates';
    templateBtn.title = 'Switch Template';

    // Insert template button at the start of the toolbar
    editorTools.insertBefore(templateBtn, editorTools.firstChild);

    // Add divider after template button
    const divider = document.createElement('div');
    divider.className = 'toolbar-divider';
    editorTools.insertBefore(divider, templateBtn.nextSibling);

    // Create template menu with dark theme
    const templateMenu = document.createElement('div');
    templateMenu.className = 'template-menu';
    const templates = [
        { id: 1, name: 'Classic Professional' },
        { id: 2, name: 'Modern Minimal' },
        { id: 3, name: 'Creative Design' },
        { id: 4, name: 'Corporate Elite' },
        { id: 5, name: 'Elegant Wave' },
        { id: 6, name: 'Tech Savvy' },
        { id: 7, name: 'Scrapbook Style' },
        { id: 8, name: 'Dark Wave' }
    ];

    templateMenu.innerHTML = templates.map(template =>
        `<div class="template-option" data-template="${template.id}">
            <i class="fas fa-file-alt"></i>
            <span>Template ${template.id}</span>
            <small>${template.name}</small>
        </div>`
    ).join('');
    document.body.appendChild(templateMenu);

    // Template switcher functionality
    let templateMenuVisible = false;
    templateBtn.addEventListener('click', (e) => {
        templateMenuVisible = !templateMenuVisible;
        if (templateMenuVisible) {
            const rect = templateBtn.getBoundingClientRect();
            templateMenu.style.top = `${rect.bottom + 5}px`;
            templateMenu.style.left = `${rect.left}px`;
            templateMenu.classList.add('active');
        } else {
            templateMenu.classList.remove('active');
        }
    });

    templateMenu.addEventListener('click', async (e) => {
        const templateOption = e.target.closest('.template-option');
        if (templateOption) {
            const templateId = templateOption.dataset.template;
            try {
                const response = await fetch(`/switch-template/${templateId}`);
                if (response.ok) {
                    const html = await response.text();
                    templateContainer.innerHTML = html;
                    saveState();
                    templateMenu.classList.remove('active');
                    templateMenuVisible = false;
                }
            } catch (error) {
                console.error('Error switching template:', error);
                alert('Failed to switch template. Please try again.');
            }
        }
    });

    // Close template menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!templateMenu.contains(e.target) && e.target !== templateBtn) {
            templateMenu.classList.remove('active');
            templateMenuVisible = false;
        }
    });

    // Create color picker
    const colorPicker = document.createElement('div');
    colorPicker.className = 'color-picker';
    const colors = [
        // Warm Colors
        '#C4977C', // Original brown
        '#E6B89C', // Light peach
        '#FF9B71', // Coral
        '#E87461', // Terracotta
        '#D64933', // Red orange

        // Cool Colors
        '#003366', // Navy blue
        '#4F86C6', // Steel blue
        '#2D93AD', // Teal
        '#48A9A6', // Turquoise
        '#4ECDC4', // Mint

        // Earth Tones
        '#8B6B4F', // Dark brown
        '#7E6551', // Coffee
        '#9B7E46', // Bronze
        '#A67B5B', // Caramel
        '#B4654A', // Rust

        // Modern Colors
        '#2C3E50', // Dark blue gray
        '#34495E', // Blue gray
        '#16A085', // Green
        '#27AE60', // Emerald
        '#8E44AD'  // Purple
    ];

    colorPicker.innerHTML = colors.map(color =>
        `<div class="color-option" style="background-color: ${color}" data-color="${color}"></div>`
    ).join('');
    document.body.appendChild(colorPicker);

    // History for undo/redo
    let history = [];
    let currentStep = -1;

    function saveState() {
        const state = templateContainer.innerHTML;
        currentStep++;
        history = history.slice(0, currentStep);
        history.push(state);
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        undoBtn.disabled = currentStep <= 0;
        redoBtn.disabled = currentStep >= history.length - 1;
    }
    // Color picker functionality
    function updateThemeColor(color) {
        const container = document.querySelector('.resume-container');

        // Update all headings
        container.querySelectorAll('h1, h2, h3').forEach(el => {
            el.style.color = color;
        });

        // Update all progress bars and dividers
        container.querySelectorAll('.progress-bar, .blue-divider, .section-title').forEach(el => {
            el.style.backgroundColor = color;
        });

        // Update borders for images and decorative elements
        container.querySelectorAll('.profile-image, .profile-image-container, .photo-frame, .title-badge, .skill-circle, .education-circle').forEach(el => {
            el.style.borderColor = color;
        });

        // Update text colors for other elements
        container.querySelectorAll('.year, .company, .company-period, .contact-info i, .skill-circle, .expertise-section li:before').forEach(el => {
            el.style.color = color;
        });

        // Update filled boxes
        container.querySelectorAll('.skill-box.filled').forEach(el => {
            el.style.backgroundColor = color;
        });

        // Update skill boxes border
        container.querySelectorAll('.skill-box').forEach(el => {
            el.style.borderColor = color;
        });

        // Update slider styles
        const sliderStyle = document.createElement('style');
        sliderStyle.textContent = `
            .skill-slider::-webkit-slider-thumb {
                border-color: ${color} !important;
                background-color: ${color} !important;
            }
            .skill-slider::-moz-range-thumb {
                border-color: ${color} !important;
                background-color: ${color} !important;
            }
        `;
        document.head.appendChild(sliderStyle);

        saveState();
    }

    let colorPickerVisible = false;
    colorBtn.addEventListener('click', (e) => {
        if (!editMode) return;

        colorPickerVisible = !colorPickerVisible;
        if (colorPickerVisible) {
            const rect = colorBtn.getBoundingClientRect();
            colorPicker.style.top = `${rect.bottom + 5}px`;
            colorPicker.style.right = `${window.innerWidth - rect.right}px`;
            colorPicker.classList.add('active');
        } else {
            colorPicker.classList.remove('active');
        }
    });

    colorPicker.addEventListener('click', (e) => {
        const colorOption = e.target.closest('.color-option');
        if (colorOption) {
            const color = colorOption.dataset.color;
            updateThemeColor(color);
            colorPicker.classList.remove('active');
            colorPickerVisible = false;
        }
    });

    // Image upload functionality for 
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            if (editMode) {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            profileImage.src = e.target.result;
                            saveState();
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            }
        });
    }

    // Toggle edit mode
    let editMode = false;

    function toggleEditMode() {
        editMode = !editMode;
        templateContainer.classList.toggle('edit-mode');

        const editableElements = templateContainer.querySelectorAll('[data-editable]');
        editableElements.forEach(element => {
            element.contentEditable = editMode;
            if (editMode) {
                element.addEventListener('input', saveState);
            } else {
                element.removeEventListener('input', saveState);
            }
        });

        document.getElementById('editToggle').innerHTML = editMode ?
            '<i class="fas fa-edit"></i> Editing...' :
            '<i class="fas fa-edit"></i> Edit';

        if (profileImage) {
            profileImage.style.cursor = editMode ? 'pointer' : 'default';
        }

        // Hide color picker when exiting edit mode
        if (!editMode) {
            colorPicker.classList.remove('active');
            colorPickerVisible = false;
        }
    }

    // Event Listeners
    document.getElementById('editToggle').addEventListener('click', toggleEditMode);

    pdfBtn.addEventListener('click', () => {
        const element = document.querySelector('.resume-container');
        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                width: 8.3 * 96, // A4 width in pixels
                height: 11.7 * 96, // A4 height in pixels
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                x: 0,
                y: 0
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Store current scroll position and edit mode state
        const scrollPos = window.scrollY;
        const wasInEditMode = editMode;

        // If in edit mode, disable it temporarily
        if (editMode) {
            toggleEditMode();
        }

        // Hide header and other UI elements
        const header = document.querySelector('.header');
        const originalHeaderDisplay = header ? header.style.display : 'block';
        const originalPosition = element.style.position;
        const originalTop = element.style.top;
        const originalLeft = element.style.left;
        const originalTransform = element.style.transform;

        if (header) {
            header.style.display = 'none';
        }

        // Position the resume container absolutely to avoid scroll issues
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.left = '0';
        element.style.transform = 'none';

        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Restore original styles
            element.style.position = originalPosition;
            element.style.top = originalTop;
            element.style.left = originalLeft;
            element.style.transform = originalTransform;

            // Restore UI elements
            if (header) {
                header.style.display = originalHeaderDisplay;
            }

            // Restore scroll position
            window.scrollTo(0, scrollPos);

            // Restore edit mode if it was active
            if (wasInEditMode) {
                toggleEditMode();
            }
        }).catch(error => {
            console.error('Error generating PDF:', error);
            // Restore everything even if there's an error
            element.style.position = originalPosition;
            element.style.top = originalTop;
            element.style.left = originalLeft;
            element.style.transform = originalTransform;
            if (header) {
                header.style.display = originalHeaderDisplay;
            }
            window.scrollTo(0, scrollPos);
            if (wasInEditMode) {
                toggleEditMode();
            }
        });
    });

    imageBtn.addEventListener('click', async () => {
        // Store current scroll position
        const scrollPos = window.scrollY;

        // Temporarily scroll to top and adjust container
        window.scrollTo(0, 0);
        const container = document.querySelector('.editor-container');
        const originalPadding = container.style.padding;
        container.style.padding = '0';

        const element = document.querySelector('.resume-container');
        const originalPosition = element.style.position;
        const originalTop = element.style.top;

        // Temporarily position the resume
        element.style.position = 'relative';
        element.style.top = '0';

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                width: 8.3 * 96, // A4 width in pixels
                height: 11.7 * 96, // A4 height in pixels
                scrollY: -window.scrollY,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });

            const image = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = image;
            a.download = 'resume.png';
            a.click();
        } catch (error) {
            console.error('Error converting to image:', error);
            alert('Failed to download as image. Please try again.');
        } finally {
            // Restore original positions and styles
            element.style.position = originalPosition;
            element.style.top = originalTop;
            container.style.padding = originalPadding;
            window.scrollTo(0, scrollPos);
        }
    });

    undoBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            templateContainer.innerHTML = history[currentStep];
            updateUndoRedoButtons();
        }
    });

    redoBtn.addEventListener('click', () => {
        if (currentStep < history.length - 1) {
            currentStep++;
            templateContainer.innerHTML = history[currentStep];
            updateUndoRedoButtons();
        }
    });

    // Close color picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorPicker.contains(e.target) && e.target !== colorBtn) {
            colorPicker.classList.remove('active');
            colorPickerVisible = false;
        }
    });

    // Save initial state
    saveState();
});
