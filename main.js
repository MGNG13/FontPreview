async function createFontsOptions(fonts) {
    let texts = [];
    // Parents
    const parent = document.createElement('div');
    parent.className = "fonts";

    // Input
    const input = document.createElement('input');
    input.placeholder = "Add your text...";
    input.addEventListener('input', () => texts.forEach(text => text.innerText = input.value))
    parent.appendChild(input);

    console.log(fonts);

    // Add family fonts to html.
    for (const font_family of Object.keys(fonts)) {
        let option_html = document.createElement('p');
        option_html.innerText = font_family;
        option_html.style = `font-family: ${font_family};`
        option_html.addEventListener('click', () => alert(font_family))
        parent.appendChild(option_html);
        texts.push(option_html);
    }

    document.body.appendChild(parent);
}

async function listFontFamilies() {
    function sortFonts(fonts) {
        const new_fonts = {};
        // Extract fonts and append font family and array.
        [...new Set(fonts.map(font => font.family).sort((font_a, font_b) => font_a.localeCompare(font_b)))].forEach(font_family => new_fonts[font_family] = []);
        // Add each font to family.
        fonts.forEach((font) => new_fonts[font.family].push(font))
        return new_fonts;
    }
    return ('queryLocalFonts' in window) ? sortFonts(await window.queryLocalFonts()): []
}

document.addEventListener('DOMContentLoaded',
    listFontFamilies()
        .then(createFontsOptions)
        .catch(err => alert(`Unknown error: ${err}`))
)