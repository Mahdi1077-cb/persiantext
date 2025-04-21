document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const fontSelect = document.getElementById('fontSelect');
    const colorPicker = document.getElementById('colorPicker');
    const generateBtn = document.getElementById('generateBtn');
    const effectsContainer = document.querySelector('.effects-container');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const textElements = document.querySelectorAll('.text-effect');

    // Array of effect classes
    const effects = [
        'simple-3d',
        'neon-3d'
    ];

    // Update all text elements
    function updateText() {
        const text = textInput.value || 'متن سه بعدی';
        textElements.forEach(element => {
            element.textContent = text;
        });
    }

    // Update font family
    function updateFont() {
        const selectedFont = fontSelect.value;
        textElements.forEach(element => {
            // Remove all font classes
            element.classList.remove('vazir-font', 'yekan-font', 'doran-font', 'morabba-font');
            // Add the selected font class
            element.classList.add(`${selectedFont}-font`);
        });
    }

    // Update text color
    function updateColor() {
        const color = colorPicker.value;
        document.documentElement.style.setProperty('--text-color', color);
    }

    // Generate effects
    function generateEffects() {
        const text = textInput.value.trim();
        if (text) {
            // Update all effects
            updateText();
            updateFont();
            updateColor();

            // Show effects container with animation
            effectsContainer.style.display = 'grid';
            effectsContainer.style.opacity = '0';
            effectsContainer.style.transition = 'opacity 0.5s ease';
            
            // Trigger reflow
            effectsContainer.offsetHeight;
            
            // Fade in
            effectsContainer.style.opacity = '1';
        } else {
            alert('لطفا متن خود را وارد کنید!');
        }
    }

    // Event listeners
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateEffects();
        }
    });

    generateBtn.addEventListener('click', generateEffects);

    // Apply effects to each text element
    textElements.forEach((element, index) => {
        element.classList.add(effects[index]);
    });

    // Handle download buttons
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const effectId = btn.getAttribute('data-effect');
            const element = document.getElementById(effectId);
            
            if (element) {
                try {
                    // Create a temporary container with fixed dimensions
                    const tempContainer = document.createElement('div');
                    tempContainer.style.width = '1080px';
                    tempContainer.style.height = '1080px';
                    tempContainer.style.display = 'flex';
                    tempContainer.style.justifyContent = 'center';
                    tempContainer.style.alignItems = 'center';
                    tempContainer.style.backgroundColor = 'transparent';
                    tempContainer.style.position = 'absolute';
                    tempContainer.style.left = '-9999px';
                    
                    // Clone the element and its styles
                    const clonedElement = element.cloneNode(true);
                    clonedElement.style.fontSize = '120px';
                    clonedElement.style.padding = '0';
                    clonedElement.style.minHeight = 'auto';
                    tempContainer.appendChild(clonedElement);
                    document.body.appendChild(tempContainer);

                    // Convert to canvas with high resolution
                    const canvas = await html2canvas(tempContainer, {
                        backgroundColor: null,
                        scale: 2,
                        allowTaint: true,
                        useCORS: true,
                        logging: false,
                        width: 1080,
                        height: 1080
                    });

                    // Create download link
                    const link = document.createElement('a');
                    link.download = `متن-سه-بعدی-${effectId}.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();

                    // Clean up
                    document.body.removeChild(tempContainer);
                } catch (error) {
                    console.error('Error generating PNG:', error);
                    alert('خطا در تولید تصویر. لطفا دوباره تلاش کنید.');
                }
            }
        });
    });
}); 