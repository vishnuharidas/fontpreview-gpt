const preview = document.getElementById('preview');
const fontSize = document.getElementById('font-size');
const color = document.getElementById('color');
const fontFamily = document.getElementById('font-family');
const buttons = {
    bold: document.getElementById('bold'),
    italic: document.getElementById('italic'),
    underline: document.getElementById('underline'),
    strikethrough: document.getElementById('strikethrough'),
    monospace: document.getElementById('monospace'),
};
const resetButton = document.getElementById('reset');

fontSize.addEventListener('input', () => {
    preview.style.fontSize = `${fontSize.value}px`;
    updateSupSubFontSize();
});

color.addEventListener('input', () => {
    preview.style.color = color.value;
});

fontFamily.addEventListener('change', () => {
    preview.style.fontFamily = fontFamily.value;
});

Object.entries(buttons).forEach(([style, checkbox]) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Make sure monospace is mutually exclusive with other font families
            if (style === 'monospace') {
                fontFamily.value = 'monospace';
                preview.style.fontFamily = 'monospace';
                preview.classList.remove('normal');
            } else {
                preview.classList.add(style);
            }
        } else {
            if (style === 'monospace') {
                fontFamily.value = 'Arial';
                preview.style.fontFamily = 'Arial';
                preview.classList.add('normal');
            } else {
                preview.classList.remove(style);
            }
        }
    });
});

// Add an event listener for the reset button
resetButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all styles?')) {
        // Reset font size, color, and family
        fontSize.value = '24';
        preview.style.fontSize = '24px';
        color.value = '#000000';
        preview.style.color = '#000000';
        fontFamily.value = 'Arial';
        preview.style.fontFamily = 'Arial';
        preview.classList.add('normal');
        buttons.monospace.checked = false;

        // Reset text styles
        Object.entries(buttons).forEach(([style, checkbox]) => {
            if (style !== 'monospace') {
                checkbox.checked = false;
                preview.classList.remove(style);
            }
        });
    }
});

// Add an event listener for the font-family dropdown
fontFamily.addEventListener('change', () => {
    if (fontFamily.value === 'monospace') {
        buttons.monospace.checked = true;
    } else {
        buttons.monospace.checked = false;
    }
    preview.style.fontFamily = fontFamily.value;
    preview.classList[fontFamily.value === 'monospace' ? 'remove' : 'add']('normal');
});

function updateSupSubFontSize() {
    const adjustedSize = Math.max(Math.round(fontSize.value * 0.6), 1);
    preview.style.setProperty('--sup-sub-font-size', `${adjustedSize}px`);
}

const randomStyleButton = document.getElementById('randomStyle');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

randomStyleButton.addEventListener('click', () => {
    // Random font size
    const randomFontSize = Math.floor(Math.random() * 101);
    fontSize.value = randomFontSize;
    preview.style.fontSize = `${randomFontSize}px`;

    // Random color
    const randomColor = getRandomColor();
    color.value = randomColor;
    preview.style.color = randomColor;

    // Random font family
    const randomFontIndex = Math.floor(Math.random() * fontFamily.options.length);
    fontFamily.selectedIndex = randomFontIndex;
    const randomFontFamily = fontFamily.options[randomFontIndex].value;
    preview.style.fontFamily = randomFontFamily;

    // Random text styles
    Object.entries(buttons).forEach(([style, checkbox]) => {
        const randomChecked = Math.random() < 0.5;
        checkbox.checked = randomChecked;
        if (randomChecked) {
            preview.classList.add(style);
        } else {
            preview.classList.remove(style);
        }
    });
});
